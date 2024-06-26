const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "project_manager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

app.use(cors());
app.use(bodyParser.json());

function generateUniqueId(tasks) {
  let newId = 1;
  while (tasks.some((task) => task.id === newId)) {
    newId++;
  }
  return newId;
}

// app.get("/api/database", async (req, res) => {
//   try {
//     const [rows, fields] = await promisePool.query(
//       "SELECT * FROM user"
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error("Database query failed:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "SELECT * FROM user WHERE username = ?";
    const [users] = await promisePool.query(query, [username]);

    if (users.length > 0) {
      const user = users[0];
      if (password === user.password) { 
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/data", (req, res) => {
  const filePath = path.join(__dirname, "..", "assets", "data.json");
  res.sendFile(filePath);
});

app.post("/api/tasks", (req, res) => {
  const newTask = req.body;
  const projectId = newTask.projectId;
  const filePath = path.join(__dirname, "..", "assets", "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading projects file");
      return;
    }
    let projects;
    try {
      projects = JSON.parse(data).project;
    } catch (parseError) {
      res.status(500).send("Error parsing projects file");
      return;
    }

    const project = projects.find((p) => p.id === Number(projectId));
    if (!project) {
      res.status(404).send("Project not found");
      return;
    }

    const id = generateUniqueId(project.tasks);
    newTask.id = id;
    project.tasks.push(newTask);

    fs.writeFile(
      filePath,
      JSON.stringify({ project: projects }, null, 2),
      (err) => {
        if (err) {
          res.status(500).send("Error updating projects file");
          return;
        }
        res.status(201).send("Task added to project");
      }
    );
  });
});

app.delete("/api/tasks/:projectId/:taskId", (req, res) => {
  const filePath = path.join(__dirname, "..", "assets", "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading projects file");
      return;
    }
    let projects;
    try {
      projects = JSON.parse(data).project;
    } catch (parseError) {
      res.status(500).send("Error parsing projects file");
      return;
    }

    const { projectId, taskId } = req.params;
    const project = projects.find((p) => p.id === Number(projectId));
    if (!project) {
      res.status(404).send("Project not found");
      return;
    }

    const taskIndex = project.tasks.findIndex((t) => t.id === Number(taskId));
    if (taskIndex === -1) {
      res.status(404).send("Task not found");
      return;
    }

    project.tasks.splice(taskIndex, 1);

    fs.writeFile(
      filePath,
      JSON.stringify({ project: projects }, null, 2),
      (err) => {
        if (err) {
          res.status(500).send("Error updating projects file");
          return;
        }
        res.status(200).send("Task deleted successfully");
      }
    );
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
