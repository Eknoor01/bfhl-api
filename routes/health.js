const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const officialEmail = process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in';

    res.status(200).json({
        is_success: true,
        official_email: officialEmail
    });
});

module.exports = router;
