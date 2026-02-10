/**
 * Test script for Gemini API using official SDK
 * Run with: node test-gemini.js
 */

require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.error('❌ GEMINI_API_KEY not configured in .env');
        process.exit(1);
    }

    console.log('🔑 API Key configured');
    console.log('🚀 Testing Gemini API with official SDK...\n');

    try {
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'What is the capital of India? Answer in one word only.',
        });

        console.log('✅ Success! Full response:');
        console.log(JSON.stringify(response, null, 2));

        console.log('\n📝 Extracted answer:', response.text);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testGemini();
