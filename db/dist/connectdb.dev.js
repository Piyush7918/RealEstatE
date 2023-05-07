"use strict";

var mongoose = require('mongoose');

var url = "mongodb://127.0.0.1:27017/RealEstatE";
var live_Url = "mongodb+srv://19singhpiyush99:Piyush1999@cluster0.adanoei.mongodb.net/Real_Estate?retryWrites=true&w=majority";

var connectDB = function connectDB() {
  return mongoose.connect(live_Url).then(function () {
    console.log("Database Connected.....");
  })["catch"](function (error) {
    console.log(error);
  });
};

module.exports = connectDB;