const promisePool = require("../database");

exports.getHome = async (req, res) => {
  try {
	const userId = req.userId;
    const [users] = await promisePool.query("SELECT * FROM users WHERE id = ?", [userId]);

    const [tasks] = await promisePool.query("SELECT * FROM tasks");

    const [projects] = await promisePool.query("SELECT * FROM projects");

    const data = {
      users,
      tasks,
      projects,
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching home data from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
