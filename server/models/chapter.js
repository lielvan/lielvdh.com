var mongoose = require("mongoose");

var chapterSchema = new mongoose.Schema({
  title: String,
  title_link: String,
  subtitle: String,
  text: String,
  image: String,
  location: String,
  time_frame: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Chapter", chapterSchema);