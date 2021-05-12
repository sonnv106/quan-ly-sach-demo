var Transaction = require("../../models/transaction.model");
module.exports.getTransaction = async (req, res) => {
  var transaction = await Transaction.find();
  res.json(transaction);
};
module.exports.postTransaction =async (req, res) =>{
  var transaction = await Transaction.create(req.body);
  res.json(transaction);
}