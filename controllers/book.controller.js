var Book = require("../models/book.model");
var User = require("../models/user.model")
var cloudinary = require("../cloudinary");
module.exports.getIndex = async (req, res, next) => {
  var books = await Book.find();
  var users = await User.find()
  res.render("index", {
    books: books,
    users: users
  });
};
module.exports.postIndex = async (req, res) => {
  var image = await cloudinary.uploader.upload(req.file.path);
  var books = await Book.find();
  var errors = [];
  if (!req.body.title) {
    errors.push("Title is required");
  }
  if (!req.body.description) {
    errors.push("Description is required");
  }
  if (!req.body.price) {
    errors.push("Price is required");
  }

  if (errors.length) {
    res.render("index", {
      errors: errors,
      books: books,
      values: req.body
    });
    return;
  }
  var data = {
    title: req.body.title,
    image: image.secure_url,
    description: req.body.description,
    price: req.body.price
  }
  await Book.create(data).then(result => console.log(result));
  res.redirect("/books");
};
module.exports.delete = async (req, res) => {
  // var title = req.params.title;
  // db.get("books")
  //   .remove({ title: title })
  //   .write();
  // res.redirect("/books");
  var id = req.params.id;
  console.log(id)
  // await Book.findByIdAndDelete({id})
  res.redirect("/books")
};
module.exports.getUpdate = (req, res) => {
  
};
module.exports.postUpdate = (req, res, next) => {
  // var title = req.params.title;
  // db.get("books")
  //   .find({ title: title })
  //   .assign({ title: req.body.title })
  //   .write();
  // res.redirect("/books");
};
module.exports.error = function(req, res, next) {
  res.render("error");
};
