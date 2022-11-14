require("dotenv").config();
const mongoose = require("mongoose");
//const User = require("../models/User.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/book-rental-store")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log("Database conection failed", err);
  });

require("./Book.js");
require("./Rent.js");
require("./User.js");
require("./review.js");
