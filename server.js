/**
 * BFHL API Server
 * Main Express application with routes and middleware
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
const bfhlRouter = require('./routes/bfhl');
const healthRouter = require('./routes/health');

app.use('/bfhl', bfhlRouter);
app.use('/health', healthRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'BFHL API Server',
        endpoints: {
            'POST /bfhl': 'Main API endpoint (fibonacci, prime, lcm, hcf, AI)',
            'GET /health': 'Health check endpoint'
        }
    });
});

// 404 handler - spec compliant
app.use((req, res) => {
    res.status(404).json({
        is_success: false
    });
});

// Global error handler - spec compliant
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);

    // Handle JSON parsing errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            is_success: false
        });
    }

    res.status(500).json({
        is_success: false
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`BFHL API Server running on port ${PORT}`);
    console.log(`Official Email: ${process.env.OFFICIAL_EMAIL}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Not configured'}`);
});

module.exports = app;
