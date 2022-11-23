const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: true,
    },

    stars: {
      type: Number,
      default: 5,
      min: [1, "It must be at least 1 star"],
      max: [5, "It must not be more than 5 stars"],
    },

    likes: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

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
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("review", ReviewSchema);
