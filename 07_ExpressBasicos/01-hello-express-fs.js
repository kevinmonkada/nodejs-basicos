import express from "express";
import {resolve} from "path";

const app = express();

app.get("/", (req, res) => {
  //res.end("<h1>Hola Mundo desde Express.js</h1>");
  res.sendFile(resolve("index.html"));
  //console.log(req);
  //console.log(res);
});

app.listen(3000, () => {
  console.log("Iniciando Express desde http://localhost:3000");
});
