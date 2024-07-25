const promisePool = require("../database");

exports.getProjects = async (req, res) => {
  try {
    const [projects] = await promisePool.query("SELECT * FROM projects");
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createProject = async (req, res) => {
  const { name } = req.body;

  try {
    const sql = "INSERT INTO projects (name) VALUES (?)";
    const values = [name];
    const [result] = await promisePool.query(sql, values);

    const insertedProject = {
      id: result.insertId,
      name,
    };

    res.status(201).json(insertedProject);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
