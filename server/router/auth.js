const router = require('express').Router();
const authController = require('../controller');

router.get('/login', authController.auth.login);
router.get('/logout', authController.auth.logout);

module.exports = router;