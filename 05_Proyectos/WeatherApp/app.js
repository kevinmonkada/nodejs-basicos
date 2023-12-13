import axios from "axios";
import chalk from "chalk";

const API_KEY = "Your-API-KEY-HERE";

function displayWeather(city, weatherData) {
  console.log(chalk.yellow(`\nInformación del clima: ${city}:`));
  console.log(
    chalk.yellow(
      "☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
    )
  );
  console.log(chalk.cyan("Descripción:"), weatherData.weather[0].description);
  console.log(chalk.cyan("Temperatura:"), `${weatherData.main.temp} °C`);
  console.log(chalk.cyan("Humedad:"), `${weatherData.main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del Viento:"),
    `${weatherData.wind.speed} m/s`
  );
  console.log(
    chalk.yellow("☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️\n")
  );
}

function handleError(err) {
  console.log(chalk.red(`Error: ${err.message}`));
  process.exit(1);
}

async function getWeather(city) {
  try {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await axios.get(endpoint, {
      params: {q: city, appid: API_KEY, units: "metric"},
    });

    //console.log(response);
    return response.data;
  } catch (err) {
    console.log(chalk.red("No se pudo obtener el clima") + err);
    throw new Error(`No es posible obtener el clima de ${city}`);
  }
}

function initApp() {
  let city = process.argv[2];
  //console.log(city);

  if (!city) {
    console.log(chalk.red("Por favor ingresa una ciudad"));
    console.log(chalk.red("Ejemplo: node app.js Bogota"));
    return;
  }
  getWeather(city)
    .then((weatherData) => displayWeather(city, weatherData))
    .catch(handleError);
}

initApp();
