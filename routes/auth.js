const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

router = new Router();

router.get("/", (req, res) => {
	res.send("Hello from Auth!");
});

router.post(
	"/signup",
	[
		check("name", "Name is required").exists().notEmpty(),
		check("email", "Use a valid email").exists().isEmail(),
		check("password", "Must be at least 5 symbols")
			.exists()
			.isLength({ min: 5 }),
	],
	async (req, res) => {
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ message: "User alredy exist" });
			}

			user = new User({
				name,
				email,
				password,
			});

			await user.save();
			res.json({ message: "User succesfully saved" });
		} catch (error) {}
	}
);

module.exports = router;
