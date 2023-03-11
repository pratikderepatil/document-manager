require("dotenv").config();

const express = require("express");
const UserModel = require("../models/user.model");

const app = express.Router();

app.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserModel.findById(id);
		return res.status(201).send(user);
	} catch (e) {
		return res.status(400).send(e);
	}
});

app.post("/signup", async (req, res) => {
	let { name, email, password } = req.body;

	let user = await UserModel.findOne({ email });
	console.log(name, email, password);
	try {
		if (user) {
			return res
				.status(409)
				.send("This email is already in use try with other email.");
		}
		let newUser = new UserModel({ name, email, password });
		await newUser.save();
		return res.status(201).send(newUser);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body; //password will verify with hash later

	const user = await UserModel.findOne({ email, password });
	// console.log(user)
	if (user) {
		return res.status(200).send({
			message: "Login Success",
			user: user.name,
			id: user._id,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

app.patch("/:id", async (req, res) => {
	// user's id
	const { id } = req.params;
	try {
		let updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ $set: { name: req.body.name } },
			{ new: true }
		);
		return res.status(200).send(updatedUser);
	} catch (e) {
		return res.status(401).send(e);
	}
});

module.exports = app;
