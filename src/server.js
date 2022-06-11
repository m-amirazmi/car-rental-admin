require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/db');
const { connection } = require('mongoose');
const app = express();
app.use(cors());

connectDB();
app.use(express.json());

const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const uploadRoutes = require('./routes/upload');

app.use('/auth', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/upload', uploadRoutes);

connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(process.env.PORT, () => console.log(`Connected => http://localhost:${process.env.PORT}`));
});
