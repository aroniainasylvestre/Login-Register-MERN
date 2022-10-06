const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.log("Unable to connect to the database");
        process.exit(1);
    }
};

module.exports = connectDB;
