import {createInterface} from "readline";
import chalk from "chalk";

const tasks = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.yellow.bold("🦊🦊🦊 To Do App 🦊🦊🦊"));
  console.log(chalk.blueBright("Menu de Opciones:"));
  console.log("1. Agregar tarea");
  console.log("2. Listar tareas");
  console.log("3. Completar tarea");
  console.log("4. Salir");
  console.log("\n");
}

function addTask() {
  rl.question(chalk.bgGrey("Ingresa una nueva tarea: "), (task) => {
    tasks.push({task, completed: false});
    console.log(chalk.green.bold("Tarea agregada con exito!\n"));
    displayMenu();
    chooseOption();
    console.log(tasks);
  });
}

function listTasks() {
  console.log(chalk.yellow.bold("\n🦊🦊🦊 Tareas pendientes 🦊🦊🦊\n"));
  if (tasks.length === 0) {
    console.log(chalk.green("No hay tareas pendientes 🥳🥳.\n"));
  } else {
    tasks.forEach((task, index) => {
      let status = task.completed ? chalk.green("✅") : chalk.red("❌");
      if (status) {
        console.log(chalk.greenBright(`${index + 1}. ${task.task} ${status}`));
      } else {
        console.log(chalk.redBright(`${index + 1}. ${task.task} ${status}`));
      }
    });
  }
  displayMenu();
  chooseOption();
}

function completeTask() {
  rl.question(
    chalk.bgGray("Ingresa el indice de la tarea que deseas completar: "),
    (index) => {
      const task = tasks[index - 1];
      if (task) {
        task.completed = true;
        console.log(chalk.green.bold("\nTarea completada con exito!✅\n"));
      } else {
        console.log(chalk.red.bold("\nTarea no encontrada.❌\n"));
      }
      displayMenu();
      chooseOption();
    }
  );
}

function chooseOption() {
  rl.question("Digita el numero de tu eleccion: ", (choice) => {
    switch (choice) {
      case "1":
        addTask();
        break;
      case "2":
        listTasks();
        break;
      case "3":
        completeTask();
        break;
      case "4":
        console.log(chalk.yellow("Saliendo 👋🏻👋🏻🦊..."));
        rl.close();
        break;
      default:
        console.log(chalk.red("\nOpción inválida, Intenta Nuevamente.\n"));
        displayMenu();
        chooseOption();
        break;
    }
  });
}

displayMenu();
chooseOption();
