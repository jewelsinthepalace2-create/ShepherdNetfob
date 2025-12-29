document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  try {
    const res = await fetch('https://shepherdnet-api.jewelsinthepalace2.workers.dev/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const text = await res.text();
      errorMsg.textContent = text;
      return;
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);

    // decode role from JWT
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    const role = payload.role;

    // redirect based on role
    if (role === 'master_admin') window.location.href = 'lists/chapels.html';
    else window.location.href = 'dashboard.html';

  } catch(err) {
    errorMsg.textContent = "Login failed. Try again.";
    console.error(err);
  }
});
