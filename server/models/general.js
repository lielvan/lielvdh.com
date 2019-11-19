var mongoose = require("mongoose");

var generalSchema = new mongoose.Schema({
    label: String,
    text: String,
    is_file: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("General", generalSchema);