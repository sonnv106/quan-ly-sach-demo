var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const sessionSchema = new Schema({
  cart: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ]
});

const Session = mongoose.model("sessions", sessionSchema);
module.exports = Session;
