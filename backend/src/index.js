const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/database.config");

const userRoutes = require("./routes/user.routes");

// Create Express app
const app = express();

// Connect to the database
const URL = process.env.MONGO_URI;
connectDB(URL);

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credential: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use("/api/auth/users", userRoutes);

// Run the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
