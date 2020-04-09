const cors = require('cors')
const bodyparser = require('body-parser')

const express = require('express')

const app = express()
const router = require('./routes/users')
const questions = require('./routes/questions')
const results = require('./routes/results')
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
require('dotenv').config();

const PORT = process.env.PORT || 4000
app.use('/', router)

app.use('/questions', questions)

app.use('/results', results)


app.listen(PORT, () => console.log(`server running on port ${PORT}`))