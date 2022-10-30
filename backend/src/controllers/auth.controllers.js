const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) =>
    jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "60s" });

/**
 * @description :      Create an account
 * @Route :              POST   /auth/users/register
 * @Access :            Public
 */
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName)
            return res
                .status(400)
                .json({ message: "Entrer your first Name and last Name." });

        if (!email)
            return res.status(400).json({ message: "Entrer your email." });

        // Check if email is alredy in use
        const usedEmail = await User.findOne({ email });
        if (usedEmail)
            res.status(400).json({ message: "That email is already in use" });

        if (!password)
            return res.status(400).json({ message: "Entrer your password." });

        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };
        const user = await User.create(newUser);
        if (user) {
            res.status(201).json({
                message: "User registered successfully. Please Sign in now.",
            });
        } else {
            res.status(400).json({ message: `Invalide user data` });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again.",
        });
    }
};

/**
 * @description :      Sign in to an account
 * @Route :              POST   /auth/users/login
 * @Access :            Public
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find the user
        const user = await User.findOne({ email });
        if (!user) res.status(404).json({ message: "User not found." });

        // Verify user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Incorrect Password." });
        }

        // Generate Token
        const token = generateToken(user._id);

        res.status(200).json({
            id: user._id,
            name: user.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again.",
        });
    }
};

const getUser = async (req, res) => {
    const id = req.user._id;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again.",
        });
    }
};

module.exports = {
    register,
    login,
    getUser,
};
