const joi = require("joi");
const { isValidObjectId } = require("../utils.js/validator");

//checkout
const RentValidation = {
  createRentValidator: {
    body: joi.object({
      checkinDate: joi.date().required(),
      dateofReturn: joi.date(),
      total_charge: joi.number(),
      quantity: joi.number(),

      user: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid user ID");
        return value;
      }, "ObjectID Validation"),

      bookId: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid book ID");
        return value;
      }, "ObjectID Validation"),
    }),
  },

  //checkin
  checkinRentValidator: {
    body: joi.object({
      checkinDate: joi.date().required(),
      dateofReturn: joi.date(),
      quantity: joi.number(),
      isReturned: joi.boolean(),

      user: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid user ID");
        return value;
      }, "ObjectID Validation"),

      bookId: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid book ID");
        return value;
      }, "ObjectID Validation"),
    }),
  },
};
module.exports = RentValidation;
