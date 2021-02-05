const User = require("../models/user");

class postController {
	getAllUsers = async (req, res) => {
		try {
			const users = await User.find();
			res.json({ users });
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = new postController();
