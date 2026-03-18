async function sendMessage() {
  const message = document.getElementById('message').value;
  if (!message) return;

  const chatDiv = document.getElementById('chat');
  const sendBtn = document.getElementById('sendBtn');
  const input = document.getElementById('message');

  // Add user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'message user-message';
  userMsgDiv.textContent = 'You: ' + message;
  chatDiv.appendChild(userMsgDiv);

  // Clear input and disable button
  input.value = '';
  sendBtn.disabled = true;

  // Add loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message bot-message loading';
  loadingDiv.id = 'loading-' + Date.now();
  loadingDiv.textContent = 'Bot: Thinking...';
  chatDiv.appendChild(loadingDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();

    // Remove loading indicator
    loadingDiv.remove();

    // Add bot response
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'message bot-message';
    botMsgDiv.textContent = 'Bot: ' + (data.response || data.error || 'Error: No response');
    chatDiv.appendChild(botMsgDiv);
  } catch (error) {
    loadingDiv.remove();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message bot-message';
    errorDiv.textContent = 'Bot: Connection error. Please try again.';
    chatDiv.appendChild(errorDiv);
  } finally {
    // Re-enable button
    sendBtn.disabled = false;
    input.focus();
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }
}
