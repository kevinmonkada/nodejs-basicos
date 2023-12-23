import {createServer} from "http";

const server = createServer((request, response) => {
  //response.writeHead(200, {"Content-Type": "text/plain"});
  response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  //response.end("Hola mundo! 😅");
  response.end("<h1>Hola mundo! 😅</h1>");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor web en ejecución en http://127.0.0.1:3000/");
});
