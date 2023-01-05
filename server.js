require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log("Connected to DB"))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)


app.listen(3000, () => console.log('Server started'))