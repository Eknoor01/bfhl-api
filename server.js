require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

const bfhlRouter = require('./routes/bfhl');
const healthRouter = require('./routes/health');

app.use('/bfhl', bfhlRouter);
app.use('/health', healthRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'BFHL API Server',
        endpoints: {
            'POST /bfhl': 'Main API endpoint',
            'GET /health': 'Health check'
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        is_success: false
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            is_success: false
        });
    }

    res.status(500).json({
        is_success: false
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
