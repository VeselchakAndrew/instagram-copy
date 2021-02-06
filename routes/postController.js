const { validationResult, check } = require("express-validator");
const User = require("../models/user");

class postController {
	getAllUsers = async (req, res) => {
		try {
			const { title, body } = req.body;
		} catch (error) {
			console.log(error);
		}
	};

	validate = (method) => {
		switch (method) {
			case "createPost": {
				return [
					check("title", "Title is required").exists().notEmpty(),
					check("body", "Enter some text").exists().not.Empty(),
				];
			}
		}
	};
}

module.exports = new postController();
