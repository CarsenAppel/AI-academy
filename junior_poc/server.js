const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 10, message: 'Too many requests, please try again later.' }));
app.use(express.static('public')); // Serve static files from public/

const SYSTEM_PROMPT = "You are a friendly coding helper for elementary school students aged 6-14. Only answer questions about computers, coding, and technology. Keep all answers short, simple, and encouraging. Never discuss anything unrelated to computers or coding. If asked off-topic questions, gently redirect back to coding topics.";
const BLOCKLIST = ['politics', 'violence', 'drugs', 'sex', 'religion', 'money', 'war', 'hate']; // Expanded keyword blocklist
const REPLACEMENT_MESSAGE = "Hmm, I can only talk about coding and computers! Try asking me something about that.";

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'Message required' });

  const hasBlockedWordIn = BLOCKLIST.some(word => userMessage.toLowerCase().includes(word));
  if (hasBlockedWordIn) return res.json({ response: REPLACEMENT_MESSAGE });

  const models = [
    process.env.PRIMARY_MODEL || 'openrouter/hunter-alpha',
    process.env.FALLBACK_MODEL
  ].filter(Boolean);

  let lastError;
  for (const model of models) {
    try {
      console.log('API Key present:', !!process.env.OPENROUTER_API_KEY);
      console.log('User message:', userMessage);
      console.log('Trying model:', model);
      
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

      // Content filtering
      const hasBlockedWord = BLOCKLIST.some(word => aiResponse.toLowerCase().includes(word));
      const isModerated = response.data.choices[0].finish_reason === 'content_filter'; // OpenRouter moderation flag

      if (hasBlockedWord || isModerated) {
        aiResponse = REPLACEMENT_MESSAGE;
      }

      return res.json({ response: aiResponse });  // Success, exit loop
    } catch (error) {
      console.error(`Error with model ${model}:`, error.response?.status, error.response?.data || error.message);
      lastError = error;  // Store for final failure
      // Continue to next model
    }
  }

  // All models failed
  res.status(500).json({ error: 'AI service error', details: lastError.response?.data || lastError.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));