const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/db')
const cors = require('cors');
const app = express()
const ecommerceRoute = require('./Routes/ecommerceRoute')

dotenv.config();

//enable cors
app.use(cors({
  //allow rqst from this origin
  origin: 'http://localhost:5173', 
  //allow http met
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  //allow cookies
  credentials: true 
}));

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