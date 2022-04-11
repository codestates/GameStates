const { comment: Comment } = require("../models");
const { isAuthorized } = require("./tokenFunction");

module.exports = {

  writeComment: async (req, res) => {
    const { postId } = req.params;
    const token = isAuthorized(req);
    if (token) {
      const { comment } = req.body;
      if (!comment) {
        return res.json({ message: "잘못된 정보 입력" });
      }
      try {
        const isCreated = await Comment.create({
          description: comment,
          boardId: postId,
          userId: token.id,
        });
        if (isCreated) {
          return res.status(201).json({ isCreated });
        }
      } catch (err) {
        return err;
      }
    }
    res.status(401).json({ message: "인증 실패" });
  },

  modifyComment: async (req, res) => {
    const { commentId } = req.params;
    const token = isAuthorized(req);
    if (token) {
      const { comment } = req.body;
      if (!comment) {
        return res.json("내용이 비어있습니다.");
      }
      try {
        const commentRow = await Comment.findByPk(commentId);
        if (commentRow.dataValues.userId === token.id) {
          const affectedRow = await Comment.update(
            {
              description: comment,
            },
            {
              where: { id: commentId },
            }
          );
          if (affectedRow[0] > 0) {
            return res.status(201).json({ message: "댓글 수정 완료" }); //데이터 넘겨주기
          }
        }
      } catch (err) {
        return err;
      }
    }else{
      res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
      return res.json({ message: "잘못된 정보 입력" });
    }
    const token = isAuthorized(req);
    if (token) {
      try {
        const commentRow = await Comment.findByPk(commentId);
        if (!commentRow) {
          return res.json({ message: "삭제 실패" });
        }
        if (commentRow.dataValues.userId === token.id) {
          const result = await Comment.destroy({
            where: { id: commentId },
          });
          if (result > 0) {
            return res.json({ message: "삭제 완료" });
          }
        }
      } catch (err) {
        return res.status(500).send({ message: '서버 에러' })
      }
    }
    return res.status(401).json({ message: "인증 실패" });
  },
}
