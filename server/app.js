/* ExpressJS setup */
const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* Error handler */
const createError = require("http-errors");

/* Misc Stuff */
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");


/* App config */
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/* Routes */
const authRoutes = require("./routes/authRoutes");
const subgreddiitRoutes = require("./routes/subgreddiitRoutes");
app.use("/users", authRoutes);
app.use("/subgreddiits", subgreddiitRoutes);

// const subgreddiitRoutes = require("./routes/subgreddiitRoutes");
// app.use("/subgreddiits", subgreddiitRoutes);

/*MongoDB setup*/
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.ATLAS_URI;

async function main() {
  await mongoose.connect(mongoDB);
}
main().then(() => {
    console.log("Connected to DB!");
}).catch(err => console.log(err));


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
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
})

module.exports = app;
