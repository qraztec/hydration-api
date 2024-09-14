const express = require('express');
const app = express();

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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(8000, () => {
    console.log('app is running on port 8000')
})

const enter = require('./controllers/enter');

app.post('/enter', (req, res) => {enter.handleEnter(req,res,db)})