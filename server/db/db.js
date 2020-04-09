const sequelize = require('sequelize')
require('dotenv').config();
const db = {}
const seq = new sequelize("quiz_db", "root", "", {
	host: "localhost",
	dialect: "mysql",
	operatorAliases: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
db.seq = seq
module.exports = db;
