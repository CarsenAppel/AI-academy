async function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorDiv = document.getElementById('error-message');
  
  errorDiv.textContent = '';
  
  try {
    const response = await fetch('/teacher-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store session token locally
      localStorage.setItem('teacher-token', data.token);
      localStorage.setItem('teacher-name', username);
      showDashboard(username);
    } else {
      errorDiv.textContent = data.error || 'Login failed';
    }
  } catch (error) {
    errorDiv.textContent = 'Connection error. Please try again.';
    console.error('Login error:', error);
  }
}

function showDashboard(username) {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('welcome-name').textContent = username;
}

function handleLogout() {
  localStorage.removeItem('teacher-token');
  localStorage.removeItem('teacher-name');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('error-message').textContent = '';
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
}

// Check if already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('teacher-token');
  const username = localStorage.getItem('teacher-name');
  
  if (token && username) {
    // Verify token is still valid
    fetch('/teacher-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        showDashboard(username);
      } else {
        handleLogout();
      }
    })
    .catch(() => handleLogout());
  }
});
