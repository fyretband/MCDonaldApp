require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000   
const errorHandling = require('./middleware/errorHandler')

const router = require('./routers')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)
app.use(errorHandling)
app.listen(PORT, function (err){
    if(err) console.log(err)
    console.log("Server listening on PORT", PORT);
})