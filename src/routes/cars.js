const router = require('express').Router();
const { getAllCars, getCar, createCar, updateCar, removeCar } = require('../controllers/cars');

router.get('/', getAllCars);
router.get('/:id', getCar);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', removeCar);

module.exports = router;
