'use strict'

const express = require('express')
const mongoose = require('mongoose')


//initialize express into app
const app = express()

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat'
const PORT = process.env.PORT || 3000
//app.set('port', port)

//middlewares

//express.static executes in context of where your node_modules dir is
app.use(express.static('client'))

app.get('/api/title', (req, res) => {
	res.json({title: 'MEAN Chat'})
})

const Message = mongoose.model('message', {
	author: String,
	content: String
})

app.get('/api/messages', (req, res, err) => {
	Message
		.find()
		.then(messages => {
			res.json({messages})
		})
		.catch(err)
})

//says to use es6 promises as promise library
mongoose.Promise = Promise

mongoose.connect(MONGODB_URL, () => {
	app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
})
//app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
