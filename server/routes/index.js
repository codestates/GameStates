const router = require('express').Router();
const usersRouter = require('./users');
const boardRouter = require('./board');

router.use('/users', usersRouter);
router.use('/board', boardRouter);

module.exports = router;