const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "belktvcw4ezkyu8keaul-mysql.services.clever-cloud.com",
  user: "ukuel5nokadq4yv1",
  password: "np4GET9HbFmQHmBbE68o",
  database: "belktvcw4ezkyu8keaul",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

module.exports = promisePool;