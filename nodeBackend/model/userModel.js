const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      require:true
    },
    password:{
        type:String,
        require:true
    }
  });
  
  const UserModel = mongoose.model('userModel', userSchema)

  module.exports = {UserModel}