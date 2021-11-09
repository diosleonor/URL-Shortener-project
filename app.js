const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//route setting

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`)})