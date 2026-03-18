/**
 * Chat Interface Handler
 * Manages all user interactions with the chatbot UI
 */

let currentConversation = [];
let conversations = JSON.parse(localStorage.getItem('conversations') || '[]');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  setupSidebar();
  setupComposer();
  setupThemeToggle();
  loadConversations();
  createNewConversation();
});

// Setup sidebar functionality
function setupSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const appContainer = document.querySelector('.app-container');
  
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    // Update composer position based on sidebar state
    if (sidebar.classList.contains('collapsed')) {
      appContainer.classList.add('sidebar-collapsed');
    } else {
      appContainer.classList.remove('sidebar-collapsed');
    }
  });
}

// Setup composer functionality
function setupComposer() {
  const messageInput = document.getElementById('message');
  const sendBtn = document.getElementById('sendBtn');
  
  // Auto-resize textarea
  messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
  
  // Send on Enter (but allow Shift+Enter for new line)
  messageInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  sendBtn.addEventListener('click', sendMessage);
}

// Setup theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load conversations from storage
function loadConversations() {
  const conversationList = document.getElementById('conversationList');
  conversationList.innerHTML = '';
  
  conversations.forEach((conv, index) => {
    const item = document.createElement('div');
    item.className = 'conversation-item';
    item.textContent = conv.title || `Conversation ${index + 1}`;
    item.addEventListener('click', () => loadConversation(index));
    conversationList.appendChild(item);
  });
}

// Create new conversation
function createNewConversation() {
  currentConversation = [];
  const chatDiv = document.getElementById('chat');
  chatDiv.innerHTML = '';
  
  // Add welcome message
  addBotMessage("Welcome! I'm NINJA-BOT 4000, your AI assistant. I love answering questions about coding, computers, and technology. Ask me anything!");
  
  updateConversationTitle('New Conversation');
}

// Load specific conversation
function loadConversation(index) {
  currentConversation = conversations[index].messages || [];
  const chatDiv = document.getElementById('chat');
  chatDiv.innerHTML = '';
  
  currentConversation.forEach(msg => {
    if (msg.role === 'user') {
      addUserMessage(msg.content);
    } else {
      addBotMessage(msg.content);
    }
  });
  
  // Update active state
  document.querySelectorAll('.conversation-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// Update conversation title
function updateConversationTitle(title) {
  // Find current conversation index
  const currentIndex = conversations.findIndex(conv => conv.messages === currentConversation);
  if (currentIndex >= 0) {
    conversations[currentIndex].title = title;
    localStorage.setItem('conversations', JSON.stringify(conversations));
    loadConversations();
  }
}

// Add user message to chat
function addUserMessage(text) {
  const chatDiv = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user-message';
  
  const bubble = document.createElement('div');
  bubble.className = 'user-bubble';
  bubble.textContent = text;
  
  messageDiv.appendChild(bubble);
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  
  currentConversation.push({ role: 'user', content: text });
}

// Add bot message to chat with streaming
async function addBotMessage(text) {
  const chatDiv = document.getElementById('chat');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  messageDiv.appendChild(contentDiv);
  
  // Process text for code blocks and formatting
  const processedContent = processMessageContent(text);
  contentDiv.innerHTML = processedContent;
  
  // Add actions
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'actions';
  
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', () => copyToClipboard(text));
  
  const thumbsUp = document.createElement('button');
  thumbsUp.className = 'feedback-btn';
  thumbsUp.textContent = '👍';
  thumbsUp.addEventListener('click', () => provideFeedback('positive'));
  
  const thumbsDown = document.createElement('button');
  thumbsDown.className = 'feedback-btn';
  thumbsDown.textContent = '👎';
  thumbsDown.addEventListener('click', () => provideFeedback('negative'));
  
  actionsDiv.appendChild(copyBtn);
  actionsDiv.appendChild(thumbsUp);
  actionsDiv.appendChild(thumbsDown);
  messageDiv.appendChild(actionsDiv);
  
  // Add suggested replies
  const suggestedReplies = generateSuggestedReplies(text);
  if (suggestedReplies.length > 0) {
    const repliesDiv = document.createElement('div');
    repliesDiv.className = 'suggested-replies';
    
    suggestedReplies.forEach(reply => {
      const chip = document.createElement('button');
      chip.className = 'reply-chip';
      chip.textContent = reply;
      chip.addEventListener('click', () => {
        document.getElementById('message').value = reply;
        sendMessage();
      });
      repliesDiv.appendChild(chip);
    });
    
    messageDiv.appendChild(repliesDiv);
  }
  
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  
  currentConversation.push({ role: 'assistant', content: text });
}

// Process message content for code blocks
function processMessageContent(text) {
  // Simple code block detection (```language\ncode\n```)
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let processed = text;
  let match;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const language = match[1] || '';
    const code = match[2];
    
    const codeBlock = `
      <div class="code-block">
        <div class="code-header">
          <span>${language}</span>
          <button class="code-copy-btn" onclick="copyToClipboard(\`${code.replace(/`/g, '\\`')}\`)">📋</button>
        </div>
        <pre><code>${code}</code></pre>
      </div>
    `;
    
    processed = processed.replace(match[0], codeBlock);
  }
  
  // Convert line breaks to <br> for plain text
  processed = processed.replace(/\n/g, '<br>');
  
  return processed;
}

// Generate suggested replies based on bot message
function generateSuggestedReplies(text) {
  const suggestions = [];
  
  if (text.toLowerCase().includes('code') || text.toLowerCase().includes('programming')) {
    suggestions.push('Show me an example', 'How does this work?', 'Can you explain that?');
  } else if (text.toLowerCase().includes('error') || text.toLowerCase().includes('problem')) {
    suggestions.push('How can I fix this?', 'What does this mean?', 'Show me the solution');
  } else {
    suggestions.push('Tell me more', 'Can you elaborate?', 'Give me an example');
  }
  
  return suggestions.slice(0, 3);
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

// Provide feedback
function provideFeedback(type) {
  console.log('Feedback:', type);
  // Could send feedback to server
}

// Send message function
async function sendMessage() {
  const message = document.getElementById('message').value.trim();
  if (!message) return;

  const chatDiv = document.getElementById('chat');
  const sendBtn = document.getElementById('sendBtn');
  const input = document.getElementById('message');

  // Add user message
  addUserMessage(message);

  // Clear input and disable button
  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;

  // Create loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message bot-message';
  loadingDiv.id = 'loading-indicator';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  contentDiv.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
  
  loadingDiv.appendChild(contentDiv);
  chatDiv.appendChild(loadingDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;

  try {
    // Send message to server
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    const botResponse = data.response || data.error || 'Error: No response received';
    
    // Remove loading indicator
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
      loadingElement.remove();
    }
    
    // Add bot response
    await addBotMessage(botResponse);
    
    // Update conversation title if it's the first exchange
    if (currentConversation.length === 2) {
      const title = message.length > 30 ? message.substring(0, 30) + '...' : message;
      updateConversationTitle(title);
    }
    
  } catch (error) {
    // Remove loading indicator
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
      loadingElement.remove();
    }
    
    // Show error message
    await addBotMessage('Sorry, I lost connection. Please check your internet and try again.');
    console.error('Chat error:', error);
  } finally {
    // Re-enable button and focus input
    sendBtn.disabled = false;
    input.focus();
  }
}
