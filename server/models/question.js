const db = require('../db/db.js')
const sequelize = require('sequelize')


module.exports = db.seq.define("question", {
	title: {
		type: sequelize.STRING,
		allowNull: false
	},
	correctAnswer: {
		type: sequelize.STRING,
		allowNull: false
	},
	option1: {
		type: sequelize.STRING,
		allowNull: false
	},
	option2: {
		type: sequelize.STRING,
		allowNull: false
	},
	option3: {
		type: sequelize.STRING,
		allowNull: false
	},
	option4: {
		type: sequelize.STRING,
		allowNull: false
	}

}, {
	sequelize, modelName: "question"
})
db.seq.sync()