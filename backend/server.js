const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const path = require('path');
require("./passport");
require("dotenv").config();
const config = require('config');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const dbUri = config.get('db.uri');
//connectDB(dbUri);
connectDB();

const corsConfig = {
  origin: config.get('clientURL'),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
//app.options("",cors(corsConfig))

app.use(cookieSession({
    name: "session",
    keys: ["web client 1"],
    //maxAge: 24 * 60 * 60 * 1000,
    maxAge: null
  })
);


app.use(session({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: false,
  // store: MongoStore.create({
  //   mongoUrl: dbUri,
  //   collectionName: 'sessions',
  //   ttl: 24 * 60 * 60 // 1 day
  // }),
  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000 
  // }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.get("/",(req,res)=>{
//   res.json({message:"Hello world from backend"})
// })

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

