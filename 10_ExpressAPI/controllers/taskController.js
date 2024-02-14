let tasks = [
  {id: 1, title: "Task One", completed: false},
  {id: 2, title: "Task Two", completed: true},
];

const getAllTasks = (req, res) => {
  res.json(tasks);
};

const getTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({err: true, message: "Task not found"});
  } else {
    res.json({task});
  }
};

const addTask = (req, res) => {
  let {title} = req.body;

  if (!title) {
    res.status(400).json({err: true, message: "Title is required"});
  } else {
    //console.log(req.body);
    tasks.push({id: tasks.length + 1, title, completed: false});
    res.json({err: false, message: "Task added"});
  }
};

const editTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (!task) {
    res.status(404).json({err: true, message: "Task not found"});
  } else {
    let {title} = req.body;
    task.title = title;
    res.json({err: false, message: "Task updated"});
  }
};

const completeTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = true;
    res.json({err: false, message: "Task completed"});
  } else {
    res.status(404).json({err: true, message: "Task not found"});
  }
};

const uncompleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = false;
    res.json({err: false, message: "Task uncompleted"});
  } else {
    res.status(404).json({err: true, message: "Task not found"});
  }
};

const deleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    res.status(404).json({err: true, message: "Tarea no encontrada"});
  } else {
    tasks.splice(taskIndex, 1);
    res.json({err: false, message: "Tarea eliminada"});
  }
};

export default {
  getAllTasks,
  getTask,
  addTask,
  editTask,
  completeTask,
  uncompleteTask,
  deleteTask,
};
