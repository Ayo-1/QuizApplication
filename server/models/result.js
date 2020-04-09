const db = require('../db/db')
const sequelize = require('sequelize')
const user = require('./user')
const result = db.seq.define("result", {
	score: {
	type: sequelize.INTEGER,
	allowNull: false
	},
	grade: {
	type: sequelize.STRING,
	allowNull: false
	}
}, {sequelize, modelName: 'result'})

db.seq.sync()
module.exports = result