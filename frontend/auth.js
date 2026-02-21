const API_URL = 'http://localhost:5000/api';

function isJSONResponse(res) {
  const type = res.headers.get('content-type') || '';
  return type.includes('application/json');
}

async function register() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;

  if (!name || !email || !password) {
    alert('Please fill all fields');
    return;
  }

  const btn = event?.target || null;
  if (btn && btn.disabled) return;

  try {
    if (btn) btn.disabled = true;
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    let data = {};
    if (isJSONResponse(response)) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (response.ok) {
      alert(data.message || 'Registration successful! Please login.');
      window.location.href = 'login.html';
    } else {
      alert(data.message || data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Failed to connect to the server');
  } finally {
    if (btn) btn.disabled = false;
  }
}

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data = {};
    if (isJSONResponse(response)) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (response.ok) {
      const user = data.user || {};
      localStorage.setItem('user', JSON.stringify({
        id: user._id || user.id,
        name: user.name,
        email: user.email || email
      }));
      if (data.token) localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      alert(data.message || data.error || 'Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Failed to connect to the server');
  }
}