const Address = require('../models/address');
const Car = require('../models/car');

exports.getAllCars = async (req, res) => {
	const findCars = await Car.find().populate('location');
	return res.status(200).json({ message: 'OK', data: findCars });
};

exports.getCar = async (req, res) => {
	const { id } = req.params;

	const findCar = await Car.findOne({ _id: id }).populate('location');
	if (!findCar) return res.status(400).json({ message: 'Car not found!' });

	return res.status(200).json({ message: 'OK', data: findCar });
};

exports.createCar = async (req, res) => {
	const createAddress = await Address.create(req.body.location);
	createAddress.save();

	const createCar = await Car.create({ ...req.body, location: createAddress._id });
	createCar.save();

	return res.status(201).json({ message: 'New car created', data: createCar });
};

exports.updateCar = async (req, res) => {
	const { id } = req.params;
	const { location, brand, model, variant, cc, year, mileage, color, transmission, images } = req.body;

	const updateCar = { brand, model, variant, cc, year, mileage, color, transmission, images };

	const findCar = await Car.findOneAndUpdate({ _id: id }, updateCar, { new: true });
	const findLocation = await Address.findOneAndUpdate({ _id: findCar.location.toString() }, location);

	findLocation.save();
	findCar.save();

	return res.status(201).json({ message: 'Car Updated', data: findCar });
};

exports.removeCar = async (req, res) => {
	const { id } = req.params;

	const findCar = await Car.findOne({ _id: id });
	await Address.findOneAndDelete({ _id: findCar.location.toString() });
	findCar.remove();

	return res.status(204).json({ message: 'Car removed' });
};
