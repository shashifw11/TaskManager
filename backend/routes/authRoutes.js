// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, googleLogin,googleCallback } = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');

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

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/failed' }), googleCallback);
// router.get('/login/success', googleLogin);
// router.get('/login/failed', (req, res) => res.status(401).json({ error: true, message: 'Login failure' }));


module.exports = router;

