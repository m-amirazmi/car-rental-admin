const router = require('express').Router();
const { signUp, signIn, signOut, refreshToken } = require('../controllers/users');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);
router.get('/refresh-token', refreshToken);

module.exports = router;
