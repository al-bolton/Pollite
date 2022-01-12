const express = require('express');
const cors = require('cors');

const router = require('./router');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(router);

// Connect to DB
require('./db');
// Set up server
app.listen(PORT, () => {
  console.log(`Pollite server listening at http://localhost:${PORT}`)
});