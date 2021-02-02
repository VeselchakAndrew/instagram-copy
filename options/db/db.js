const mongoose = require("mongoose");
const { MONGO_URI } = require("../key");

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log("DB connected");
	} catch (error) {
		console.log("DB disconnected");
		console.error(error);
	}
};

module.exports = connectDB;
