const express = require('express')
const router = express.Router()
const URLshortener = require('../../models/URLshortener')

router.get('/', (req,res) => {
	res.render('index')
})

module.exports = router