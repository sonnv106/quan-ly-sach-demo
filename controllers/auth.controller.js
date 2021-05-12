var User = require("../models/user.model");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.login = (req, res) => {
  res.render("login");
};
module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({ email });
  if (!user) {
    res.render("login", {
      errors: ["User does not exists"],
      values: req.body
    });
    return;
  }

  if (user.wrongLoginCount < 4) {
    bcrypt.compare(password, user.password, async function(err, result) {
      // result == true
      if (result == true) {
        await User.findByIdAndUpdate(user.id, { wrongLoginCount: 0 });
        res.cookie("userId", user.id, { signed: true });
        res.redirect("/users");
      }
      if (result == false) {
        var wrongLoginCount = user.wrongLoginCount + 1;
        await User.findByIdAndUpdate(user.id, {
          wrongLoginCount: wrongLoginCount
        });
        res.render("login", {
          errors: ["Wrong password"],
          values: req.body
        });
        return;
      }
    });
  }
  if (user.wrongLoginCount >= 4) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jackyson123456789@gmail.com",
        pass: "anhson123456789"
      }
    });
    var mailOptions = {
      from: "jackyson123456789@gmail.com",
      to: user.email,
      subject: "Sending Email using Node.js",
      text: "The wrong password too much!"
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return;
  }
};
