require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "uploads");
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		},
	}),
}).single("fileupload");

app.post("/upload", upload, (req, res) => {
	res.send("File uploaded successfully!");
});

app.get("/files", upload, (req, res) => {
	const testFolder = "./uploads/";
	const fs = require("fs");
	fs.readdir(testFolder, (err, files) => {
		res.send(files);
	});
});

app.listen(process.env.PORT, () => {
	console.log(`listening on https://localhost:${process.env.PORT}`);
});
