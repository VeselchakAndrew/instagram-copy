const express = require("express");
const mongoose = require("mongoose");
const {PORT} = require("./options/key");
const connectDB = require("./options/db/db");

const app = express();

require("./models/user");
require("./models/post");

app.use(express.json());
connectDB();

app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
