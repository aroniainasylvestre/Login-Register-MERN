const express = require('express');
require("dotenv").config();

// Create express app
const app = express();

// Run the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));