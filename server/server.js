const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/data', (req, res) => {
  const filePath = path.join(__dirname, '..', 'assets', 'data.json');
  res.sendFile(filePath);
});

app.listen(5000, () => { console.log('Server is running on port 5000') });