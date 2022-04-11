const dotenv = require("dotenv");
dotenv.config();
const { user: User } = require("../models");
const { isAuthorized } = require("./tokenFunction");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  // API 문서 https://clout-tv.gitbook.io/api-docs-1/reference/api-reference/user-api
  getUserInfo: async (req, res) => {
    const { id } = req.body;

    const userInfo = await User.findOne({
      attributes: ["id", "role", "email", "nickname"],
      where: { id },
    });
    try {
      if (userInfo) {
        return res.status(200).json({ data: userInfo });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  // 미완성 유저 업데이트
  modifyUserInfo: async (req, res) => {
    const { id, nickname, password } = req.body;

    try {
      const userInfo = await User.findOne({
        attributes: ["id", "role", "email", "nickname"],
        where: { id },
      });
      if (userInfo) {
        const hashed = await bcrypt.hash(password, 10);
        await User.update(
          {
            nickname,
            password: hashed,
          },
          {
            where: { id },
          }
        );
      }
      return res
        .status(200)
        .json({ data: User, message: "회원 정보 수정 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
  deleteUserInfo: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (userInfo) {
        const userFind = await User.findOne({
          attributes: ["id", "role", "email", "nickname"],
          where: { id: userInfo.id },
        });
        if (userFind) {
          await User.destroy({ where: { id: userInfo.id } });
          return res.status(200).json({ message: "삭제 완료" });
        }
      } else {
        return res.status(401).json({ message: "권한이 없습니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
}
  // 삭제는 가능하지만, 중간 숫자만 딱 삭제해버린다. (문제가 없는지 확인해야 한다.)

