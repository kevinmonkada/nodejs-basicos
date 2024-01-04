import {createServer} from "http";

const server = createServer((request, response) => {
  if (request.url === "/") {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.end("<h1>Home 🙃</h1>");
  } else if (request.url === "/hola") {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.end("<h1>Hola 😋</h1>");
  } else if (request.url === "/adios") {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.end("<h1>Adios 😥</h1>");
  } else {
    response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    response.end("<h1>404 NOT FOUND 😱</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor web en ejecución en http://127.0.0.1:3000/");
});
