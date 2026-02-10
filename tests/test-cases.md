# BFHL API Test Cases

This document contains comprehensive test cases for the BFHL API, covering valid inputs, edge cases, and error scenarios.

## Valid Input Tests

### 1. Fibonacci Operation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3]
}
```

### 2. Prime Operation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 3, 4, 5, 6, 7, 8, 9, 10]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2, 3, 5, 7]
}
```

### 3. LCM Operation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [4, 6, 8]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 24
}
```

### 4. HCF Operation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [12, 18, 24]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 6
}
```

### 5. AI Operation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Delhi"
}
```

## Edge Case Tests

### 6. Empty Array
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": []}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Prime input cannot be an empty array"
}
```

### 7. Single Element Array
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [7]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [7]
}
```

### 8. Array with Zero
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [0, 1, 2, 3]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2, 3]
}
```

### 9. Large Fibonacci Number
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 20}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]
}
```

### 10. Large Numbers in Array
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [100, 200, 300]}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 600
}
```

## Error Case Tests

### 11. Multiple Keys
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5, "prime": [2, 3]}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Request must contain exactly one key"
}
```

### 12. Wrong Key Casing
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"Fibonacci": 5}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Invalid key: \"Fibonacci\". Must be one of: fibonacci, prime, lcm, hcf, AI"
}
```

### 13. Invalid Data Type (String instead of Number)
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": "five"}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Fibonacci input must be an integer"
}
```

### 14. Invalid Data Type (Number instead of Array)
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": 5}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Prime input must be an array"
}
```

### 15. Negative Number in Fibonacci
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": -5}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Fibonacci input cannot be negative"
}
```

### 16. Negative Numbers in Array
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, -3, 5]}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Negative numbers are not allowed (found -3 at index 1)"
}
```

### 17. Non-Integer in Array
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 3.5, 5]}'

# Expected Response (400):
{
  "is_success": false,
  "error": "All elements must be integers (found non-integer at index 1)"
}
```

### 18. Empty Request Body
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Request body cannot be empty"
}
```

### 19. Malformed JSON
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5'

# Expected Response (400):
{
  "is_success": false,
  "error": "Invalid JSON format"
}
```

### 20. Invalid Key
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"invalid_key": 5}'

# Expected Response (400):
{
  "is_success": false,
  "error": "Invalid key: \"invalid_key\". Must be one of: fibonacci, prime, lcm, hcf, AI"
}
```

## Health Check Test

### 21. Health Endpoint
```bash
curl http://localhost:3000/health

# Expected Response (200):
{
  "status": "healthy",
  "timestamp": "2026-02-10T05:36:49.000Z",
  "uptime": 123.456
}
```

## Security Tests

### 22. SQL Injection Attempt
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "DROP TABLE users; --"}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Unknown"
}
```

### 23. XSS Attempt
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "<script>alert(\"XSS\")</script>"}'

# Expected Response (200):
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Unknown"
}
```

## Test Summary

- **Total Tests**: 23
- **Valid Input Tests**: 5
- **Edge Case Tests**: 5
- **Error Case Tests**: 10
- **Health Check Tests**: 1
- **Security Tests**: 2

All tests verify:
✅ Exact response structure (`is_success`, `official_email`, `data`)
✅ Correct HTTP status codes (200, 400, 500)
✅ Comprehensive input validation
✅ Graceful error handling (no crashes)
✅ Security guardrails
