const jwt = require("jsonwebtoken");
const bcrypto = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { user: User } = require('../models');

module.exports = {
  login: (req, res) => {
    res.status(200).send("login page");
  },

  logout: (req, res) => {
    res.status(200).send("logout page");
  },

  signup: async (req, res) => {
    const { email, nickname, password } = req.body;

    // 이메일이 존재하는 경우, 400 Error 반환하기
    try {
      if (!email) {
        // 비밀번호 암호화를 위한 bcrypt
        const hashed = bcrypto.hashSync(password, 10);
        await User.create({
          //   User Model 생성하기
          email,
          nickname,
          password: hashed,
        });

        const userId = User.id;
        const result = { userId, email, nickname, password };

        return res
          .status(201)
          .json({ data: result, message: "회원가입이 완료되었습니다." });
      } else {
        return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
      }
    } catch (err) {
      res.status(500).json({ message: "서버 에러" });
    }
  },

  googleLogin: (req, res) => {
    // redirect to google login
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
    )
  },

  googleCallback: async (req, res) => {
    // authorization code
    // 어떤 정보(스코프)에 접근 가능한지가 담긴 코드
    const authorizationCode = req.query.code;
    try {
      // Exchange authorization code for access token
      let accessToken = await axios.post(
        `https://oauth2.googleapis.com/token?code=${authorizationCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      accessToken = accessToken.data.access_token;
      // Calling Google APIs with access token
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let user = await User.findOrCreate({
        where: {
          email: userInfo.data.email
        },
        defaults: {
          email: userInfo.data.email,
          password: '',
          nickname: userInfo.data.name,
        }
      });

      user = { ...user[0].dataValues };
      delete user['password'];
      // const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, {expiresIn: '2d'});
      // const refreshToken = jwt.sign(user, procee.env.REFRESH_SECRET, {expiresIn: '3d'});
      // res.cookie('refreshToken',refreshToken).send({data: accessToken, messge: 'ok'});
      // res.cookie('jwt', 'asd', {
      //   sameSite: 'Strict',
      //   secure: true,
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
      //   // domain: '.keyplus.kr',
      // });
      res.send(user);

    } catch (error) {
      res.sendStatus(500);
    }
  },


}
