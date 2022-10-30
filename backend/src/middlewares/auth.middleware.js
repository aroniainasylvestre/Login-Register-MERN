const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } else {
            return res.status(401).json({
                message: "Uauthorized",
            });
        }
        if (!token) {
            return res.status(401).json({
                message: "No token, access denied.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong.",
        });
    }
};

module.exports = {
    auth,
};
