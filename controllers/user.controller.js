var User = require("../models/user.model");
var bcrypt = require("bcrypt");
const saltRounds = 10;
var cloudinary = require("../cloudinary");

module.exports.getIndex = async (req, res) => {
  var user = await User.find();
  console.log(user)
  res.render("users", { users: user });
};
module.exports.postIndex = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    var data = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      wrongLoginCount: 0,
      isAdmin: false,
      avatar: result.secure_url
    };
    User.create(data);
    res.redirect("/users");
  } catch (err) {
    console.log(err);
  }
};
module.exports.delete = async (req, res) => {
  var email = req.params.email;
  await User.findOneAndDelete({ email: email }, function(err) {
    if (err) console.log(err);
  }).then(result => console.log(result));
  res.redirect("/users");
};
module.exports.getUpdate = async (req, res) => {
  var email = req.params.email;
  var user = await User.findOne({ email: email });
  res.render("update-user", { user: user });
};
module.exports.postUpdate = async (req, res) => {
  var email = req.params.email;
  var name = req.body.name;
  console.log(name);
  await User.findOneAndUpdate({ email: email }, { name: name });
  res.redirect("/users");
};
