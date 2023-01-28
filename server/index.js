const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = process.env.ATLASURI;

const catalog = require('./routes/catalog');
app.use('/', catalog);

const start = async () => {
  try {
    await mongoose.connect(mongoDB);
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();