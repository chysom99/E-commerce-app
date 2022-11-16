const express = require("express");
const router = express.Router();
const createUserController = require("../middleware/controllers/user");
const { signup, login } = createUserController;
const userAuth = require("../middleware/auth");
const auth_token = require("../middleware/auth_token");
const book = require("../middleware/controllers/book");

router.post("/signup", userAuth.validateUser, signup);
router.post("/login", login);
router.post("/book", auth_token, book.create);
router.put("/book/:id", auth_token, book.update);
router.delete("/book/:id", auth_token, book.delete);
router.get("/book", auth_token, book.find);
router.get("/book/search", auth_token, book.findAll);

module.exports = router;
