const { board, comment, user } = require("../models");
const { isAuthorized } = require("../controller/tokenFunction");

module.exports = {
  getPost: async (req, res) => {
    const a = await user.findOne({
      where: { id: 2 },
      include: [
        {
          model: comment,
          include: [{ model: board }],
        },
      ],
    });
    console.log(a);
    res.send(a);
  },

  writePost: async (req, res) => {
    // 기본 작성 틀 완료, Token 이 없는 경우 작성 못하게 막기
    // const userInfo = isAuthorized(req);
    // console.log(userInfo); null 이 찍혀 나온다.
    // userInfo 에 필요한 if else 지워둠
    const userInfo = isAuthorized(req);
    try {
      if (userInfo) {
        const { title, description } = req.body;
        const isCreated = await board.create({
          title,
          description,
          userId: userInfo.id,
        });
        if (isCreated) {
          return res.status(201).json({ isCreated });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "서버 에러" });
    }
  },

  modifyPost: async (req, res) => {
    // if문을 통해, 로그인 했을 때, 작성 가능, else는 로그아웃 상태로 글 작성 불가능을 알려주자.
    const userInfo = isAuthorized(req);
    if (userInfo) {
      try {
        const { id } = req.params;
        const existBoard = await board.findOne({
          where: { id },
        });
        if (existBoard) {
          const { title, description } = req.body;
          if (userInfo.id === existBoard.dataValues.userId) {
            await board.update(
              {
                title,
                description,
              },
              {
                where: { id },
              }
            );
            return res.status(201).json({ message: "수정 완료" });
          } else {
            return res.status(401).json({ message: "유저 인증 필요" });
          }
        }
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    }
  },

  deletePost: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (userInfo) {
      try {
        const { id } = req.params;
        const existBoard = await board.findOne({
          where: { id },
        });
        if (existBoard) {
          if (userInfo.id === existBoard.dataValues.userId) {
            await board.destroy({ where: { id } });
            res.status(200).json({ message: "삭제 완료" });
          } else {
            res.status(401).json({ message: "권한이 없습니다." });
          }
        }
      } catch (err) {
        res.status(500).json({ message: "서버 에러" });
      }
    }
  },
};
