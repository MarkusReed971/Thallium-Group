const mongoose = require("mongoose");

const schema = mongoose.Schema({
	albumId: Number,
	_id: Number,
    title: String,
    url: String,
    thumbnailUrl: String
})

module.exports = mongoose.model("Image", schema)