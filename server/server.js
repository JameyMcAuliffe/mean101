'use strict'

const express = require('express')

//initialize express into app
const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

//middlewares

//express.static executes in context of where your node_modules dir is
app.use(express.static('client'))

app.get('/api/title', (req, res) => {
	res.json({title: 'MEAN 101 from Node'})
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
