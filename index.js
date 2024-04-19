//Loads the express module
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

// configure dotenv to use the env variables
dotenv.config();

// initialize the express app
const app = express();
// get port or add default port
const port = process.env.PORT || 3000;
// get db url from env or set as empty string
const DB_URL = process.env.DB_URL || "";

app.use(
  cors({
    origin: "*",
  })
);

// configure the views folder for rendering the views
app.set("views", path.join(__dirname, "views"));
// set up app to use EJS as template engine
app.set("view engine", "ejs");

// Serves static files (we need it to import a css file)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to the database url
const client = new MongoClient(DB_URL);

app.get("/", (_, res) => {
  res.send("I am Up");
});

app.get("/get-all-projects", async (req, res) => {
  try {
    const projects = await getAllProjects();
    console.log({
      status: 200,
      data: projects,
      message: "Projects Fetched Successfully!",
    });
    return res.status(200).json({
      status: 200,
      data: projects,
      message: "Projects Fetched Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.post("/create-new-project", async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    await addProject({ name, description, dueDate });
    return res.status(200).json({
      status: 200,
      message: "Project Created Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.get("/get-all-tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    return res.status(200).json({
      status: 200,
      data: tasks,
      message: "Tasks Fetched Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

app.post("/create-new-task", async (req, res) => {
  try {
    const { name, description, dueDate, status, projectName } = req.body;
    await addTask({ name, description, dueDate, status, projectName });
    return res.status(200).json({
      status: 200,
      message: "Task Created Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

//Makes the app listen to port 3000
app.listen(port, () =>
  console.log(`App listening to http://localhost:${port}`)
);

// MONGODB FUNCTIONS
async function connection() {
  db = client.db("tasksync");
  return db;
}

// Function to select all projects from database
async function getAllProjects() {
  db = await connection();
  let results = db.collection("projects").find({});
  let res = await results.toArray();
  console.log(res);
  return res;
}

// Function to select all tasks from database
async function getAllTasks() {
  db = await connection();
  const results = db.collection("tasks").find({});
  const res = await results.toArray();
  return res;
}

// Function to add a new project
async function addProject(projectData) {
  db = await connection();
  await db.collection("projects").insertOne(projectData);
}

// Function to add a new task
async function addTask(taskData) {
  db = await connection();
  await db.collection("tasks").insertOne(taskData);
}
