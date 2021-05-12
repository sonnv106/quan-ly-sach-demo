const bcrypt = require("bcrypt");
var User = require("../../models/user.model");
const saltRounds = 10;

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = User.findOne({ email });
  var password = req.body.password;
  if (!user) {
    res.json("User does not exist.");
    return;
  }
  if (!user.wrongLoginCount) {
    await User.findByIdAndUpdate(user.id, {
      wrongLoginCount: 0
    });
  }
  if (user.wrongLoginCount >= 4) {
    res.json({
      errors: ["Your account has been locked."],
      values: req.body
    });
    if (!(await bcrypt.compare(password, user.password))) {
      await User.findByIdAndUpdate(user.id, {
        wrongLoginCount: (user.wrongLoginCount += 1)
      });
      res.json({
        errors: ["Wrong password."],
        values: req.body
      });

      return;
    }

    res.json({ login: true });
  }
};
