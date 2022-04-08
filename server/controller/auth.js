const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { user } = require("../models");
// 임시 수정 (user: User) 사용시 변환 질문하기
// model 명 일치시키기
const {
  generateAccessToken,
  isAuthorized,
} = require("../controller/tokenFunction");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    // 암호화된 비밀번호 사용 시, password 제외, email로 유저를 찾기
    const User = await user.findOne({ where: { email } });
    if (!User) {
      return res.status(401).json({ message: "잘못된 정보를 입력하였습니다." });
    } else {
      delete User.dataValues.password;
      // 토큰 function 생성하기
      const accessToken = generateAccessToken(User.dataValues);
      // 토큰 생성 시 cookie에 담고, data: token 반환하기
      return res
        .status(201)
        .cookie("jwt", accessToken, {
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        .json({ token: accessToken, message: "로그인 성공" });
    }
  },

  logout: (req, res) => {
    // 토큰을 통해 인증된 사용자인지 확인 후 로그아웃 진행
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      return res.status(400).json({ message: "이미 로그아웃 된 상태입니다." });
    } else {
      return res
        .clearCookie("jwt", { sameSite: "None", secure: true, httpOnly: true })
        .status(200)
        .json({ message: "로그아웃 성공" });
    }
  },

  signup: async (req, res) => {
    const { email, role, nickname, password } = req.body;

    if (!email || !nickname || !password) {
      return res.status(401).json({ message: "필수 항목을 입력하세요." });
    }

    const USER = await user.findOne({ where: { email } });
    // 비밀번호 암호화하기
    const hashed = await bcrypt.hash(password, 10);

    if (USER) {
      return res.status(400).json({ message: "이미 사용중인 이메일입니다." });
    } else {
      await user.create({
        email,
        role: 0,
        nickname,
        password: hashed,
      });
      return res.status(201).json({ message: "가입 완료" });
    }
  },

  googleLogin: (req, res) => {
    // redirect to google login
    return res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
    );
  },

  googleCallback: async (req, res) => {
    // authorization code
    const { code } = req.query;
    try {
      // Exchange authorization code for refresh tokens and access tokens
      const result = await axios.post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      // Calling Google APIs with access token
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.email,
        },
        defaults: {
          email: userInfo.data.email,
          role: 0,
          password: "",
          nickname: userInfo.data.name,
        },
      });

      console.log(user[0]);

      res.redirect("http://localhost:4000");
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
