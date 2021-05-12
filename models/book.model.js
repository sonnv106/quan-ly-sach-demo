var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: String,
  image: String,
  description: String,
  price: Number
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;
