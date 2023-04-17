const express = require('express');
const app = express();
const audioRouter = require('./routes/audio');
const path = require('path');

app.use('/audio', audioRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
