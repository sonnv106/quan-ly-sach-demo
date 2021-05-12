
var Session = require("../models/session.model")
module.exports.addToCart = async (req, res, next) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  var session =  await Session.findOne({_id: sessionId})
  var book = session.cart.find(x=>x.bookId == bookId)
  if(book){
    book.quantity +=1;
    session.save()
  }else{
    session.cart.push({bookId: bookId, quantity: 1})
    session.save()
  }
  
  res.redirect("/books");
};