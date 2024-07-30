const promisePool = require("../database");

exports.getProfile = async (req, res) => {
  try {
	const [profile] = await promisePool.query("SELECT * FROM users WHERE id = 1");	
	res.json(profile);
  } catch (err) {
	console.error("Error fetching profile from database:", err);
	res.status(500).json({ error: "Internal server error" });
  }
}