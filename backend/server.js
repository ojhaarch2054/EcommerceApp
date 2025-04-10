const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/db')
const app = express()

dotenv.config();

app.get('/', (req, res) => {
  res.send('Helloooooo from me')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})