let tasks = [
  {id: 1, title: "Task One", completed: false},
  {id: 2, title: "Task Two", completed: true},
];

const getAllTasks = (req, res) => {
  res.render("index", {title: "Task List", tasks});
};

const getAddTaskForm = (req, res) => {
  res.render("add", {title: "Add Task"});
};

const addTask = (req, res) => {
  let {title} = req.body;
  console.log(req.body);
  tasks.push({id: tasks.length + 1, title, completed: false});
  res.redirect("/");
};

const getEditTaskForm = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (!task) {
    res.redirect("/");
  } else {
    res.render("edit", {title: "Edit Task", task});
  }
};

const editTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (!task) {
    res.redirect("/");
  } else {
    let {title} = req.body;
    task.title = title;
    res.redirect("/");
  }
};

const completeTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = true;
  }
  res.redirect("/");
};

const uncompleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = false;
  }
  res.redirect("/");
};

const deleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
};

export default {
  getAllTasks,
  getAddTaskForm,
  addTask,
  getEditTaskForm,
  editTask,
  completeTask,
  uncompleteTask,
  deleteTask,
};
