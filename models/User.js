const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  password: String,
  address:String,
  role: {
    type: String,
    enum: ["admin", "vendor", "user"],
    default: "user"
  },
    isVerified: {
    type: Boolean,
    default: false  
  },

  isBlocked: {
    type: Boolean,
    default: false   
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
