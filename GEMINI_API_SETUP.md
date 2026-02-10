# Google Gemini API Key Setup Guide

## 📍 Where to Add Your API Key

**File Location**: `/Users/eknoor/Desktop/Bajaj/.env`

Open the `.env` file and replace `your_gemini_api_key_here` with your actual API key:

```bash
PORT=3000
OFFICIAL_EMAIL=eknoor1655.be23@chitkara.edu.in
NODE_ENV=development
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

## 🔑 How to Get Your Gemini API Key

### Step 1: Visit Google AI Studio
Go to: https://makersuite.google.com/app/apikey

### Step 2: Sign in with Google Account
Use your Google account to sign in.

### Step 3: Create API Key
1. Click on **"Get API Key"** or **"Create API Key"**
2. Select **"Create API key in new project"** (or use existing project)
3. Copy the generated API key (starts with `AIzaSy...`)

### Step 4: Add to .env File
Paste the API key in your `.env` file:
```bash
GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

## ⚠️ Important Notes

1. **Keep it Secret**: Never commit the `.env` file to Git (it's already in `.gitignore`)
2. **Free Tier**: Gemini API has a generous free tier (60 requests per minute)
3. **Fallback**: If API key is not configured, the AI endpoint will return "Unknown"

## 🧪 Testing After Setup

### Quick Test (Recommended First)
```bash
# Test Gemini API directly
node test-gemini.js

# Should output:
# ✅ Success! Full response: ...
# 📝 Extracted answer: Delhi
```

### Full Server Test
```bash
# Start the server
npm start

# Test AI endpoint
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'

# Expected response (within 5 seconds):
# {"is_success":true,"official_email":"eknoor1655.be23@chitkara.edu.in","data":"Delhi"}
```

## ⚙️ Technical Details

- **Model**: Using `gemini-1.5-flash` (faster and more reliable than gemini-pro)
- **Timeout**: 5 seconds (prevents hanging)
- **Fallback**: Returns "Unknown" if API fails or times out
- **Error Handling**: Graceful degradation, no crashes

## 🚀 For Deployment

When deploying to Vercel/Railway/Render, add the environment variable:
- **Key**: `GEMINI_API_KEY`
- **Value**: Your actual API key (AIzaSy...)

### Vercel
```bash
vercel env add GEMINI_API_KEY
# Paste your API key when prompted
```

### Railway/Render
Add in the dashboard under Environment Variables.

## 📚 API Documentation

- **Gemini API Docs**: https://ai.google.dev/docs
- **Pricing**: https://ai.google.dev/pricing (Free tier: 60 RPM)
- **Models**: Using `gemini-pro` for text generation
