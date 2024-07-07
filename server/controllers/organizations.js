const promisePool = require("../database");

exports.getOrganizations = async (req, res) => {
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
};

exports.createOrganization = async (req, res) => {
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
};

exports.getOrganization = async (req, res) => {
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
};
