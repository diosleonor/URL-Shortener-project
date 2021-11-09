const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLshortenerSchema = new Schema({
	inputURL:{type:String},
	fiveDigits:{type:String}
})
module.exports = mongoose.model('URL-shortener', URLshortenerSchema)