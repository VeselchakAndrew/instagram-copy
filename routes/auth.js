const { Router } = require("express");
const authController = require("./authController");

router = new Router();

router.post(
	"/signup",
	authController.validate("createUser"),
	authController.registration
);

router.post(
	"/signin",
	authController.validate("loginUser"),
	authController.login
);

module.exports = router;
