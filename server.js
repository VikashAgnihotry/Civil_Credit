const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from current directory

// Routes
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt received:', { email, password });

    // Mock authentication logic
    if (email && password) {
        // Simulate successful login
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                email: email,
                name: 'Test User'
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Email and password are required.'
        });
    }
});

app.post('/api/signup', (req, res) => {
    const { fullname, email, password } = req.body;

    console.log('Signup attempt received:', { fullname, email, password });

    if (fullname && email && password) {
        // Simulate successful signup
        res.json({
            success: true,
            message: 'Account created successfully!',
            user: {
                name: fullname,
                email: email
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'All fields are required.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
