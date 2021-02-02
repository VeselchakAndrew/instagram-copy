module.exports = {
	PORT: process.env.PORT || 5000,
	MONGO_URI:
		process.env.MONGO_URI ||
		"mongodb+srv://db_user:en54FAI53jd64jsP@cluster0.b1lfo.mongodb.net/insta?retryWrites=true&w=majority",
};
