const express = require("express");
const router = express.Router();
const createUserController = require("../middleware/controllers/user");
const { signup, login } = createUserController;
const userAuth = require("../middleware/auth");
const auth_token = require("../middleware/auth_token");

router.post("/signup", userAuth.validateUser, signup);
router.post("/login", login);

module.exports = router;
