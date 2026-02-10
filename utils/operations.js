const { GoogleGenAI } = require('@google/genai');

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

function prime(numbers) {
    return numbers.filter(isPrime);
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function hcf(numbers) {
    if (numbers.length === 1) return numbers[0];

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = gcd(result, numbers[i]);
        if (result === 1) break;
    }

    return result;
}

function lcmTwo(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

function lcm(numbers) {
    if (numbers.length === 1) return numbers[0];

    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcmTwo(result, numbers[i]);
    }

    return result;
}

async function AI(question) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        return 'Unknown';
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${question}\n\nAnswer in one word only.`,
        });

        const answer = response.text?.trim() || 'Unknown';
        return answer.split(/\s+/)[0];

    } catch (error) {
        console.error('AI Error:', error.message);
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
