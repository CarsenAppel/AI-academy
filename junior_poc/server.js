/**
 * CodeBot Backend Server
 *
 * This server acts as a secure proxy between the student-facing frontend
 * and the OpenRouter AI API. It protects the API key and enforces content
 * filters to keep the chatbot safe and on-topic.
 *
 * HOT RELOAD ENABLED: Server will automatically restart on file changes!
 *
 * Environment Variables Required:
 * - OPENROUTER_API_KEY: Your OpenRouter API key (never exposed to frontend)
 * - PRIMARY_MODEL: Primary AI model to use (optional)
 * - FALLBACK_MODEL: Fallback AI model if primary fails (optional)
 */

const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Check for required environment variables
if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'YOUR_OPENROUTER_API_KEY_HERE') {
  console.error(`
╔════════════════════════════════════════╗
║  ❌ MISSING API KEY                     ║
║                                        ║
║  Please set your OpenRouter API key:   ║
║  1. Go to https://openrouter.ai/keys    ║
║  2. Create a free account               ║
║  3. Copy your API key                   ║
║  4. Update the .env file                ║
║                                        ║
║  OPENROUTER_API_KEY=your_key_here      ║
╚════════════════════════════════════════╝
  `);
  process.exit(1);
}

const app = express();
app.use(express.json());

// Rate limiting: max 10 requests per minute per IP
app.use(rateLimit({ 
  windowMs: 60 * 1000, 
  max: 10, 
  message: 'Too many requests, please try again later.' 
}));

// Serve static files from public/
app.use(express.static('public'));

// Immutable system prompt - enforced server-side
const SYSTEM_PROMPT = `You are a friendly coding helper for elementary school students aged 6-14. 
Only answer questions about computers, coding, and technology. 
Keep all answers short, simple, and encouraging. 
Never discuss anything unrelated to computers or coding. 
If asked off-topic questions, gently redirect back to coding topics.`;

// Content filter blocklist
const BLOCKLIST = [
  'politics', 'violence', 'drugs', 'sex', 'religion', 
  'money', 'war', 'hate', 'kill', 'death', 'bomb'
];

// Message shown when content filter triggers
const REPLACEMENT_MESSAGE = "Hmm, I can only talk about coding and computers! Try asking me something about that.";

/**
 * Main chat endpoint
 * POST /chat
 * 
 * Request body: { message: "user's question" }
 * Response: { response: "AI's answer" } or { error: "error message" }
 * 
 * Process:
 * 1. Validate message is not empty
 * 2. Check for blocked content in user message
 * 3. Send to AI API with system prompt
 * 4. Filter AI response for blocked content
 * 5. Return response to user
 */
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  // Validate message
  if (!userMessage || userMessage.trim() === '') {
    return res.status(400).json({ error: 'Message required' });
  }

  // Check user's message for blocked content
  const hasBlockedWordIn = BLOCKLIST.some(word => 
    userMessage.toLowerCase().includes(word)
  );
  
  if (hasBlockedWordIn) {
    console.log('Blocked user message:', userMessage.substring(0, 50));
    return res.json({ response: REPLACEMENT_MESSAGE });
  }

  // Try primary model, then fallback model
  const models = [
    process.env.PRIMARY_MODEL || 'openrouter/hunter-alpha',
    process.env.FALLBACK_MODEL
  ].filter(Boolean);

  let lastError;
  
  for (const model of models) {
    try {
      console.log(`[${new Date().toISOString()}] Sending to model: ${model}`);
      console.log(`User message: ${userMessage.substring(0, 60)}...`);
      
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });

      let aiResponse = response.data.choices[0].message.content;

      // Filter AI response for blocked content
      const hasBlockedWord = BLOCKLIST.some(word => 
        aiResponse.toLowerCase().includes(word)
      );
      const isModerated = response.data.choices[0].finish_reason === 'content_filter';

      if (hasBlockedWord || isModerated) {
        console.log('Response filtered for blocked content');
        aiResponse = REPLACEMENT_MESSAGE;
      }

      console.log(`AI response: ${aiResponse.substring(0, 60)}...`);
      return res.json({ response: aiResponse });  // Success!
      
    } catch (error) {
      console.error(`Error with model ${model}:`, error.response?.status, error.message);
      lastError = error;

      // Check for authentication errors
      if (error.response?.status === 401) {
        console.error('❌ API Key is invalid or expired. Please check your OPENROUTER_API_KEY in .env file');
        break; // Don't try fallback models if auth fails
      }

      // Continue to next model
    }
  }

  // All models failed
  console.error('All models failed', lastError?.message);
  res.status(500).json({ 
    error: 'AI service unavailable', 
    details: lastError?.response?.data?.error?.message || lastError?.message 
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════╗
║  CodeBot Server Running                ║
║  http://localhost:${port}                  ║
║  Status: Ready to chat! 🤖             ║
╚════════════════════════════════════════╝
  `);
});