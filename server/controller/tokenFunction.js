// 파일명은 PascalCase를 사용합니다. ex) AdminLogout
// LintRule 얘기해보기
const dotenv = require("dotenv");
dotenv.config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  isAuthorized: (req) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    if (!token) {
      return null;
    }
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
