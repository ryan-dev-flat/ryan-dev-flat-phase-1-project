// Importing the necessary modules for the server
const express = require('express'); // Express framework to handle HTTP requests
const cors = require('cors'); // CORS middleware to enable cross-origin resource sharing

// Initializing the express application
const app = express();

// Middleware setup
app.use(cors()); // Apply CORS middleware to allow cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Mock database for storing comments
// In a real-world scenario, this would be replaced with a database service
let commentsDatabase = [];

// Route to serve the main HTML page from the 'public' directory
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to handle POST requests to '/comments'
// This is where users can submit their comments and ratings
app.post('/comments', (req, res) => {
  // Extracting data from the request body
  const { userName, comment, rating, imageUrl } = req.body;

  // Basic validation for incoming data
  // Ensuring that none of the fields are empty
  if (!userName || !comment || !rating || !imageUrl) {
    // If any field is missing, send a 400 Bad Request response
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new comment object with a unique ID and timestamp
  const newComment = {
    id: commentsDatabase.length + 1, // Incremental ID for the comment
    userName, // Username of the commenter
    comment, // The comment text
    rating, // Rating given by the user
    imageUrl, // URL of the image associated with the comment
    timestamp: new Date() // Current date and time of the comment submission
  };

  // Add the new comment to the mock database array
  commentsDatabase.push(newComment);

  // Respond with the newly created comment object and a 201 Created status
  res.status(201).json(newComment);
});

// Error handling middleware
// This will catch any errors that occur in the routing process
app.use((err, req, res, next) => {
  // Log the error stack to the console for debugging
  console.error(err.stack);
  // Send a 500 Internal Server Error response
  res.status(500).send('Something broke!');
});

// Start the server on the specified port
// Using an environment variable for the port with a default of 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Log a message to the console indicating the server is running and on which port
  console.log(`Server running on port ${PORT}`);
});
