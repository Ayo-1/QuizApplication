const sequelize = require('sequelize')
require('dotenv').config();
const db = {}
const seq = new sequelize("uGATUFLj27", "uGATUFLj27", "WyB1OUnNro", {
	host: "remotemysql.com",
	dialect: "mysql"
})
db.seq = seq
module.exports = db;
