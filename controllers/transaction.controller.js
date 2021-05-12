var Transaction = require("../models/transaction.model")
module.exports.index = (req, res) => {
  // var cookie = req.signedCookies.userId;
  // var user = db
  //   .get("users")
  //   .find({ id: cookie })
  //   .value();
  // var userQuery = { id: user.id, name: user.name };
  // var transaction = db
  //   .get("transactions")
  //   .filter({ user: userQuery })
  //   .value();
  // if (user.isAdmin) {
  //   res.render("transactions", {
  //     transactions: db.get("transactions").value()
  //   });
  //   return;
  // } else {
  //   res.render("transactions", {
  //     transactions: transaction
  //   });
  // }
  var cookie = req.signedCookies.userId;
  var transaction = Transaction.findById({cookie});
  res.render("transactions", {
    transactions: transaction
  })
};
module.exports.getCreate = (req, res) => {
  // var user = db.get("users").value();
  // var book = db.get("books").value();
  // res.render("transaction-create", {
  //   users: user,
  //   books: book
  // });
};
module.exports.postCreate = (req, res) => {
//   var reqUser = req.body.user;
//   var reqBook = req.body.book;
//   var userId = reqUser.slice(0, reqUser.indexOf("|"));
//   var bookId = reqBook.slice(0, reqBook.indexOf("|"));
//   var userName = reqUser.slice(reqUser.indexOf("|") + 1);
//   var bookTitle = reqBook.slice(reqBook.indexOf("|") + 1);
//   var dataTransaction = {
//     id: shortid.generate(),
//     user: { id: userId, name: userName },
//     book: { id: bookId, title: bookTitle },
//     isComplete: false
//   };
//   db.get("transactions")
//     .push(dataTransaction)
//     .write();
//   res.redirect("/transactions");
// };
// module.exports.getComplete = (req, res) => {
//   var id = req.params.id;
//   var transaction = db
//     .get("transactions")
//     .find({ id: id })
//     .value();
//   res.render("complete-transaction", { transaction: transaction });
// };
// module.exports.postComplete = (req, res) => {
//   var id = req.params.id;
//   db.get("transactions")
//     .find({ id: id })
//     .assign({ isComplete: true })
//     .value();
//   res.redirect("/transactions");
};
