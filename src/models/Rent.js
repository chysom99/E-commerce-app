const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },

    checkinDate: {
      type: Date,
      required: true,
    },
    dateOfReturn: {
      type: Date,
    },
    charge: {
      amount: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
      },
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rent", RentSchema);
