const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const router = express.Router()
const secretKey = "string";
const user = require("../models/user")
const result = require('../models/result')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config();
router.use(cors())
router.use(bodyparser.json())
router.use(bodyparser.urlencoded({extended: false}))



router.post("/login", (req, res) => {
console.log(req.body.email)
console.log(req.body.password)
	user.findOne({where: {

		email: req.body.email
			
		}}).then(resp => {
			
		

			if(resp){
				const passwd = bcrypt.compareSync(req.body.password, resp.password)
				if(passwd){
					const token = jwt.sign({id: resp.id}, secretKey)
				res.status(200).json({auth: true, token: token})
					}
				else if(!passwd){
					res.status(401).json({auth: false, token: null, err: "Incorrect password supplied"})
				}
			}
			else{
				res.status(404).json({err: "User does not exist"})
				
			}


	})
})

router.post('/register', (req, res) => {
		const {fullname, username, dob, nationality, gender, email, password} = req.body
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password)
		user.findOne({where: {
			email: email
		}}).then(usr => {
			if(usr){
				res.status(401).json({err: `A user is registered with the email address : ${email}`})
			}
			else if(!usr){
				user.create({fullName: fullname, userName: username, dob: dob, nationality: nationality, gender: gender, email: email, password: hash}).then(resp => {
					res.status(200).json({status: `${email} registered successfully`})
				})
			}
		}).catch(err => res.json({err: "err"}))

})
router.post('/update/email', (req, res) => {
const token = req.body.token
const em = req.body.email
console.log(token, em)
if(!token){
	res.status(401).json({auth: false, message: "No token provided"})
}
else{
jwt.verify(token, secretKey, (err, decoded) => {
	if(err){
		res.status(500).json(err)
	}else{

		user.findOne({where: {email: em}}).then((resp) =>{
	if(!resp){

		user.update({email: em}, {where: {id: decoded.id}}).then(data =>  {
			console.log(data)
			res.json({status: "user info updated successfully"})
		}).catch(err => {
			res.json(err)
		})
	}
	else if(resp){
		console.log(resp)
		if(resp.id != decoded.id){
			res.json({err: `${em} is already registered`})
		}
		else if(resp.id == decoded.id){
			res.json({err: `${resp.email} is already used by you`})
		}
	}
}
)
	}

})
}
})

router.post('/user', (req, res) => {
const token = req.body.token
console.log(token)
if(!token){
	res.status(401).json({auth: false, message: "No token Provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(!err){
			user.scope('withoutPassword').findOne({
							where: {id: decoded.id}, 
							include: result

						}).then(user => {
							if(user){
								res.status(200).json(user)
							}
							else if(!user){
								res.status(404).json("User not found")
							}
						}).catch(err => {
							res.status(400).json(err)
						})
		}
		else if(err){
			
			res.status(500).json({auth: false, message: "Failed to authenticate user token "})
		}
	})
}
})


router.post("/update/fullname", (req, res) => {
const token = req.body.token;
const fullname = req.body.fullname;

if(!token){
	res.status(401).json({auth: false, token: null, message: "No token provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(err){
			res.status(500).json({auth: false, message: "Failed to authenticate user token"})
		}
		else if(!err){
			user.update({fullName: fullname}, {where: {id: decoded.id}}).then(res => {
				res.send({status: "user info updated successfully"})
			}).catch(err => {
			res.json(err)
		})
		}
	})
}
})

router.post("/update/username", (req, res) => {
const token = req.body.token;
const username = req.body.username;

if(!token){
	res.status(401).json({auth: false, token: null, message: "No token provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(err){
			res.status(500).json({auth: false, message: "Failed to authenticate user token"})
		}
		else if(!err){
			user.update({userName: username}, {where: {id: decoded.id}}).then(res => {
				res.send({status: "user info updated successfully"})
			}).catch(err => {
			res.json(err)
		})
		}
	})
}
})

router.post("/update/nationality", (req, res) => {
const token = req.body.token;
const nationality = req.body.nationality;

if(!token){
	res.status(401).json({auth: false, token: null, message: "No token provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(err){
			res.status(500).json({auth: false, message: "Failed to authenticate user token"})
		}
		else if(!err){
			user.update({nationality: nationality}, {where: {id: decoded.id}}).then(res => {
				res.send({status: "user info updated successfully"})
			}).catch(err => {
			res.json(err)
		})
		}
	})
}
})
router.post("/update/gender", (req, res) => {
const token = req.body.token;
const gender = req.body.gender;

if(!token){
	res.status(401).json({auth: false, token: null, message: "No token provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(err){
			res.status(500).json({auth: false, message: "Failed to authenticate user token"})
		}
		else if(!err){
			user.update({gender: gender}, {where: {id: decoded.id}}).then(res => {
				res.send({status: "user info updated successfully"})
			}).catch(err => {
			res.json(err)
		})
		}
	})
}
})

router.post("/update/dob", (req, res) => {
const token = req.body.token;
const dob = req.body.dob;

if(!token){
	res.status(401).json({auth: false, token: null, message: "No token provided"})
}
else if(token){
	jwt.verify(token, secretKey, (err, decoded) => {
		if(err){
			res.status(500).json({auth: false, message: "Failed to authenticate user token"})
		}
		else if(!err){
			user.update({dob: dob}, {where: {id: decoded.id}}).then(res => {
				res.send({status: "user info updated successfully"})
			}).catch(err => {
			res.json(err)
		})
		}
	})
}
})
module.exports = router

