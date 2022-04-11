const { isAuthorized } = require("./tokenFunction");
const { comment: Comment } = require("../models");

module.exports = {
  // 내가 단 댓글도 불러오기도 있어야 하지 않을까??
  writeComment: async (req, res) => {
    const { postId } = req.params; //이미 postId를 params로 받고 있는데 아래에서 board로 board_id를 받음
    const token = isAuthorized(req);
    if (token) {
      const { id, board, comment } = req.body;
      if (!id || !board || !comment) {
        return res.json({ message: "잘못된 정보 입력" });
      }
      const isCreated = await Comment.create({
        description: comment,
        boardId: board, //검사 필요
        userId: token.id,
      });
      if (isCreated) {
        return res.status(201).json({ isCreated });
      }
    }
    res.json({ message: "댓글 달기 실패" });
  },
  modifyComment: async (req, res) => {
    // const { commentId } = req.params; // 아래 body와 중복
    const token = isAuthorized(req);
    if (token) {
      const { commentId, comment, userId } = req.body;
      if (!commentId || !comment || !userId) {
        // 특히, id 값이 0일 때 주의
        return res.json("잘못된 정보 입력");
      }
      //userId 필요 없음, 이미 토큰으로 유저 정보가 전달됨.
      //postman으로 테스트할 때, body로 전달되는 userId는 전혀 상관없는 정보
      try {
        const commentRow = await Comment.findByPk(commentId);
        if (commentRow.dataValues.userId === token.id) {
          const updated = await Comment.update(
            {
              description: comment,
            },
            {
              where: { id: commentId },
            }
          );
          if (updated[0] > 0) {
            return res.status(201).json({ message: "댓글 수정 완료" });
          }
        }
        /* (update 이상함. where 조건이 틀리든 맞든 무조건 수행됨.
                    그리고 결과값은 항상 배열임(값이 하나만 담겨있는), = 영향을 받은 레코드의 수
                */
        res.json({ message: "수정된 댓글 없음" });
      } catch (err) {
        return err;
      }
    }
  },
  deleteComment: async (req, res) => {
    // const commentId = req.params; 이게 살아있어야 함. body의 commentId가 죽고
    const { boardId, userId, commentId } = req.body; //userId 필요없음
    if (!boardId || !userId || !commentId) {
      return res.json({ message: "잘못된 정보 입력" });
    }
    const token = isAuthorized(req);
    if (token) {
      try {
        const commentRow = await Comment.findByPk(commentId);
        if (!commentRow) {
          return res.json({ message: "삭제 실패" });
        }
        commentRow.dataValues.userId === token.id;
        const result = await Comment.destroy({
          where: { id: commentId },
        });
        if (result > 0) {
          return res.json({ message: "삭제 완료" });
        }
      } catch (err) {
        return err;
      }
    }
    return res.status(400).json({ message: "인증 실패" });
  },

  getComment: async (req, res) => {
    const result = await Comment.findAll();
    res.send(result);
  },
};
