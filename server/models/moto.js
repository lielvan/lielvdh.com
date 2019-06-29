var mongoose = require("mongoose");

var motoSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Moto", motoSchema);