const Review = require("../../../models/Review");
const { isValidObjectId } = require("../../../utils.js/validator");

module.exports = {
  create: async (req, res) => {
    const { reviewText, stars, likes, user } = req.body;

    if (!isValidObjectId(user))
      return res.json({ message: "user is invalid " });
  },
};
