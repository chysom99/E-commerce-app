const Review = require("../../../models/review");
const { isValidObjectId } = require("../../../utils.js/validator");

module.exports = {
  create: async (req, res) => {
    const { reviewText, stars, likes, user, book } = req.body;

    if (!isValidObjectId(user))
      return res.json({ message: "user is invalid " });
    if (!isValidObjectId(book))
      return res.json({ message: "book is invalid " });
    if (!isValidObjectId(likes))
      return res.json({ message: "likes is invalid " });
    if (!reviewText) return res.json({ message: "reviewText is required" });
    if (!stars) return res.json({ message: "stars is required" });

    let review = new Review({
      reviewText,
      stars,
      likes,
      user,
      book,
    });

    review = await review.save();
    res.json(review);
  },

  // update
  update: async (req, res) => {
    const { id } = req.params;
    const { reviewText, stars, likes, user, book } = req.body;

    if (!isValidObjectId(user))
      return res.json({ message: "user is invalid " });
    if (!isValidObjectId(book))
      return res.json({ message: "book is invalid " });
    if (!isValidObjectId(likes))
      return res.json({ message: "likes is invalid " });
    if (!reviewText) return res.json({ message: "reviewText is required" });
    if (!stars) return res.json({ message: "stars is required" });

    let review = await Review.findById(id);
    if (!review) return res.status(400).json({ message: "Review not found" });

    review.reviewText = reviewText;
    review.stars = stars;

    review = await review.save();
    res.json(review);
  },
};
