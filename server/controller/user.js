const dotenv = require("dotenv");
dotenv.config();
const { user } = require("../models");
const { isAuthorized } = require('./tokenFunction');

module.exports = {
  // API 문서 https://clout-tv.gitbook.io/api-docs-1/reference/api-reference/user-api
  getUserInfo: async (req, res) => {
    const { id } = req.body;

    const userInfo = await user.findOne({
      attributes: ["id", "email", "role", "nickname"],
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

  modifyUserInfo: (req, res) => {
    res.end("modifyUserInfo");
  },

  deleteUserInfo: (req, res) => {
    res.end("deleteUserInfo");
  },
};
