var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  isbn: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Book", bookSchema);