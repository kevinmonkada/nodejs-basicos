import express from "express";
import {resolve} from "path";

const app = express();

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.end("<h1>Hola Mundo desde Express.js con metodo End</h1>");
  //res.send("<h1>Hola Mundo desde Express.js con metodo Send</h1>");
});

app.get("/json", (req, res) => {
  res.json({
    name: "Usuario",
    age: 29,
    youtube: "https://youtube.com/usuario",
    email: "",
  });
});

app.get("/archivo", (req, res) => {
  res.sendFile(resolve("index.html"));
});

app.get("/plantilla", (req, res) => {
  //No funciona esta ruta porque hay que especificar el motor de plantillas a express
  res.render("plantilla");
});

app.get("/routing", (req, res) => {
  //res.send("<h1>Bienvenidos a routing.com</h1>");
  res.redirect(301, "https://jonmircha.com");
});

app.get("/3", (req, res) => {});

app.listen(3000, () => {
  console.log("Iniciando Express desde http://localhost:3000");
});
