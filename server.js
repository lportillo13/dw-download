const express = require('express');
const app = express();
const audioRouter = require('./routes/audio');
const path = require('path');

app.use('/audio', audioRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Use the process.env.PORT variable if available
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
