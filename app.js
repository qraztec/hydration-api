const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
// const {Pool} = require('pg')
const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB,
    },
  });
//   const pool = new Pool({
//     user: process.env.DATABASE_USER,
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE_DB,
//     password: process.env.DATABASE_PW,
//     port: 5432,
//     ssl : {rejectUnauthorized: false}
//   })

//   async function testConnection() {
//     console.log(process.env.DATABASE_USER)
//     try {
//       await pool.connect();  // tries to get a connection from the pool
//       console.log('Connected to the database successfully!');
//     } catch (err) {
//       console.log('Database connection failed:');
//     } finally {
//       await pool.end();  // closes all active connections once they return to the pool
//     }
//   }
// testConnection()
// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

const enter = require('./controllers/enter');

app.post('/enter', (req, res) => {enter.handleEnter(req,res,db)})