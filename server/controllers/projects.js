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

exports.getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const [projects] = await promisePool.query(
      "SELECT * FROM projects WHERE id = ?",
      [projectId]
    );

    if (projects.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    } 

      const project = projects[0];

      const [tasks] = await promisePool.query(
        "SELECT * FROM tasks WHERE project_id = ?",
        [projectId]
      );

      const response = {
        ...project,
        tasks: tasks
      };

      res.json(response);
  } catch (err) {
    console.error("Error fetching project from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
