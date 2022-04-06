const router = require('express').Router();
const usersController = require('../controller');

router.get('/signin', usersController.signin);
router.get('/signout', usersController.signout);

module.exports = router;