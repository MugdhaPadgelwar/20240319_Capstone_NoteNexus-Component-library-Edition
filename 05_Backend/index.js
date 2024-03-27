// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Create an Express application
const app = express();

// importing cors
const cors = require("cors");

// Load environment variables from .env file
require("dotenv").config();

// Set the port to listen for incoming requests
const port = process.env.SERVER_PORT;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// cors middleware
app.use(cors());

const Page = require("./models/Page");

// Connect to the database
require("./database/connection");

const userRoutes = require("./router/userRouter");
const todoRoutes = require("./router/todoRouter");
const kanbanRoutes = require("./router/kanbanRouter");
const pageRoutes = require("./router/pageRouter");
const adminRoutes = require("./router/adminRouter");

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
app.use("/kanban", kanbanRoutes);
app.use("/pages", pageRoutes);
app.use("/admin", adminRoutes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the Express application
module.exports = app;
