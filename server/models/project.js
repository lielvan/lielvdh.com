var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  title: String,
  github_link: String,
  text: String,
  language: String,
  code_image: String,
  gif_image: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Project", projectSchema);