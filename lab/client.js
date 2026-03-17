const { response } = require('express')
const jayson = require('jayson')

const client = jayson.client.http({port: 8000})

const params = ['Thailand', 'sdf']

client.request('SayHello', params, (err, response) =>{
    if (err){
        return console.error(err)
    }

    console.log(response.result)
})