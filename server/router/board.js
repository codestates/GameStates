const router = require('express').Router();
const boardController = require('../controller/board');

router.get('/', boardController.getPost);
router.post('/', boardController.writePost);
router.patch('/:id', boardController.modifyPost);
router.delete('/:id', boardController.deletePost);

module.exports = router;