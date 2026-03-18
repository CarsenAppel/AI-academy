# Teacher Portal Setup Guide

## Overview
The teacher portal is a simple login system that allows teachers to access admin features. It's not highly secure (as requested), but credentials are not readable to students and not stored in the repository.

## Setup Instructions

### 1. Create Your Credentials File
1. Copy `.env.local.example` to `.env.local` (this file is already in `.gitignore`)
2. Edit `.env.local` and set your own credentials:
   ```
   TEACHER_USERNAME=your_username
   TEACHER_PASSWORD=your_secure_password
   ```

### 2. Access the Portal
- Start the server: `npm start`
- Navigate to: `http://localhost:3000/teacher.html`
- Login with the credentials you set in `.env.local`

## How It Works

### Authentication Flow
1. Teacher enters username/password on the login page
2. Server validates against `TEACHER_USERNAME` and `TEACHER_PASSWORD` from environment variables
3. If valid, server generates a random token and stores it in memory
4. Token is saved to browser's localStorage
5. Students cannot see this token (it's not in the chat interface)

### Security Notes
- **Credentials in .env.local**: Not committed to repo, not visible to students
- **Tokens in localStorage**: Not accessible from the student chat interface
- **In-memory sessions**: Tokens are cleared when server restarts
- **Simple verification**: Token verification endpoint ensures session is active

### Limitations (By Design)
- Tokens are stored in server memory (not persistent across restarts)
- No password hashing (you mentioned it doesn't need to be super secure)
- No token expiration currently implemented
- Simple string comparison for credentials

### Future Enhancements
When you want to make it more robust, you could:
- Add password hashing with `bcrypt`
- Persist sessions to database
- Add token expiration times
- Add session cleanup on logout
- Implement rate limiting specifically for login attempts
- Add role-based access control

## Files Added/Modified
- **public/teacher.html** - Login page and dashboard
- **public/teacher.js** - Frontend authentication logic
- **server.js** - Added authentication endpoints
- **.env.local.example** - Template for credentials
- **.gitignore** - Already includes `.env.local`
