const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory in the frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Example API route
app.post('/api/example/test', (req, res) => {
    const { username, password } = req.body;
    

    if (username.includes("'") || password.includes("'")) {
        const simulatedSQLQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log(`Simulated SQL Query: ${simulatedSQLQuery}`);
        res.json({ message: 'Potential SQL Injection detected!' });
    } 
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful!' });
    } else {
        res.json({ message: 'Invalid credentials.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
