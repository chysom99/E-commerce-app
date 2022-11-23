const express = require("express");
const router = express.Router();
const createUserController = require("../middleware/controllers/user");
const { signup, login } = createUserController;
const userAuth = require("../middleware/auth");
const auth_token = require("../middleware/auth_token");
const book = require("../middleware/controllers/book");
const rent = require("../middleware/controllers/rent");
const review = require("../middleware/controllers/review");

const RentValidator = require("../../utils.js/rent.validator");
const { validate } = require("express-validation");

router.post("/signup", userAuth.validateUser, signup);
router.post("/login", login);
router.post("/book", auth_token, book.create);
router.put("/book/:id", auth_token, book.update);
router.delete("/book/:id", auth_token, book.delete);
router.get("/book", auth_token, book.find);
router.get("/book/search", auth_token, book.findAll);
router.get("/book", auth_token, book.get);

router.get("/review", auth_token, book.get);

router.post(
  "/rent",
  auth_token,
  validate(RentValidator.createRentValidator),
  rent.create
);
router.post(
  "/rent/checkin",
  auth_token,
  validate(RentValidator.checkinRentValidator),
  rent.checkin
);
router.get("/rent/:id", auth_token, rent.find);

module.exports = router;
