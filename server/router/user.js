const router = require('express').Router();
const userController = require('../controller/user');

router.get('/', userController.getUserInfo);
router.patch('/', userController.modifyUserInfo);
router.delete('/', userController.deleteUserInfo);

module.exports = router;

