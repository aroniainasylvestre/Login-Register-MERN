const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        // decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // get user
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            res.status(401).json({ message: "Unauthorized." });
        }

        // put user in the request
        req.user = user;

        next();
    } else {
        res.status(401).json({ message: "No token." });
    }
};

module.exports = {
    auth,
};
