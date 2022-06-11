const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
	const { email, password, username } = req.body;
	if (!username || !password || !email) return res.status(400).json({ message: 'Username, email & password are required.' });

	const findExist = await User.findOne({ email }).exec();
	if (findExist) return res.sendStatus(409);

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ email, username, password: hashedPassword });
		res.status(201).json({ success: `New user ${user} created!` });
	} catch (error) {
		console.log(error);
	}
};

exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	if (!password || !email) return res.status(400).json({ message: 'Email & password are required.' });

	const findUser = await User.findOne({ email }).exec();
	if (!findUser) return res.sendStatus(401);

	const matchedPassword = await bcrypt.compare(password, findUser.password);
	if (!matchedPassword) return res.sendStatus(401);

	const accessToken = jwt.sign({ username: findUser.username, role: findUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
	const refreshToken = jwt.sign({ username: findUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

	findUser.refreshToken = refreshToken;
	await findUser.save();

	res.cookie('jwt', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
	res.json({ role: findUser.role, accessToken });
};

exports.signOut = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const findUser = await User.findOne({ refreshToken }).exec();
	if (findUser) {
		findUser.refreshToken = '';
		await findUser.save();
	}

	res.clearCookie('jwt', {});
	return res.sendStatus(204);
};

exports.refreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const findUser = await User.findOne({ refreshToken }).exec();
	if (!findUser) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || findUser.username !== decoded.username) return res.sendStatus(403);
		const accessToken = jwt.sign({ username: findUser.username, role: findUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
		return res.json({ role: findUser.role, accessToken });
	});
};
