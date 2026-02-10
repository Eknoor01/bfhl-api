/**
 * BFHL API Route Handler
 * POST /bfhl - Main endpoint for all operations
 */

const express = require('express');
const router = express.Router();
const { validateSingleKey, validateFibonacci, validateIntegerArray, validateAI } = require('../utils/validators');
const operations = require('../utils/operations');

/**
 * POST /bfhl
 * Handles fibonacci, prime, lcm, hcf, and AI operations
 */
router.post('/', async (req, res) => {
    try {
        // Step 1: Validate exactly one key is present
        const { valid, key, error } = validateSingleKey(req.body);

        if (!valid) {
            // Log error in development, but return minimal response per spec
            if (process.env.NODE_ENV === 'development') {
                console.error('Validation error:', error);
            }
            return res.status(400).json({
                is_success: false
            });
        }

        const inputValue = req.body[key];
        const officialEmail = process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in';

        // Step 2: Route to appropriate operation with validation
        switch (key) {
            case 'fibonacci': {
                const validation = validateFibonacci(inputValue);
                if (!validation.valid) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Fibonacci validation error:', validation.error);
                    }
                    return res.status(400).json({
                        is_success: false
                    });
                }

                const result = operations.fibonacci(inputValue);
                return res.status(200).json({
                    is_success: true,
                    official_email: officialEmail,
                    data: result
                });
            }

            case 'prime': {
                const validation = validateIntegerArray(inputValue, 'Prime');
                if (!validation.valid) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('Prime validation error:', validation.error);
                    }
                    return res.status(400).json({
                        is_success: false
                    });
                }

                const result = operations.prime(inputValue);
                return res.status(200).json({
                    is_success: true,
                    official_email: officialEmail,
                    data: result
                });
            }

            case 'lcm': {
                const validation = validateIntegerArray(inputValue, 'LCM');
                if (!validation.valid) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('LCM validation error:', validation.error);
                    }
                    return res.status(400).json({
                        is_success: false
                    });
                }

                const result = operations.lcm(inputValue);
                return res.status(200).json({
                    is_success: true,
                    official_email: officialEmail,
                    data: result
                });
            }

            case 'hcf': {
                const validation = validateIntegerArray(inputValue, 'HCF');
                if (!validation.valid) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('HCF validation error:', validation.error);
                    }
                    return res.status(400).json({
                        is_success: false
                    });
                }

                const result = operations.hcf(inputValue);
                return res.status(200).json({
                    is_success: true,
                    official_email: officialEmail,
                    data: result
                });
            }

            case 'AI': {
                const validation = validateAI(inputValue);
                if (!validation.valid) {
                    if (process.env.NODE_ENV === 'development') {
                        console.error('AI validation error:', validation.error);
                    }
                    return res.status(400).json({
                        is_success: false
                    });
                }

                // AI is now async due to Gemini API integration
                const result = await operations.AI(inputValue);
                return res.status(200).json({
                    is_success: true,
                    official_email: officialEmail,
                    data: result
                });
            }

            default:
                if (process.env.NODE_ENV === 'development') {
                    console.error('Invalid operation key');
                }
                return res.status(400).json({
                    is_success: false
                });
        }

    } catch (error) {
        console.error('Error in /bfhl:', error);
        return res.status(500).json({
            is_success: false
        });
    }
});

module.exports = router;
