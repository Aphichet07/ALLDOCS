const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const packageDef = protoLoader.loadSync("monitor.proto")
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage

const server = new grpc.Server()

const todos = []

server.addService(todoPackage.TodoService.service, {
    "createTodo": (call, callback) => {
        const todoItem = {
            "id": todos.length + 1,
            "text": call.request.text
        };
        todos.push(todoItem);
        callback(null, todoItem); 
    },
    "readTodo": (call, callback) => {
        callback(null, { "items": todos });
    }
})

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err){
        return console.error(err)
    }
    console.log(`Server running at http://0.0.0.0:${port}`)
    server.start()
})