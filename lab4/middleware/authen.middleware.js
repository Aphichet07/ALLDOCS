const { response } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET

const authenMiddleware = (req, res, next) =>{
    const authenHead = req.headers['authorization']
    const data = req.body

    const token = authenHead.split(' ')[1]
    jwt.verify(token , secret, (err, user)=>{
        req.user = user
        next()
    })
}

module.exports = authenMiddleware