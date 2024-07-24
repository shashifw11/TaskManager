require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use(
  cookieSession({
    name: 'session',
    keys: ['web client 1'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
