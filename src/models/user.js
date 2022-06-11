const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			length: 200,
			required: false,
		},
		lastName: {
			type: String,
			length: 200,
			required: false,
		},
		phoneNumber: {
			type: String,
			length: 200,
			required: false,
		},
		address: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
			required: false,
		},
		role: {
			type: Number,
			default: 0,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
