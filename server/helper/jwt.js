'use strict'

const jwt = require('jsonwebtoken')

const JWT_SECRET =  process.env.JWT_SECRET || 'rahasia'

const generateToken = (payload) =>{
   console.log(payload)
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'})
}


const verifyToken = (token => {
    return jwt.verify(token, JWT_SECRET)
})

module.exports = {generateToken, verifyToken}