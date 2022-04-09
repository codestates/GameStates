const router = require("express").Router();
const userController = require("../controller/user");

router.get("/getUserInfo", userController.getUserInfo);
router.patch("/modifyUserInfo", userController.modifyUserInfo);
router.delete("/deleteUserInfo", userController.deleteUserInfo);

module.exports = router;
