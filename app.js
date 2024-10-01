const express = require('express');
const app = express();
//const port = 9000;

const db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: "postgresql://hydration_data_cuem_user:AzwRb0OHkxEyNa0keMbtEymNACtcgcUp@dpg-criui3e8ii6s73fal8p0-a.virginia-postgres.render.com/hydration_data_cuem",
      ssl: { rejectUnauthorized: false },
      host: "dpg-criui3e8ii6s73fal8p0-a",
      port: 5432,
      user: "hydration_data_cuem_user",
      password: "AzwRb0OHkxEyNa0keMbtEymNACtcgcUp",
      database: "hydration_data_cuem",
    },
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const commands = require('./controllers/commands');

app.post('/post', (req, res) => {commands.handlePost(req,res,db)})
app.get('/get', (req, res) => {commands.handleGet(req,res,db)})
app.put('/put', (req, res) => {commands.handlePut(req,res,db)})
app.delete('/delete', (req, res) => {commands.handleDelete(req,res,db)})

// Start the server
app.listen(8000, () => {
  console.log('app is running on port 8000')
})