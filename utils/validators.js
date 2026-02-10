/**
 * Validation utilities for BFHL API
 * Ensures strict input validation as per evaluation criteria
 */

const VALID_KEYS = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

/**
 * Validates that exactly one valid key is present in the request body
 * @param {Object} body - Request body
 * @returns {Object} - { valid: boolean, key: string|null, error: string|null }
 */
function validateSingleKey(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, key: null, error: 'Request body must be a JSON object' };
  }

  const keys = Object.keys(body);

  if (keys.length === 0) {
    return { valid: false, key: null, error: 'Request body cannot be empty' };
  }

  if (keys.length > 1) {
    return { valid: false, key: null, error: 'Request must contain exactly one key' };
  }

  const key = keys[0];

  // Case-sensitive key validation
  if (!VALID_KEYS.includes(key)) {
    return { valid: false, key: null, error: `Invalid key: "${key}". Must be one of: ${VALID_KEYS.join(', ')}` };
  }

  return { valid: true, key, error: null };
}

/**
 * Validates fibonacci input
 * @param {any} value - Input value
 * @returns {Object} - { valid: boolean, error: string|null }
 */
function validateFibonacci(value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return { valid: false, error: 'Fibonacci input must be an integer' };
  }

  if (value < 0) {
    return { valid: false, error: 'Fibonacci input cannot be negative' };
  }

  // No upper limit - spec doesn't require it

  return { valid: true, error: null };
}

/**
 * Validates array of integers (for prime, lcm, hcf)
 * @param {any} value - Input value
 * @param {string} operation - Operation name for error messages
 * @returns {Object} - { valid: boolean, error: string|null }
 */
function validateIntegerArray(value, operation) {
  if (!Array.isArray(value)) {
    return { valid: false, error: `${operation} input must be an array` };
  }

  if (value.length === 0) {
    return { valid: false, error: `${operation} input cannot be an empty array` };
  }

  for (let i = 0; i < value.length; i++) {
    const num = value[i];

    if (typeof num !== 'number' || !Number.isInteger(num)) {
      return { valid: false, error: `All elements must be integers (found non-integer at index ${i})` };
    }

    if (num < 0) {
      return { valid: false, error: `Negative numbers are not allowed (found ${num} at index ${i})` };
    }
  }

  return { valid: true, error: null };
}

/**
 * Validates AI question input
 * @param {any} value - Input value
 * @returns {Object} - { valid: boolean, error: string|null }
 */
function validateAI(value) {
  if (typeof value !== 'string') {
    return { valid: false, error: 'AI input must be a string' };
  }

  if (value.trim().length === 0) {
    return { valid: false, error: 'AI input cannot be empty' };
  }

  return { valid: true, error: null };
}

module.exports = {
  validateSingleKey,
  validateFibonacci,
  validateIntegerArray,
  validateAI
};
