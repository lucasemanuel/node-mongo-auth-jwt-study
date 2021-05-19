const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')

require('dotenv').config()

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env

mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', error => console.log(error))
mongoose.Promise = global.Promise

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)
app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('Server start!'))
