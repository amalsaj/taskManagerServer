const express = require("express");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/authRouter");
const taskRoutes = require("./routes/taskRouter");
const connectDB = require("./db/db");
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());

// Connect to DB
connectDB();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
