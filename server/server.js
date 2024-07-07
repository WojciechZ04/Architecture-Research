const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "project_manager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const TOKEN_SECRET = "your_secret_key";

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.userId = user.userId;
    next();
  });
};

const promisePool = pool.promise();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/project", async (req, res) => {
  try {
    const [projects] = await promisePool.query("SELECT * FROM projects");
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [users] = await promisePool.query(query, [username]);

    if (users.length > 0) {
      const user = users[0];
      if (password === user.password) {
        const token = jwt.sign({ userId: user.id }, TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.json({ message: "Login successful", token: token });
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

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await promisePool.query(query, [
      username,
      email,
      password,
    ]);
    const token = jwt.sign({ userId: result.id }, TOKEN_SECRET, {
      expiresIn: "1h",
    });
    console.log(result.id);
    res.json({ message: "Signup successful", token: token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/data", (req, res) => {
  const filePath = path.join(__dirname, "..", "assets", "data.json");
  res.sendFile(filePath);
});

app.get("/api/organizations", authenticateToken, async (req, res) => {
  const userId = req.userId;

  try {
    const sql = `
      SELECT o.* FROM organizations o
      JOIN organization_user_memberships oum ON o.id = oum.organization_id
      WHERE oum.user_id = ?
    `;
    const values = [userId];
    const [organizations] = await promisePool.query(sql, values);
    res.json(organizations);
  } catch (err) {
    console.error("Error fetching user's organizations from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/organizations", async (req, res) => {
  const { name } = req.body;

  try {
    const sql = "INSERT INTO organizations (name) VALUES (?)";
    const values = [name];
    const [result] = await promisePool.query(sql, values);

    const insertedOrganization = { id: result.insertId, name };

    res.status(201).json(insertedOrganization);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/organizations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "SELECT * FROM organizations WHERE id = ?";
    const values = [id];
    const [organizations] = await promisePool.query(sql, values);

    if (organizations.length === 0) {
      // No organization found with the given ID
      return res.status(404).json({ error: "Organization not found" });
    }

    // Return the found organization
    res.json(organizations[0]);
  } catch (err) {
    console.error("Error fetching organizations from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const [tasks] = await promisePool.query("SELECT * FROM tasks");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { name, description, projectId, status } = req.body;

  try {
    const sql =
      "INSERT INTO tasks (name, description, project_id, status) VALUES (?, ?, ?, ?)";
    const values = [name, description, projectId, status];
    const [result] = await promisePool.query(sql, values);

    const insertedTask = {
      id: result.insertId,
      name,
      description,
      projectId,
      status,
    };

    res.status(201).json(insertedTask);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/tasks/:projectId/:taskId", async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    const sql = "DELETE FROM tasks WHERE id = ? AND project_id = ?";
    const values = [taskId, projectId];
    const [result] = await promisePool.query(sql, values);

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
