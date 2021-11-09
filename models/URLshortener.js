const mongoose = require('mongoose')
const Schema = mongoose.Schema
const URLshortenerSchema = new Schema({
	input:{type:String},
	output:{type:String}
})
module.exports = mongoose.model('URL-shortener', URLshortenerSchema)