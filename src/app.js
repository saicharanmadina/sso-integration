const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

app.use('/', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});