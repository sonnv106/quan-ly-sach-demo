var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const transactionSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  isComplete: Boolean
});
const Transaction = mongoose.model("transactions", transactionSchema);
module.exports = Transaction;
