const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../options/key");
const User = require("../models/user");

const generateAccessToken = (id, name) => {
	const payload = {
		id,
		name,
	};

	return jwt.sign(payload, JWT_SECRET);
};
class authController {
	registration = async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}

			const { name, email, password } = req.body;

			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ message: "User already exist" });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();
			res.json({ message: "User successfully saved" });
		} catch (error) {
			return res.status(500).json({ message: "Server error" });
		}
	};

	login = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}

			const isMatch = bcrypt.compareSync(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: "Incorrect password" });
			}

			const token = generateAccessToken(user._id, user.name);

			res.status(200).json({ token });
		} catch (error) {
			return res.status(500).json({ message: "Server error" });
		}
	};

	validate = (method) => {
		switch (method) {
			case "createUser": {
				return [
					check("name", "Name is required").exists().notEmpty(),
					check("email", "Use a valid email").exists().isEmail(),
					check("password", "Must be at least 5 symbols")
						.exists()
						.isLength({ min: 5 }),
				];
			}
			case "loginUser": {
				return [
					check("email", "Email is required").exists().isEmail(),
					check("password", "Password is required").exists(),
				];
			}
		}
	};
}

module.exports = new authController();
