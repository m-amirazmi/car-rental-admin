const router = require('express').Router();
const { getS3Url } = require('../controllers/upload');

router.get('/', getS3Url);

module.exports = router;
