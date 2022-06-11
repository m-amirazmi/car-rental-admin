const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
	{
		brand: {
			type: String,
			required: true,
			length: 200,
		},
		model: {
			type: String,
			required: true,
			length: 200,
		},
		variant: {
			type: String,
			required: true,
			length: 200,
		},
		cc: {
			type: Number,
			required: true,
			length: 10,
		},
		year: {
			type: Number,
			required: true,
			length: 5,
		},
		mileage: {
			type: Number,
			required: true,
			length: 20,
		},
		color: {
			type: String,
			required: true,
			length: 20,
		},
		transmission: {
			type: Number,
			required: true,
			length: 10,
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address',
			required: true,
		},
		rate: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			length: 2000,
		},
		images: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
