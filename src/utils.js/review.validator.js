const joi = require("joi");
const { isValidObjectId } = require("../utils.js/validator");

const ReviewValidation = {
  createReviewValidator: {
    body: joi.object({
      reviewText: joi.string().required(),
      stars: joi.number().max(5).min(1),

      user: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid user ID");
        return value;
      }, "ObjectID Validation"),

      likes: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid like ID");
        return value;
      }, "ObjectID Validation"),
      book: joi
        .string()
        .required()
        .custom((value, helper) => {
          if (!isValidObjectId(value))
            return helper.message("Please enter a valid book ID");
          return value;
        }, "ObjectID Validation"),
    }),
  },
};
module.exports = ReviewValidation;
