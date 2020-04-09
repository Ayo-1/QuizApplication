const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const questions = express.Router()
const question = require('../models/question.js')

questions.get("/", (req, res) => {
const token = req.query.token

if(token){

question.findAll().then(resp => {
	console.log(resp)
	res.status(200).json(resp)
})

}
else if(!token){
	res.status(401).send({message: "No token provided"})
}
})

module.exports = questions