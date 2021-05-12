var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  wrongLoginCount: Number,
  isAdmin: Boolean,
  avatar: String
});
// userSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next()
// });
var User = mongoose.model("users", userSchema);
module.exports = User;
