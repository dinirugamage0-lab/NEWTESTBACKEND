require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Database Connection
const uri = process.env.MONGODB_URI;  // Get the MongoDB URI from the environment variables

if (!uri) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1); // Exit the application if the URI is not defined
}

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
