const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
	{
		type: {
			type: Number,
			required: true,
			default: 1,
		},
		address_1: {
			type: String,
			required: true,
			length: 500,
		},
		address_2: {
			type: String,
			required: false,
			length: 500,
		},
		city: {
			type: String,
			required: true,
			length: 200,
		},
		state: {
			type: String,
			required: true,
			length: 200,
		},
		country: {
			type: String,
			required: true,
			length: 200,
		},
		postcode: {
			type: String,
			required: true,
			length: 10,
		},
		lat: {
			type: String,
			required: true,
			length: 200,
		},
		lng: {
			type: String,
			required: true,
			length: 200,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
