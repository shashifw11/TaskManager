const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

console.log("JWT Secret:", config.get('jwtSecret'));

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, conformPassword } = req.body;
    console.log("registerUser-req.body", req.body);

    if (password !== conformPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();
        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log("login-req.body", req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        //const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        );
        //  res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const googleLogin = async (req, res) => {
    if (req.user) {
        const payload = { user: { id: req.user.id } };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true });
                res.json({ token, user: req.user });
            }
        );
    } else {
        res.status(403).json({ error: true, message: 'Not Authorized' });
    }
};

const googleCallback = (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_URL);
};

module.exports = { registerUser, loginUser, googleLogin , googleCallback};
