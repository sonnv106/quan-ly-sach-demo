
var User =require("../models/user.model")
var Session = require("../models/session.model")
module.exports = async function(req, res, next){
  if(req.signedCookies.sessionId){
    let user = await User.findById(req.signedCookies.sessionId);
    if (user) {
      res.locals.user = user;
    }
  }
  if (!req.signedCookies.sessionId) {
    let newSession = await Session.create({});
    res.cookie("sessionId", newSession.id, {
      signed: true
    });
  }
  let session = await Session.findById(req.signedCookies.sessionId);
 
  let count = 0;

  if (session) {
    for (let book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.count = count;

  next();
}
