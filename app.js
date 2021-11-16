const express = require('express')
const app = express()
const PORT = 3000
const URLshortener = require('./models/URLshortener')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generate5digits = require('./generate5digits')
const routes = require('./routes')
require('./config/mongoose')

// view engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname:'.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.get('/:id', (req,res) => {
	const id = req.params.id
	URLshortener.find({ fiveDigits:id })
	.then(data => res.redirect(data[0].inputURL))
	.catch(error => console.log(error))
})
// app listening
app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`)})