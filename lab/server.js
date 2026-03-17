const jayson = require('jayson')

const server = jayson.server({
    SayHello: (args, callback) =>{
        const word = args[0]
        const name = args[1]
        
        callback(null, `Hello from ${name} from ${word}`)
    }
})

server.http().listen(8000, ()=>{
    console.log("http://localhost:8000 server is running...")
})