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

  //fetch books with highest review
  get: async (req, res) => {
    const pageIndex = req.query.page || 0;
    const pageSize = req.query.pageSize || 10;
    const where = {};
    if (req.query.filter) {
      where.date = {
        $regex: req.query.filter,
        $options: "i",
      };
    }
    const review = await Review.sort({ stars: -1 })
      .limit(pageSize)
      .skip(pageSize * pageIndex)
      .find(where)
      .exec();

    res.json(review);
  },
};
