const express = require('express')
const authenMiddleware = require('./middleware/authen.middleware')
const jwt = require('jsonwebtoken')
const app = express()
require('dotenv').config()

app.use(express.json())

const secret = process.env.SECRET

app.post('/login', (req, res) =>{
    const {username, role} = req.body 
    
    const option = {
        expiresIn: '1h'
    }

    const payload = {
        username: username,
        role: username === 'admin' ? 'admin' : 'user'
    }

    const token = jwt.sign(payload, secret, option)

    res.json({token : token})
})

app.get('/admin-mode' ,authenMiddleware,  (req, res) =>{
    res.json({message : "Welcome to admin mode"})
})


app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})