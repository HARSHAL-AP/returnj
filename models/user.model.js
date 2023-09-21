const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 
  otp: {
    type: String,
  },
   phone_number: {
    type: String,
    require: true,
  },
  ipInformation:{
    
  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
