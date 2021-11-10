const express = require('express')
const app = express()
const PORT = 3000
const URLshortener = require('./models/URLshortener')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generate5digits = require('./generate5digits')

// database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/URL-shortener')
const db = mongoose.connection
db.on('error', () => console.log('Mongoose error.'))
db.once('open', () => console.log('Mongoose connected.'))

// view engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

//route setting
app.get('/', (req,res) => {
	res.render('index')
})
// 輸入相同網址時，產生一樣的縮址
app.post('/result', (req, res) => {
	const fiveDigits = generate5digits()
	// 用inputURL為依據找出一筆資料
	URLshortener.findOne({inputURL:req.body.inputURL})
	// 以三元運算子判斷資料是否存在，不存在就創一個
	.then(data => data ? data : URLshortener.create({ inputURL:req.body.inputURL, fiveDigits }))
	.then(data => res.render('result', { fiveDigits:data.fiveDigits, inputURL:req.body.inputURL}))
	.catch(error => console.log(error))
})
app.get('/:id', (req,res) => {
	const id = req.params.id
	URLshortener.find({ fiveDigits:id })
	.lean()
	.then(data => res.redirect(data[0].inputURL))
	.catch(error => console.log(error))
})

// app listening
app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`)})