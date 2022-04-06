const router = require('express').Router();
const userController = require('../controller/users');

// router.get('/signup',컨트롤러);
router.get('/signin', userController.signin);
// router.get('/mypage',컨트롤러);
// router.get('/google/callback',컨트롤러);

module.exports = router;
