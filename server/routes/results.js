const result = require('../models/result')
const user = require('../models/user')
const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const results = express.Router()

results.post('/submit', (req, res) => {

let token = req.body.token
let score = req.body.score

if((score < 100 && score > 70) || (score === 100 || score === 70)){
	var grd = "A"
}
if((score < 70 && score > 60) || (score === 69 || score === 60)){
	var grd = "B"
}
if((score < 60 && score > 50) || (score === 59 || score === 50)){
	var grd = "C"
}
if((score < 50 && score > 40) || (score === 49 || score === 40)){
	var grd = "D"
}
if((score < 40)){
	var grd = "F"
}

if(token){
	jwt.verify(token, process.env.SECRET_key, (err, decoded) => {
		if(err){
			res.status(401).send(err)
		}
		else{result.findOne({where: {userId: decoded.id}}).then(data => {
			if(!data){
				result.create({score: score, grade: grd, userId: decoded.id}).then(resp => {
					console.log(resp)
					res.status(201).json({status: "Result Saved"})
				}).catch(err => {
					if(err) throw err
				})
			}
			else if(data){
				res.status(401).send({message: "User already has a result"})
			}
		})
				
		}
	})
}
else if(!token){
	res.status(401).send({message: "No token provided"})
}
})

module.exports = results