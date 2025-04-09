const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config();

app.get('/', (req, res) => {
  res.send('Helloooooo from me')
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`This app listening on port ${port}`)
})