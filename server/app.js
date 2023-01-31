const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/userAuth"); //Import routes for "catalog" area of site

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/", catalogRouter); // Add catalog routes to middleware chain.

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.ATLAS_URI;

main().then(() => {
    console.log("Connected to DB!");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
  
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
  res.setHeader('Access-Control-Allow-Headers',"*");
  res.header('Access-Control-Allow-Credentials', true);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8080, () => {
  console.log("Server is running on port: 8080");
})

module.exports = app;
