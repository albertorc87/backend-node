const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')

const config = require('./config')
const socket = require('./socket')
const db = require('./db')
const router = require('./network/routes')

db(config.dbUrl)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

socket.connect(server)

router(app)

app.use(config.publicRoute, express.static('public'))

server.listen(config.port, function() {
    console.log(`La app está escuchando en ${config.host}:${config.port}`)
})
