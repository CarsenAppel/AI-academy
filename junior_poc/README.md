# 🤖 CodeBot - Junior Developer Chatbot Project

An exemplary implementation of a safe, educational AI chatbot designed for elementary school students (ages 6-14) to learn about coding, computers, and technology.

## Project Overview

This is **Level 1 (Complete)** of the Junior Developer Academy roadmap. The project demonstrates core web development concepts:
- **HTML**: Structure and semantic markup
- **CSS**: Styling, variables, and responsive design
- **JavaScript**: DOM manipulation and event handling
- **Backend**: Node.js server as a secure AI proxy
- **AI Integration**: OpenRouter API for natural language responses

## 🎯 Learning Objectives (Completed)

### Session 1: What is a Chatbot?
- ✅ Understand what AI is at a high level
- ✅ Understand the data flow: user input → internet → AI → response
- ✅ Connect chatbots to familiar concepts (Siri, Google)

### Session 2: Building the Face (HTML)
- ✅ Understand HTML tags and semantic structure
- ✅ Fill in chatbot name and welcome message
- ✅ Identify UI components (message box, input field, send button)

### Session 3: Making It Yours (CSS)
- ✅ Understand CSS controls visual appearance
- ✅ Change colors using CSS variables
- ✅ See immediate visual feedback

### Session 4: Talk to Your Chatbot
- ✅ Experience sending messages and receiving AI responses
- ✅ Understand message flow over the internet
- ✅ Reflect on AI capabilities and limitations
- ✅ Experience guardrails and content filtering

## 📁 Project Structure

```
junior_poc/
├── package.json              # Node.js dependencies
├── server.js                 # Express server (backend proxy)
├── .env                      # Environment variables (API key)
├── README.md                 # This file
└── public/
    ├── index.html            # Main HTML (EXEMPLARY VERSION)
    ├── base.css              # Base styles (EXEMPLARY VERSION)
    ├── custom.css            # Student-editable colors (EXEMPLARY VERSION)
    └── chat.js               # Chat functionality (EXEMPLARY VERSION)
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- OpenRouter API key (get free tier at https://openrouter.ai)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```bash
   echo "OPENROUTER_API_KEY=your_api_key_here" > .env
   ```

3. **Start the server**
   ```bash
   # For development with hot reloading:
   npm run dev
   
   # For production:
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛡️ Security Features

### Backend Protection
- **API Key Protection**: OpenRouter API key stored server-side only, never exposed to frontend
- **Content Filtering**: Keyword blocklist + OpenRouter moderation flags
- **Rate Limiting**: Max 10 requests per minute per IP
- **Immutable System Prompt**: Enforced server-side, students cannot modify

### Content Guardrails
Blocked topics: politics, violence, drugs, adult content, hate speech, etc.

When blocked content is detected:
```
"Hmm, I can only talk about coding and computers! Try asking me something about that."
```

## 📝 Student-Editable Sections

### HTML (`index.html`)
Students can customize:
- **Chatbot name** in `<title>` and `<h1>`
- **Welcome message** in `#welcome` paragraph
- **Input placeholder** text

### CSS (`custom.css`)
Students can change CSS variables:
- `--primary-color`: Send button & accents
- `--background-color`: Page background
- `--background-image`: Background picture (optional)
- `--chat-background`: Message area background
- `--user-message-bg`: Your message styling
- `--bot-message-bg`: Bot message styling

## 🎨 Exemplary Version Features

This version demonstrates best practices:

### Frontend Excellence
- **Modern UI Design**: Clean, accessible, engaging interface
- **Responsive Layout**: Works on desktop and mobile
- **Smooth Animations**: Fade-in messages, hover effects
- **Accessibility**: Proper semantic HTML, keyboard navigation
- **User Experience**: Loading states, auto-scroll, error handling

### Backend Excellence
- **Comprehensive Logging**: Timestamped debug information
- **Error Handling**: Graceful fallbacks and user-friendly messages
- **Code Documentation**: JSDoc comments explaining key functions
- **Model Fallback**: Try primary model, fall back to alternative if needed

### Developer Experience
- **Clear Comments**: Extensive inline documentation
- **Best Practices**: Follows Node.js/Express conventions
- **Maintainability**: Easy to understand and modify

## 🔧 Customization

### Change AI Model
Edit `.env`:
```bash
PRIMARY_MODEL=mistralai/mistral-7b-instruct-v0.1
FALLBACK_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

### Modify System Prompt
Edit `server.js` - update the `SYSTEM_PROMPT` constant (server-side only)

### Update Blocklist
Edit `server.js` - modify the `BLOCKLIST` array

## 📊 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | User interface |
| **Backend** | Node.js, Express.js | Secure API proxy |
| **AI** | OpenRouter, Mistral 7B | Language model |
| **Hosting** | Glitch (or any Node server) | Cloud deployment |

## 📖 How It Works

### Message Flow
```
User Types Message
     ↓
JavaScript sends to /chat endpoint
     ↓
Server checks for blocked content
     ↓
Server sends to OpenRouter API with system prompt
     ↓
AI generates response
     ↓
Server filters response for blocked content
     ↓
Server returns response to frontend
     ↓
Message appears in chat
```

### Key Design Principles

1. **Student Isolation**: Students never see backend code or API key
2. **Safe by Default**: Content filtering and guardrails are server-side
3. **Immutable Policies**: Teacher controls system prompt, students can't break it
4. **Progressive Disclosure**: Start with simple HTML editing, learn deeper concepts over time

## 🧪 Testing the Chatbot

Try these questions:

**Good (On-Topic)**
- "How do I make a website?"
- "What is HTML?"
- "How does the internet work?"
- "Can you explain JavaScript?"

**Blocked (Off-Topic)**
- Questions about politics, violence, adult content, etc.
- Will receive: "Hmm, I can only talk about coding and computers!"

## 📚 Stretch Goals

- Add emoji reactions to messages
- Implement message persistence (localStorage)
- Add typing indicator
- Create a dark mode toggle
- Add conversation history
- Build custom themes

## 📋 Curriculum Notes

### For Teachers
- The system prompt is immutable - students cannot "jailbreak" it
- Rate limiting prevents API abuse
- Content filtering protects students from inappropriate responses
- Server logs help identify misuse patterns

### For Students
- This is a real AI - it makes mistakes sometimes!
- Ask clear, specific questions for better answers
- The bot only knows about coding and computers
- Experiment with different questions to see how AI works

## 🔗 Resources

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Express.js Guide](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Glitch Community](https://glitch.com/)

## 📝 License

Educational use only. Part of the AI Academy Junior Developer Program.

---

**Version**: 1.0 (Level 1 Complete)  
**Last Updated**: March 17, 2026  
**Status**: Exemplary - Ready for classroom deployment ✨
