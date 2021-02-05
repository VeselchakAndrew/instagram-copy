const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const authController = require("./authController");
const authMiddleware = require("../middleware/auth.middleware");

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
