const { Schema, model } = require("mongoose");

const UploadSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		filename: {
			type: String,
			unique: true,
		},
		filesize: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const UploadModel = model("upload", UploadSchema);

module.exports = UploadModel;
