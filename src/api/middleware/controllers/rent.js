//const { date } = require("joi");
const Book = require("../../../models/Book");
const { count } = require("../../../models/Rent");
const Rent = require("../../../models/Rent");
const { isValidObjectId } = require("../../../utils.js/validator");

//checkout
module.exports = {
  create: async (req, res) => {
    const { user, bookId, checkinDate, dateofReturn, total_charge, quantity } =
      req.body;
    if (!isValidObjectId(user))
      return res.json({ message: "user is invalid " });
    if (!isValidObjectId(bookId))
      return res.json({ message: "bookId is invalid " });
    if (!checkinDate) return res.json({ message: "checkinDate is required" });
    if (!dateofReturn) return res.json({ message: "dateofReturn is required" });
    if (!total_charge) return res.json({ message: "total_charge is required" });
    if (!quantity) return res.json({ message: "quantity is required" });

    let charge = { amount: total_charge, currency: "#" };

    const difference_in_Time =
      new Date(dateofReturn).getTime() - new Date(checkinDate).getTime();

    const difference_in_Days = difference_in_Time / (1000 * 3600 * 24);
    charge.amount = difference_in_Days * total_charge;

    let rent = new Rent({
      user,
      book: bookId,
      checkinDate,
      charge,
      quantity,
    });

    rent = await rent.save();

    const book = await Book.findById(bookId);
    if (!book) return res.status(400).json({ message: "book not found" });
    book.quantity.inStock = book.quantity.inStock - quantity;
    book.quantity.rentedOut = book.quantity.rentedOut + quantity;
    await book.save();

    res.json(rent);
  },

  //view rented books
  find: async (req, res) => {
    const { id } = req.params;
    const rent = await Rent.findById(id).populate("book");
    res.json(rent);
  },

  //checkin
  checkin: async (req, res) => {
    const { user, bookId, dateofReturn, quantity, isReturned, checkinDate } =
      req.body;
    if (!isValidObjectId(user))
      return res.json({ message: "user is invalid " });
    if (!isValidObjectId(bookId))
      return res.json({ message: "bookId is invalid " });
    if (!dateofReturn) return res.json({ message: "dateofReturn is required" });
    if (!quantity) return res.json({ message: "quantity is required" });
    if (!isReturned) return res.json({ message: "isReturned is required" });
    if (!checkinDate) return res.json({ message: "checkinDate is required" });

    let rent = new Rent({
      user,
      book: bookId,
      dateofReturn,
      quantity,
      isReturned,
      checkinDate,
    });
    rent = await rent.save();
    const book = await Book.findById(bookId);
    if (!book) return res.status(400).json({ message: "book not found" });
    book.quantity.inStock = book.quantity.inStock + quantity;
    book.quantity.rentedOut = book.quantity.rentedOut - quantity;
    await book.save();

    res.json(rent);
  },
};
