const express = require("express");
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = 'mongodb+srv://ujjwal-shekhar:0lUv7SOiS0CznLES@grediit-2021113009.gk5yium.mongodb.net/grediit?retryWrites=true&w=majority';

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