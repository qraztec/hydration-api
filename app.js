// import the required modules
const express = require('express'); //imports the library 
const app = express(); //initializes an instance of the Express application
//const port = 9000;

// database connection set up using Knex
const db = require('knex')({
    client: 'pg', // specifies the PostgreSQL database client
    connection: {
      // Connection string for the PostgreSQL database
      connectionString: "postgresql://hydration_data_cuem_user:AzwRb0OHkxEyNa0keMbtEymNACtcgcUp@dpg-criui3e8ii6s73fal8p0-a.virginia-postgres.render.com/hydration_data_cuem",
      ssl: { rejectUnauthorized: false }, //SSL connections
      host: "dpg-criui3e8ii6s73fal8p0-a", //Database host
      port: 5432, // Port
      user: "hydration_data_cuem_user", // Database user
      password: "AzwRb0OHkxEyNa0keMbtEymNACtcgcUp", // Database password
      database: "hydration_data_cuem", // Database name
    },
  });

//parse JSON bodies of incoming requests
app.use(express.json());

// Define a route for the root URL that responds with "Hello World!"
app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

// Import command handlers from the controllors directory
const commands = require('./controllers/commands');

app.post('/post', (req, res) => {commands.handlePost(req,res,db)}) // define a POST route
app.get('/get', (req, res) => {commands.handleGet(req,res,db)}) // define a GET route
app.put('/put', (req, res) => {commands.handlePut(req,res,db)}) // define a PUT route
app.delete('/delete', (req, res) => {commands.handleDelete(req,res,db)}) // define a DELETE route

// Start the server
app.listen(8000, () => {
  console.log('app is running on port 8000')
})
