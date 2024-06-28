const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2/promise");

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

app.use(cors());
app.use(bodyParser.json());

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

app.get("/api/organizations", async (req, res) => {
  try {
    const [organizations] = await pool.query('SELECT * FROM organization');
    res.json(organizations);
  } catch (err) {
    console.error("Error fetching organizations from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/organizations", async (req, res) => {
  const { name } = req.body;

  try {
    const sql = 'INSERT INTO organization (name) VALUES (?)';
    const values = [name];
    const [result] = await pool.query(sql, values);

    const insertedOrganization = { id: result.insertId, name };

    res.status(201).json(insertedOrganization);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM task');
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { name, description, projectId, status } = req.body;

  try {
    const sql = 'INSERT INTO task (name, description, project_id, status) VALUES (?, ?, ?, ?)';
    const values = [name, description, projectId, status];
    const [result] = await pool.query(sql, values);

    const insertedTask = { id: result.insertId, name, description, projectId, status };

    res.status(201).json(insertedTask);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/tasks/:projectId/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const sql = 'DELETE FROM task WHERE id = ? AND project_id = ?';
    const values = [taskId, projectId];
    const [result] = await pool.query(sql, values);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Task ${taskId} deleted successfully.` });
    } else {
      res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.error("Error deleting task from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
