const express = require("express");
const upload = require("../middleware/fileupload");
const UploadModel = require("../models/upload.model");

const app = express.Router();

app.post("/upload", upload, (req, res) => {
	res.send("File uploaded successfully!");
});

app.post("/uploadDetails", async (req, res) => {
	let { email, filename, filesize } = req.body;
	console.log(email, filename, filesize);
	const details = await UploadModel.findOne({ filename });
	try {
		if (details) {
			return res
				.status(409)
				.send("This file already exists, try with another name");
		}
		let newDetails = new UploadModel({ email, filename, filesize });
		await newDetails.save();
		return res.status(200).send(newDetails);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

app.get("/uploadDetails/:email", async (req, res) => {
	const { email } = req.params;
	try {
		const details = await UploadModel.find({ email });
		return res.status(200).send(details);
	} catch (e) {
		return res.status(409).send(e.message);
	}
});

app.delete("/deleteUpload/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const details = await UploadModel.findByIdAndDelete(id);
		return res.status(200).send(details);
	} catch (e) {
		return res.status(409).send(e.message);
	}
});

app.get("/view", upload, (req, res) => {
	const testFolder = "./uploads/";
	const fs = require("fs");
	fs.readdir(testFolder, (err, files) => {
		res.send(files);
	});
});

module.exports = app;
