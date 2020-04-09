const sequelize = require('sequelize')
require('dotenv').config();
const db = {}
const seq = new sequelize("uGATUFLj27", "uGATUFLj27", "WyB1OUnNro", {
	host: "remotemysql.com",
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
