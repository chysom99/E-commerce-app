const Book = require("../../../models/Book");
const { isValidObjectId } = require("../../../utils.js/validator");

module.exports = {
  create: async (req, res) => {
    const { title, description, subject, quantity, dimension, price, user } =
      req.body;

    if (!isValidObjectId(user))
      return res.json({ message: "User is invalid " });
    if (!title) return res.json({ message: "title is required" });
    if (!description) return res.json({ message: "description is required" });
    if (!subject) return res.json({ message: "subject is required" });
    if (!quantity) return res.json({ message: "quantity is required" });
    if (!dimension) return res.json({ message: "dimension is required" });
    if (!price) return res.json({ message: "price is required" });

    let book = new Book({
      title,
      description,
      subject,
      price,
      quantity,
      dimension,
      user,
    });

    book = await book.save();
    res.json(book);
  },

  //delete
  delete: async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.json({ message: "Book id is invalid" });
    const book = await Book.findByIdAndDelete(id).exec();
    if (!book) return res.json({ messsage: "book not found" });
  },

  //fetch all
  find: async (req, res) => {
    const book = await Book.find({});
    res.json({ book });
  },
};
