const router = require('express').Router();
const boardController = require('../controller/board');

router.get('/create', boardController.create);
router.get('/delete', boardController.delete);

module.exports = router;