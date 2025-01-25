const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

const cors = require("cors");

// * Create an express server

const app = express();

// * Database connection
dbConnection();

// CORS configuration
app.use(cors());

// * Create a route for get public directory
app.use(express.static("public"));

// * Parse and read the body of the request
app.use(express.json());

// * Create all routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
