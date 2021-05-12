var Book = require("../../models/book.model");
module.exports.getIndex = async function(req, res) {
  var books = await Book.find();
  res.json(books);
};
module.exports.postCreate = async (req, res) => {
  var book = await Book.create(req.body);
  res.json(book);
};
