import {createServer} from "http";
import {get} from "https";

const hostname = "localhost",
  port = 3000,
  options = {
    host: "jonmircha.com",
    port: 443,
    path: "/cursos",
  };

let htmlCode = "";

const httpCliente = (res) => {
  console.log(
    `El sitio ${options.host} ha respondido. Código de estado: ${res.statusCode}. Mensaje: ${res.statusMessage}.`
  );

  res.on("data", (data) => {
    htmlCode += data;
    console.log(data, data.toString());
  });
};

const httpError = (err) => {
  console.error(
    `El sitio ${options.host} ha respondido. Código de estado: ${err.code}. Mensaje: ${err.message}.`
  );
};

const webServer = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(htmlCode);
};
//Instancia cliente HTTP o HTTPA
get(options, httpCliente).on("error", httpError);

// Instancia servidor HTTP
createServer(webServer).listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
