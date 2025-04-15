const {Pool} = require('pg')
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.DB_User,
    host: process.env.DB_Host,
    database: process.env.DB_Name,
    password: process.env.DB_Password,
    port: process.env.DB_Port,
})
pool.connect((err) => {
    if (err) {
      console.error('Database connection error:', err.stack);
    } else {
      console.log('Database connected successfully');
    }
  });


module.exports = pool;