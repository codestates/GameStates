const router = require('express').Router();
const commentController = require('../controller/comment');


router.get('/',commentController.getComment);
router.post('/:postId', commentController.writeComment);
router.patch('/:commentId', commentController.modifyComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;