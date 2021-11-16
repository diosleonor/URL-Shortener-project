const express = require('express')
const router = express.Router()
const URLshortener = require('../../models/URLshortener')
const generate5digits = require('../../generate5digits')

router.post('/', (req, res) => {
	const fiveDigits = generate5digits()
	// 用inputURL為依據找出一筆資料
	// 以三元運算子判斷資料是否存在，不存在就創一個
	URLshortener.findOne({inputURL:req.body.inputURL})
	.then(data => data ? data : URLshortener.create({ inputURL:req.body.inputURL, fiveDigits }))
	.then(data => res.render('result', { fiveDigits:data.fiveDigits, inputURL:req.body.inputURL}))
	.catch(error => console.log(error))
})

module.exports = router