var User = require("../../models/user.model");

module.exports.getIndex = async function(req, res) {
  var users = await User.find();
  res.json(users);
};
module.exports.postCreate = async (req, res) => {
  var user = await User.create(req.body);
  res.json(user);
};
