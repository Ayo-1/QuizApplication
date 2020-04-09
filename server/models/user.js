const db = require('../db/db.js')
const sequelize = require('sequelize')
const result = require("./result")
const user = db.seq.define('user', {
	id: {
		type: sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	fullName: {
		type: sequelize.STRING,
		allowNull: false
	},
	userName: {
		type: sequelize.STRING,
		allowNull: false
	},
	dob: {
		type: sequelize.DATE,
		allowNull: false
	},
	nationality: {
		type: sequelize.STRING,
		allowNull: false
	},
	gender: {
		type: sequelize.STRING,
		allowNull: false},
	email: {
	type: sequelize.STRING,
	allowNull: false},
	password: {
	type: sequelize.STRING,
	allowNull: false},
	pictureUrl: {
		type: sequelize.STRING,
		allowNull: true
	}
}, {
	sequelize,
	modelName: 'user',
	timeStamps: false,
	scopes: {
		withoutPassword:{
		attributes: {exclude: ['password']}
	}
	}
})

user.hasOne(result)
db.seq.sync()
module.exports = user