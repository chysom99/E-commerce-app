const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },

    quantity: {
      inStock: {
        type: Number,
        default: 1,
      },
      rentedOut: {
        type: Number,
        default: 0,
      },
    },

    dimension: {
      type: String,
      required: true,
    },

    price: {
      dailyRental: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },

    authorInformation: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("book", BookSchema);
