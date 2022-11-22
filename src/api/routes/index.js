const express = require("express");
const router = express.Router();
const createUserController = require("../middleware/controllers/user");
const { signup, login } = createUserController;
const userAuth = require("../middleware/auth");
const auth_token = require("../middleware/auth_token");
const book = require("../middleware/controllers/book");
const review = require("../middleware/controllers/review");
const BookValidator = require("../../utils.js/book.validator");
const ReviewValidator = require("../../utils.js/review.validator");
const { validate } = require("express-validation");

router.post("/signup", userAuth.validateUser, signup);
router.post("/login", login);
router.post(
  "/book",
  auth_token,
  validate(BookValidator.createBookValidator),
  book.create
);
router.put(
  "/book/:id",
  auth_token,
  validate(BookValidator.updateBookValidator),
  book.update
);
router.delete("/book/:id", auth_token, book.delete);
router.get("/book", auth_token, book.find);
router.get("/book/search", auth_token, book.findAll);

router.post(
  "/review",
  auth_token,
  validate(ReviewValidator.createReviewValidator),
  review.create
);
router.put(
  "/review/:id",
  auth_token,
  validate(ReviewValidator.updateReviewValidator),
  review.update
);
module.exports = router;
