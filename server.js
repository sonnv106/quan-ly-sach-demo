// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.''''
require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
var csurf = require("csurf");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
mongoose.connection
  .once("open", function() {
    console.log("successful");
  })
  .on("error", function(err) {
    console.log(err);
  });
app.set("view engine", "pug");
app.set("views", "./views");
var cookieParser = require("cookie-parser");
var cloudinary = require("cloudinary");
var userRouter = require("./routes/user.route");
var bookRouter = require("./routes/book.route");
var authRouter = require("./routes/auth.route");
var cartRouter = require("./routes/cart.route");
var apiBookRoute = require("./api/routes/book.route");
var apiTransaction = require("./api/routes/transaction.route");
var apiLogin = require("./api/routes/login.route");
var apiUser = require("./api/routes/user.route");
var transferRouter = require("./routes/transfer.route");
var transactionRouter = require("./routes/transaction.route");
var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));
// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));
app.use(sessionMiddleware);
app.use("/", authRouter);
//api
app.use("/api/books", apiBookRoute);
app.use("/api/transactions", apiTransaction);
app.use("/api/login", apiLogin);
app.use("/api/users", apiUser);
//routes
app.use("/users", authMiddleware.requireAuth, userRouter);
app.use("/books", authMiddleware.requireAuth,bookRouter);
app.use("/transactions", authMiddleware.requireAuth, transactionRouter);
app.use("/cart", cartRouter);
app.use("/transfer", authMiddleware.requireAuth, transferRouter);
// app.use(csurf({ cookie: true }));
// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use("/", (req, res) => {
  res.redirect("/books");
});

//User
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
