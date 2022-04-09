const router = require("express").Router();
// .Router() 과연 필요한가 질문
const authController = require("../controller/auth");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/google/callback", authController.googleCallback);

module.exports = router;
