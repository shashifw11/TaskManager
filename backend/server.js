require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const path = require('path');
require("./passport");

const app = express();
app.use(express.static('public'));

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));


app.use(cookieSession({
    name: "session",
    keys: ["web client 1"],
    //maxAge: 24 * 60 * 60 * 1000,
    maxAge: null
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000 
  }
}));


app.use(cors({
    origin: process.env.CLIENT_URL || "https://task-manager-blue-two.vercel.app/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


// // Serve static files (if applicable)
// app.use(express.static(path.join(__dirname, 'public')));

// // Catch-all route to serve frontend (if applicable)
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

