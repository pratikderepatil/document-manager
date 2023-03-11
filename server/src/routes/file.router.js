const express = require("express");
const upload = require("../middleware/fileupload");

const app = express.Router();

app.post("/upload", upload, (req, res) => {
	res.send("File uploaded successfully!");
});

app.get("/view", upload, (req, res) => {
	const testFolder = "./uploads/";
	const fs = require("fs");
	fs.readdir(testFolder, (err, files) => {
		res.send(files);
	});
});

module.exports = app;
