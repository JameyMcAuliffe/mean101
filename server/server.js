'use strict'

const express = require('express')
const { Server } = require('http')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const socketio = require('socket.io')

//initialize express into app
const app = express()

//creates a secondary http server to listen to web sockets
const server = Server(app)
const io = socketio(server)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat'
const PORT = process.env.PORT || 3000
//app.set('port', port)

//middlewares

//express.static executes in context of where your node_modules dir is
app.use(express.static('client'))
app.use(json())

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

app.post('/api/messages', (req, res, err) => {
	const msg = req.body
	Message
		.create(msg)
		.then(msg => res.json(msg))
		.catch(err)
})

//says to use es6 promises as promise library
mongoose.Promise = Promise

mongoose.connect(MONGODB_URL, () => {
	//server.listen listens for both app and server
	server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
})
//app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

io.on('connection', socket => {
	console.log(`Socket connected: ${socket.id}`)
	socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`))
})
