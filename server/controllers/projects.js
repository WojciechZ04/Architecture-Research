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

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    await promisePool.query("DELETE FROM tasks WHERE project_id = ?", [projectId]);
    await promisePool.query("DELETE FROM projects WHERE id = ?", [projectId]);

    res.status(204).end();
  } catch (err) {
    console.error("Error deleting project from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editProject = async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;

  try {
    const [result] = await promisePool.query(
      "UPDATE projects SET name = ? WHERE id = ?",
      [name, projectId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("Error updating project in database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
