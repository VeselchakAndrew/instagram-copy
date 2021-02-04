const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const { PORT } = require("./options/key");
const connectDB = require("./options/db/db");
const authRouter = require("./routes/auth");

const app = express();

require("./models/user");
require("./models/post");

app.use(express.json());
// app.use(expressValidator());
app.use("/auth", authRouter);

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
