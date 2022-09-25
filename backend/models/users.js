const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    dateBirthday: String,
    password: String
  })

exports.User =  mongoose.model("User", userSchema);