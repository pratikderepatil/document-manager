require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileRouter = require("./src/routes/file.router");
const userRouter = require("./src/routes/user.router");
const connect = require("./src/congif/db");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
	res.header({ "Access-Control-Allow-Origin": "*" });
	next();
});
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.set("strictQuery", false);

app.use("/user", userRouter);
app.use("/file", fileRouter);

app.listen(process.env.PORT, async () => {
	connect();
	console.log(`listening on http://localhost:${process.env.PORT}`);
});
