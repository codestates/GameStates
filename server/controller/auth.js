const jwt = require("jsonwebtoken");
const bcrypto = require("bcrypt");

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

  googleLogin: (req, res) => {},
};
