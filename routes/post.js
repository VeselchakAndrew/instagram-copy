const { Router } = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("./postController");

const router = new Router();

router.post("/createpost", authMiddleware, postController.getAllUsers);

module.exports = router;
