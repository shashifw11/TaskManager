const express = require('express');
const { registerUser, loginUser, googleLogin,googleCallback } = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL, 
    failureRedirect: '/login/failed',
  })
);

module.exports = router;