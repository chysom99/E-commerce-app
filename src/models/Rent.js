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
    dateofReturn: {
      type: Date,
      //required: true,
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
    isReturned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("rent", RentSchema);
