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
