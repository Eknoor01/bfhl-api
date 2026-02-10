const VALID_KEYS = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

function validateSingleKey(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, key: null, error: 'Invalid request body' };
  }

  const keys = Object.keys(body);

  if (keys.length === 0) {
    return { valid: false, key: null, error: 'Empty request' };
  }

  if (keys.length > 1) {
    return { valid: false, key: null, error: 'Multiple keys not allowed' };
  }

  const key = keys[0];

  if (!VALID_KEYS.includes(key)) {
    return { valid: false, key: null, error: `Invalid key: ${key}` };
  }

  return { valid: true, key, error: null };
}

function validateFibonacci(value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return { valid: false, error: 'Must be an integer' };
  }

  if (value < 0) {
    return { valid: false, error: 'Cannot be negative' };
  }

  return { valid: true, error: null };
}

function validateIntegerArray(value, operation) {
  if (!Array.isArray(value)) {
    return { valid: false, error: `${operation} requires an array` };
  }

  if (value.length === 0) {
    return { valid: false, error: 'Array cannot be empty' };
  }

  for (let i = 0; i < value.length; i++) {
    const num = value[i];

    if (typeof num !== 'number' || !Number.isInteger(num)) {
      return { valid: false, error: `Invalid element at index ${i}` };
    }

    if (num < 0) {
      return { valid: false, error: `Negative number at index ${i}` };
    }
  }

  return { valid: true, error: null };
}

function validateAI(value) {
  if (typeof value !== 'string') {
    return { valid: false, error: 'Must be a string' };
  }

  if (value.trim().length === 0) {
    return { valid: false, error: 'Cannot be empty' };
  }

  return { valid: true, error: null };
}

module.exports = {
  validateSingleKey,
  validateFibonacci,
  validateIntegerArray,
  validateAI
};
