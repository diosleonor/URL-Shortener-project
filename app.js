const express = require('express')
const app = express()
const PORT = 3000
const URLshortener = require('./models/URLshortener')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const generate5digits = require('./generate5digits')

// database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/URL-shortener')
const db = mongoose.connection
db.on('error', () => console.log('Mongoose error.'))
db.once('open', () => console.log('Mongoose connected.'))

// handlebars start
app.engine('hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//route setting
app.get('/', (req,res) => {
	res.render('index')
})
app.post('/result', (req, res) => {
	const input = req.body //{inputURL:'http://google.com'}
	const inputURL = req.body.inputURL
	const fiveDigits = generate5digits()
	return URLshortener.create({ inputURL, fiveDigits })
		.then(() => res.render('result', { fiveDigits, inputURL }))
		.catch(error => console.log(error))
})

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`)})