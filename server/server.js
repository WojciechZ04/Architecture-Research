const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const promisePool = require('./database');
const organizationsRouter = require('./routes/organizations');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');


const app = express();
const TOKEN_SECRET = "your_secret_key";


app.use(cors());
app.use(bodyParser.json());


app.use('/api/organizations', organizationsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

//AUTHENTICATION SHOULD USE QUERIES ?=LOGIN OR ?=SIGNUP
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
