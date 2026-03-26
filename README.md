# AI Academy - Elementary School AI Chatbot

A guided discovery learning platform that introduces elementary school students to AI through interactive chatbot experiences. This project provides a complete, safe, and teacher-controlled environment for students to interact with an AI assistant while learning about coding and technology.

## 📚 Project Overview

**AI Academy** is an educational initiative designed to make AI accessible and understandable to young learners. Students get hands-on experience talking to a real AI without getting lost in complex syntax, while teachers maintain full control over the experience and safety guardrails.

### Key Information

| Aspect | Details |
|--------|---------|
| **Organization** | Two-track system: Junior (grades 3-5) and Senior (grades 6-12) |
| **Teaching Philosophy** | Guided discovery — students fill in a pre-built template to feel the magic of AI |
| **Estimated Duration** | 4 sessions × 45 minutes each |
| **Technology Stack** | HTML/CSS (frontend) + Node.js/Express (backend) + OpenRouter AI API |
| **Hosting** | Glitch (free tier for both frontend and backend) |
| **Cost** | Free (using OpenRouter's free tier models) |

---

## 🌳 Branch Architecture & Development Progression

This project uses a branching strategy to track development milestones. Here's the progression:

### `main` Branch
**Status:** Core Features Complete  
**Latest Commit:** `Added teacher login with basic (unsecure) password handling`

The `main` branch contains the foundational features of the AI chatbot platform:

- ✅ **Student Chat Interface**: HTML/CSS frontend with interactive messaging
- ✅ **Backend Proxy**: Node.js/Express server that safely manages API interactions
- ✅ **Teacher Authentication**: Basic login system (teacher-user only, not student-accessible)
- ✅ **Content Filtering**: Keyword blocklist + moderation flags
- ✅ **Rate Limiting**: Prevents abuse through request throttling
- ✅ **Admin Panel Skeleton**: Basic teacher portal for future admin features
- ✅ **Environment Configuration**: Secure storage of API keys and credentials

**Status Checks:**
- Server runs and serves chat interface ✅
- API proxying works ✅
- Teacher login functions ✅
- Content filtering active ✅

### `level-1-complete` Branch (Current)
**Status:** Enhanced Design & Polish  
**Latest Commit:** `Added Better design - skeleton`

Builds on `main` with significant UI/UX improvements and design completion:

- 🎨 **Improved CSS Styling**: Modern, responsive design with better visual hierarchy
- 🎨 **Skeleton CSS Framework**: Provides lean, clean styling foundation
- 🎨 **Enhanced Teacher Portal**: Better-designed dashboard and login interface
- 🎨 **Refined Chat Interface**: Improved message display and user feedback
- 🎨 **CSS Variables**: Customizable theme support for student personalization
- 🎨 **Responsive Layout**: Works well on tablets and different screen sizes
- 📝 **Complete Documentation**: Comprehensive setup guides and READMEs

**Key Improvements Over `main`:**
- Better visual design consistency
- Improved teacher portal UX
- More customizable styling options
- Enhanced load states and feedback
- Cleaner, more maintainable CSS

**Status:** Ready for classroom testing and deployment

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│      Student Browser Frontend       │
│  (HTML + CSS, Deployed on Glitch)   │
│                                     │
│  - Chat interface                   │
│  - Customizable welcome message     │
│  - Editable color scheme            │
│  - No sensitive data exposed        │
└────────────────┬────────────────────┘
                 │ HTTPS
                 │
┌────────────────▼────────────────────┐
│  Teacher-Controlled Backend Proxy   │
│  (Node.js/Express, Glitch)          │
│                                     │
│  - Validates requests               │
│  - Keeps API key hidden             │
│  - Enforces system prompt           │
│  - Filters content (in/out)         │
│  - Rate limits per session          │
│  - Handles authentication           │
└────────────────┬────────────────────┘
                 │ HTTPS (API Key)
                 │
┌────────────────▼────────────────────┐
│    OpenRouter AI Service            │
│  (Hosted AI Models, Free Tier)      │
│                                     │
│  Primary: mistralai/mistral-7b (v0.1)  │
│  Fallback: meta-llama/llama-3.1-8b     │
└─────────────────────────────────────┘
```

### Security Model

```
┌──────────────────────────────────────────────┐
│ Teacher Portal (Private)                     │
│ - Password-protected login                   │
│ - Session tokens in browser localStorage     │
│ - Access to admin functions                  │
│ - Not visible to students                    │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Student Chat (Public)                        │
│ - No authentication required                 │
│ - Can customize message/color/name           │
│ - All requests go through content filter     │
│ - Responses checked for safety               │
│ - Rate-limited to prevent abuse              │
└──────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 14+ and npm
- **OpenRouter API Key** (free account at [openrouter.ai](https://openrouter.ai))
- **Glitch Account** (for deployment) or local development

### Quick Start (Local Development)

1. **Clone and Setup**
   ```bash
   cd junior_poc
   npm install
   ```

2. **Create Credentials File**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your own username and password
   ```

3. **Set Environment Variables**
   ```bash
   # In .env or .env.local
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   TEACHER_USERNAME=your_teacher_username
   TEACHER_PASSWORD=your_secure_password
   PRIMARY_MODEL=openrouter/hunter-alpha  (or your preferred model)
   FALLBACK_MODEL=meta-llama/llama-3.1-8b-instruct:free
   ```

4. **Start the Server**
   ```bash
   npm start
   # Server runs on http://localhost:3000
   ```

5. **Access the Applications**
   - **Student Chat**: `http://localhost:3000/index.html`
   - **Teacher Portal**: `http://localhost:3000/teacher.html`

### Deployment to Glitch

1. Create or connect a Glitch project
2. Push this repository to your Glitch project
3. In your Glitch `/.env` file, add:
   ```
   OPENROUTER_API_KEY=your_key
   TEACHER_USERNAME=your_username
   TEACHER_PASSWORD=your_password
   ```
4. Your Glitch project URL becomes your shared classroom link

---

## 📋 Features Overview

### For Students

- **Interactive Chat Interface**: Talk to an AI coding helper
- **Content Safety**: Curated responses that stay on-topic
- **Customization Options**: 
  - Change chatbot name
  - Modify welcome message
  - Select color scheme
  - Add background decorations
- **No Barriers to Entry**: No coding knowledge required, just conversation
- **Clear Instructions**: Marked sections show what students can/cannot edit

### For Teachers

- **Secure Login Portal**: Access admin features safely
- **Immutable System Prompt**: Guardrails enforced at backend, not editable by students
- **Content Filtering**: Keyword blocklist + moderation API
- **Rate Limiting**: Prevents resource abuse
- **Session Management**: Control active sessions and revoke access
- **Curriculum Integration**: Designed for 4-session 45-minute classes
- **No Infrastructure Expertise Required**: Deploy and run on Glitch

---

## 📁 Project Structure

```
AI-academy/
├── README.md                          # This file
├── junior_roadmap.json               # Learning objectives and tech specs for junior track
├── senior_roadmap.json               # Learning objectives for senior track
├── Config/                           # Reserved for future configuration files
│
└── junior_poc/                       # Main application (Proof of Concept)
    ├── package.json                  # Node.js dependencies
    ├── server.js                     # Express backend with proxying logic
    ├── .env.local.example            # Template for environment variables
    ├── TEACHER_PORTAL_README.md      # Teacher authentication setup guide
    │
    └── public/                       # Student-facing frontend
        ├── index.html                # Main chat interface (students edit title/message)
        ├── teacher.html              # Teacher login and portal
        ├── chat.js                   # Chat functionality (no-edit zone)
        ├── teacher.js                # Authentication logic (no-edit zone)
        ├── base.css                  # Core styling (no-edit zone)
        └── custom.css                # Customizable color/theme (students edit here)
```

### File Edition Levels

- **🔒 No-Edit Zone**: `chat.js`, `teacher.js`, `base.css`, `server.js`
  - These handle security-critical or complex logic
  - Teachers can review; students cannot see or modify

- **✏️ Student Customization Zone**: `index.html`, `custom.css`
  - Students personalize their chatbot experience
  - Pre-built placeholders guide what to change
  - Clear comments mark editable sections

- **👨‍🏫 Teacher Setup Only**: `.env.local`, `.env`
  - Contains credentials and API keys
  - Not committed to repository
  - Set up before sharing student URL

---

## 🔐 Security & Safety

### Content Filtering Strategy

**Input Filtering** (Student Messages)
- Keyword blocklist: politics, violence, drugs, sex, religion, money, war, hate
- Replacement message: "Hmm, I can only talk about coding and computers! Try asking me something about that."

**Output Filtering** (AI Responses)
- Checked against OpenRouter moderation flags
- Verified for off-topic content
- Safe fallback response if needed

### Immutable System Prompt

The system prompt is **stored and enforced on the backend only**. Students cannot see or modify it.

**Current System Prompt:**
```
You are a friendly coding helper for elementary school students aged 6-14. 
Only answer questions about computers, coding, and technology. 
Keep all answers short, simple, and encouraging. 
Never discuss anything unrelated to computers or coding. 
If asked off-topic questions, gently redirect back to coding topics.
```

### Rate Limiting

- **Default**: 10 requests per 60 seconds per IP
- **Window**: Resets every minute
- **Message**: "Too many requests, please try again later."

### Teacher Authentication

- ✅ Passwords stored in `.env.local` (not in repo)
- ✅ Session tokens stored in browser localStorage
- ✅ Tokens cleared on server restart (no persistent sessions)
- ✅ Token verification on each admin operation
- ⚠️ **Note**: Not intended for high-security scenarios; designed for classroom use

---

## 🛠️ Development Workflow

### Making Changes

#### On the `main` Branch
Good for:
- Adding core features (new API models, auth features)
- Critical bug fixes
- Backend logic improvements

#### On the `level-1-complete` Branch
Good for:
- CSS/design refinements
- UI/UX improvements
- Teacher portal enhancements
- Documentation updates

### Before Deploying to Classroom

1. Test on a local development version
2. Verify `.env.local` is properly configured
3. Clear browser cache to avoid stale assets
4. Test teacher login separately
5. Have students test customization features
6. Verify content filtering works as expected

---

## 🎯 Curriculum Integration

### Learning Path (4 Sessions × 45 Minutes)

**Session 1: Intro to AI**
- What is AI? What is a chatbot?
- Explore the interface, ask questions
- Observe the system prompt guardrails in action

**Session 2: Customization**
- Change the chatbot name
- Modify welcome message and placeholder text
- Edit color scheme in CSS
- Understand HTML/CSS as a "template to fill"

**Session 3: Guardrails & Safety**
- Try to break the system prompt (it won't break!)
- Test sending off-topic messages
- Discuss why safety guardrails matter
- See how the teacher portal controls the experience

**Session 4: Reflection & Extension**
- What makes a good coding question for the AI?
- How might you build your own AI system?
- Deploy your customized chatbot to share
- Reflect on AI's role in society

---

## 🚀 Future Enhancements

### Short Term (Level 2-3)
- [ ] Add student survey/feedback after each session
- [ ] Track conversation topics and create mini-reports
- [ ] Add more color themes (auto theme selection)
- [ ] Implement persistent session storage (database)
- [ ] Add password hashing with bcrypt
- [ ] Token expiration and refresh mechanism

### Medium Term (Level 4-5)
- [ ] Senior track curriculum and full implementation
- [ ] Student progress tracking dashboard
- [ ] Multi-chatbot support (different personalities)
- [ ] Conversation export for teacher review
- [ ] Integration with classroom management systems

### Long Term
- [ ] Multilingual support
- [ ] Advanced analytics and reporting
- [ ] Parent portal and progress sharing
- [ ] Extension to other age groups
- [ ] Open-source community contributions

---

## 📚 Branch Reference

### Quick Branch Comparison

| Feature | `main` | `level-1-complete` |
|---------|--------|-------------------|
| Chat functionality | ✅ | ✅ |
| Teacher login | ✅ | ✅ |
| Content filtering | ✅ | ✅ |
| Rate limiting | ✅ | ✅ |
| Modern CSS design | 🟡 Basic | ✅ Enhanced |
| Responsive layout | 🟡 Partial | ✅ Full |
| Admin dashboard | 🟡 Skeleton | ✅ Polished |
| Customization themes | 🟡 Basic | ✅ Multiple |
| Documentation | 🟡 Partial | ✅ Complete |
| Classroom-ready | 🟡 | ✅ Yes |

### Switching Branches

```bash
# Check current branch
git branch

# Switch to main (core features)
git checkout main

# Switch to level-1-complete (enhanced design)
git checkout level-1-complete

# View difference between branches
git diff main level-1-complete
```

---

## 📖 File-Specific Guides

- [Teacher Portal Setup](./junior_poc/TEACHER_PORTAL_README.md) - Authentication, session management, and admin features
- [Junior Roadmap](./junior_roadmap.json) - Complete specification for the junior track
- [Senior Roadmap](./senior_roadmap.json) - Planned senior track (advanced students)

---

## 🤝 Contributing

This is an educational project. When contributing:

1. **Maintain Safety First**: Never expose API keys or weaken guardrails
2. **Keep It Simple**: Remember this is for elementary/middle school students
3. **Test Thoroughly**: Especially content filtering and teacher portal
4. **Document Well**: Help future educators understand the system
5. **Consider Accessibility**: Ensure students of different abilities can participate

---

## 📝 License

This project is part of the AI Academy initiative. Check individual files for license information.

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Make sure Node.js is installed
node --version

# Install dependencies
npm install

# Check for port conflicts (port 3000 in use?)
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### API calls failing
- Verify `OPENROUTER_API_KEY` is set in `.env` or `.env.local`
- Check that the key is valid on [openrouter.ai](https://openrouter.ai)
- Ensure you haven't exceeded rate limits

### Teacher login not working
- Verify `TEACHER_USERNAME` and `TEACHER_PASSWORD` are set in `.env.local`
- Check that `.env.local` exists (not committed to git)
- Try restarting the server

### Chat responds with error
- Check the server logs for error messages
- Verify network connectivity
- Try a simpler question (might be hitting content filter)

---

## 📞 Questions or Feedback?

This is an active learning project. Feedback and improvements are welcome!

---

**Last Updated**: March 2026  
**Current Branch**: level-1-complete (Enhanced Design)  
**Status**: Classroom-Ready for Junior Track
