const Book = require("../../../models/Book");
const { isValidObjectId } = require("../../../utils.js/validator");

module.exports = {
  create: async (req, res) => {
    const {
      title,
      description,
      subject,
      total_quantity,
      dimension,
      total_price,
      authorInformation,
    } = req.body;

    if (!isValidObjectId(authorInformation))
      return res.json({ message: "authorInformation is invalid " });
    if (!title) return res.json({ message: "title is required" });
    if (!description) return res.json({ message: "description is required" });
    if (!subject) return res.json({ message: "subject is required" });
    if (!total_quantity)
      return res.json({ message: "total_quantity is required" });
    if (!dimension) return res.json({ message: "dimension is required" });
    if (!total_price) return res.json({ message: "total_price is required" });

    let quantity = { inStock: total_quantity, rentedout: 0 };
    let price = { dailyRental: total_price, currency: "#" };
    let book = new Book({
      title,
      description,
      subject,
      price,
      quantity,
      dimension,
      authorInformation,
    });

    book = await book.save();
    res.json(book);
  },

  //update
  update: async (req, res) => {
    const { id } = req.params;
    const { subject } = req.body;
    if (!isValidObjectId(id))
      return res.json({ message: "Book Id is invalid" });
    if (!subject) return res.json({ message: "subject is required" });

    let book = await Book.findById(id).exec();
    if (!book) return res.status(400).json({ message: "Book not found" });
    book.subject = subject;

    book = await book.save();

    res.json(book);
  },

  //delete
  delete: async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.json({ message: "Book id is invalid" });
    const book = await Book.findOneAndDelete(id).exec();
    if (!book) return res.status(400).json({ messsage: "book not found" });
    else return res.status(200).json({ messsage: "book deleted" });
  },

  //fetch all
  find: async (req, res) => {
    const book = await Book.find({});
    res.status(200).json({ book });
  },

  //search
  findAll: async (req, res) => {
    const where = {};
    if (req.query.filter) {
      where.title = {
        $regex: req.query.filter,
        $options: "i",
      };
    }
    const book = await Book.find(where).exec();

    res.json(book);
  },
};
