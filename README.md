# BFHL API

A robust REST API implementing mathematical operations (Fibonacci, Prime, LCM, HCF) and AI question answering with comprehensive input validation and error handling.

## 🚀 Features

- ✅ **Exact API Response Structure** with `is_success`, `official_email`, and `data` fields
- ✅ **Correct HTTP Status Codes** (200, 400, 500)
- ✅ **Comprehensive Input Validation** (single key, type checking, edge cases)
- ✅ **Graceful Error Handling** (no crashes)
- ✅ **Security Guardrails** (malformed JSON, injection attempts)
- ✅ **CORS Enabled** for cross-origin requests

## 📋 API Endpoints

### POST /bfhl

Main endpoint supporting five operations. **Must contain exactly one key**.

#### Operations

| Key | Input Type | Description | Example |
|-----|------------|-------------|---------|
| `fibonacci` | Integer (0-100) | Returns first n Fibonacci numbers | `{"fibonacci": 5}` |
| `prime` | Integer array | Filters prime numbers | `{"prime": [2,3,4,5]}` |
| `lcm` | Integer array | Calculates LCM | `{"lcm": [4,6,8]}` |
| `hcf` | Integer array | Calculates HCF | `{"hcf": [12,18,24]}` |
| `AI` | String | One-word answer | `{"AI": "What is the capital of India?"}` |

#### Success Response (200)
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": <result>
}
```

#### Error Response (400/500)
```json
{
  "is_success": false,
  "error": "Error message"
}
```

### GET /health

Health check endpoint.

```json
{
  "status": "healthy",
  "timestamp": "2026-02-10T05:36:49.000Z",
  "uptime": 123.456
}
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Configure environment
# Edit .env and set your official email
OFFICIAL_EMAIL=your_email@chitkara.edu.in

# Start server
npm start
```

## 🧪 Testing

See [tests/test-cases.md](tests/test-cases.md) for comprehensive test cases.

### Quick Tests

```bash
# Fibonacci
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'

# Prime
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,3,4,5,6,7,8,9,10]}'

# LCM
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [4,6,8]}'

# HCF
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [12,18,24]}'

# AI
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'

# Health
curl http://localhost:3000/health
```

## 📁 Project Structure

```
Bajaj/
├── server.js              # Main Express application
├── routes/
│   ├── bfhl.js           # POST /bfhl handler
│   └── health.js         # GET /health handler
├── utils/
│   ├── validators.js     # Input validation functions
│   └── operations.js     # Core logic (fibonacci, prime, lcm, hcf, AI)
├── tests/
│   └── test-cases.md     # Comprehensive test documentation
├── package.json
├── .env                  # Environment configuration
├── .gitignore
└── vercel.json           # Deployment configuration
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable
vercel env add OFFICIAL_EMAIL
```

### Other Platforms

- **Railway**: Connect GitHub repo, add environment variables
- **Render**: Create Web Service, add environment variables
- **Heroku**: `git push heroku main`, set config vars

## ⚠️ Validation Rules

- **Exactly one key** must be present in request
- **Case-sensitive** key names (e.g., `Fibonacci` ❌, `fibonacci` ✅)
- **No empty arrays** for prime/lcm/hcf
- **No negative numbers** (except AI accepts any string)
- **Integers only** for fibonacci/prime/lcm/hcf
- **Fibonacci limit**: 0-100

## 🔒 Security

- Graceful handling of malformed JSON
- Protection against injection attempts
- No crashes on invalid input
- Proper error messages without exposing internals

## 📊 Test Coverage

- ✅ 5 valid input tests
- ✅ 5 edge case tests (empty arrays, single elements, large numbers)
- ✅ 10 error case tests (multiple keys, wrong casing, invalid types, negative numbers)
- ✅ 1 health check test
- ✅ 2 security tests

**Total: 23 comprehensive test cases**

## 📝 License

ISC
