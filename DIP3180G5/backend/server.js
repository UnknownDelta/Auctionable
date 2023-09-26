require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const carRoutes = require('./routes/lists')

// initialize express.js
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route
app.use('/', carRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
