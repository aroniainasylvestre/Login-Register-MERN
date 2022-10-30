const express = require("express");
const { register, login, getUser } = require("../controllers/auth.controllers");
const { auth } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, getUser);

module.exports = router;
