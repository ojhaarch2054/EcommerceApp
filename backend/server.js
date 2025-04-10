const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/db')
const app = express()
const ecommerceRoute = require('./Routes/ecommerceRoute')

dotenv.config();
//middleware to parse json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Helloooooo from me')
})

app.use('/', ecommerceRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})