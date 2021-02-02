const express = require("express");
const mongoose = require("mongoose");
const { PORT } = require("./options/key");
const connecDB = require("./options/db/db");

const app = express();

require("./models/user");
app.use(express.json());
connecDB();

app.use(require("./routes/auth"));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
