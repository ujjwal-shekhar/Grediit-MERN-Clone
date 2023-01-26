const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users = require('./models/Users');

const app = express();

mongoose.connect('mongodb+srv://ujjwal-shekhar:<password>@grediit-2021113009.gk5yium.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

