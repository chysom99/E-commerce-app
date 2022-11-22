const joi = require("joi");
const { isValidObjectId } = require("../utils.js/validator");

const BookValidation = {
  createBookValidator: {
    body: joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      subject: joi.string().required(),
      total_quantity: joi.number(),
      dimension: joi.string(),
      total_price: joi.string(),

      authorInformation: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid author ID");
        return value;
      }, "ObjectID Validation"),
    }),
  },

  updateBookValidator: {
    body: joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      subject: joi.string().required(),
      total_quantity: joi.number(),
      dimension: joi.string(),
      total_price: joi.string(),

      authorInformation: joi.string().custom((value, helper) => {
        if (!isValidObjectId(value))
          return helper.message("Please enter a valid author ID");
        return value;
      }, "ObjectID Validation"),
    }),
  },
};
module.exports = BookValidation;
