import {get} from "https";

const urlSite = {
  hostname: "jonmircha.com",
  port: 443,
  path: "/cursos",
};

get(urlSite, (res) => {
  console.log(
    `El sitio ${urlSite.hostname} ha respondido. Código de estado: ${res.statusCode}. Mensaje: ${res.statusMessage}.`
  );
}).on("error", (err) => {
  console.error(
    `El sitio ${urlSite.hostname} ha respondido. Código de estado: ${err.code}. Mensaje: ${err.message}.`
  );
});
