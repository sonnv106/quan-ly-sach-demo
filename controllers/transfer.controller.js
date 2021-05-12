var db = require("../db");
const shortid = require("shortid");
module.exports.create = function(req, res, next) {
  res.render("transfer", {
    csrfToken: res.locals.csrfToken
  });
};
module.exports.postCreate = function(req, res, next) {
  var data = {
    id: shortid.generate(),
    account: req.body.account,
    amount: parseInt(req.body.amount),
    userId: req.signedCookies.userId
  };
  db.get("transfer")
    .push(data)
    .write();
  console.log(db.get("transfer").value());
  res.redirect("/transfer/create");
};
