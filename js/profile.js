const token = localStorage.getItem('token');
if (!token) location.href = '../index.html';

const id = localStorage.getItem('view_id');
if (!id) location.href = '../dashboard.html';

async function loadProfile() {
  const res = await fetch(`https://shepherdnet-api.<yourname>.workers.dev/users/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const user = await res.json();

  document.getElementById('profile-pic').src = user.profile_pic || '../assets/images/default.png';
  document.getElementById('name').textContent = user.name;
  document.getElementById('email').textContent = user.email;
  document.getElementById('hostel').textContent = user.hostel || '-';
  document.getElementById('level').textContent = user.level || '-';
  document.getElementById('course').textContent = user.course || '-';
}

loadProfile();
