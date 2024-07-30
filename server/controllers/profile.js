const promisePool = require("../database");

exports.getProfile = async (req, res) => {
  try {
    const [profile] = await promisePool.query(
      "SELECT * FROM users WHERE id = 1"
    );
    res.json(profile);
  } catch (err) {
    console.error("Error fetching profile from database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const query = `
		UPDATE users
		SET username = ?, email = ?, password = ?
		WHERE id = ?
	  `;
    await promisePool.query(query, [username, email, password, id]);
    const [updatedProfile] = await promisePool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    res.json(updatedProfile[0]);
  } catch (err) {
    console.error("Error updating profile in database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
