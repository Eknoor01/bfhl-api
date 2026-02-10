/**
 * Core operations for BFHL API
 * Implements fibonacci, prime, lcm, hcf, and AI logic
 */

const { GoogleGenAI } = require('@google/genai');

/**
 * Generate first n Fibonacci numbers
 * @param {number} n - Number of Fibonacci numbers to generate
 * @returns {number[]} - Array of Fibonacci numbers
 */
function fibonacci(n) {
    if (n === 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }

    return result;
}

/**
 * Check if a number is prime
 * @param {number} num - Number to check
 * @returns {boolean} - True if prime, false otherwise
 */
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }

    return true;
}

/**
 * Filter prime numbers from array
 * @param {number[]} numbers - Array of numbers
 * @returns {number[]} - Array of prime numbers
 */
function prime(numbers) {
    return numbers.filter(isPrime);
}

/**
 * Calculate GCD of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - GCD
 */
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

/**
 * Calculate HCF (Highest Common Factor) of array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} - HCF
 */
function hcf(numbers) {
    if (numbers.length === 1) return numbers[0];

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = gcd(result, numbers[i]);
        if (result === 1) break; // Optimization
    }

    return result;
}

/**
 * Calculate LCM of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - LCM
 */
function lcmTwo(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate LCM (Least Common Multiple) of array
 * @param {number[]} numbers - Array of numbers
 * @returns {number} - LCM
 */
function lcm(numbers) {
    if (numbers.length === 1) return numbers[0];

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcmTwo(result, numbers[i]);
    }

    return result;
}

/**
 * AI question answering using Google Gemini API
 * Integrates external AI API as per spec requirements
 * Uses official Google GenAI SDK with gemini-2.5-flash model
 * @param {string} question - Question string
 * @returns {Promise<string>} - One-word answer
 */
async function AI(question) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.warn('GEMINI_API_KEY not configured, using fallback');
        return 'Unknown';
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${question}\n\nAnswer in one word only. Do not provide explanations or additional text.`,
        });

        const answer = response.text?.trim() || 'Unknown';

        // Extract first word if response contains multiple words
        return answer.split(/\s+/)[0];

    } catch (error) {
        console.error('AI API Error:', error.message);
        return 'Unknown';
    }
}

module.exports = {
    fibonacci,
    prime,
    lcm,
    hcf,
    AI
};
