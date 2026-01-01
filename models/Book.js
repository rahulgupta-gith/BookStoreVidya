const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  category: {
    type:String,
    enum: ['10th', '12th', 'Novel', 'Philosophy', 'Engineering', 'Medical', 'Self-Help'],
    default:'Book'
  },
  price: Number,
  isFree: Boolean,
  condition: String, // New / Used
  description:String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image:{
    type:String
  }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
