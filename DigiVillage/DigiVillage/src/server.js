const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Or your React app's port
  methods: ['GET', 'POST']
}));

// MySQL Connection Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'digivillage'
});

// Connect to MySQL with retry logic
const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(connectWithRetry, 2000); // Retry after 2 seconds
      return;
    }
    console.log('Connected to MySQL database');
  });
};

connectWithRetry();

// Test database connection
db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('Database test query failed:', err);
  } else {
    console.log('Database test query succeeded. Result:', results[0].solution);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: db.state });
});

// API endpoint to receive and store messages
app.post('/api/messages', (req, res) => {
  console.log("---------- NEW MESSAGE REQUEST ----------");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  
  const { text, sender, timestamp } = req.body;
  console.log('Received message data:', req.body);
  
  
  
  if (!text || !sender || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO messages (text, sender, timestamp) VALUES (?, ?, ?)';
  db.query(sql, [text, sender, timestamp], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      return res.status(500).json({ error: 'Failed to save message', details: err.message });
    }
    console.log('Message saved with ID:', result.insertId);
    res.status(201).json({ 
      message: 'Message saved successfully', 
      insertId: result.insertId 
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Temporary test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});