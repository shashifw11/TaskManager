const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try { 
        //const decoded = jwt.verify(token, config.get('jwtSecret'));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded:', decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Failed to authenticate token:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

