const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");

const packageDef = protoLoader.loadSync("monitor.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.TodoService(
  "localhost:40000",
  grpc.credentials.createInsecure(),
);

client.createTodo(
  {
    text: "เรียนเขียน gRPC กับ Node.js",
  },
  (err, response) => {
    if (err) {
      console.error(err);
    }
    console.log("สร้างสำเร็จ:", response);
  },
);

client.readTodo({}, (err, response) => {
  console.log("รายการทั้งหมด:", response.items);
});
