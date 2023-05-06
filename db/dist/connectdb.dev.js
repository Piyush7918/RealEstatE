"use strict";

var mongoose = require('mongoose');

var url = "mongodb://127.0.0.1:27017/RealEstatE";
var live_Url = "mongodb+srv://chauhanpiyush560:piyush123@cluster0.6rkz1ig.mongodb.net/Estatehub?retryWrites=true&w=majority";

var connectDB = function connectDB() {
  return mongoose.connect(live_Url).then(function () {
    console.log("Database Connected.....");
  })["catch"](function (error) {
    console.log(error);
  });
};

module.exports = connectDB;