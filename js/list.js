const token = localStorage.getItem('token');
if (!token) location.href = '../index.html';

const payload = JSON.parse(atob(token.split('.')[1]));
const role = payload.role;

const tableBody = document.querySelector('#members-table tbody');

async function fetchMembers() {
  const res = await fetch('https://shepherdnet-api.<yourname>.workers.dev/members', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const members = await res.json();

  tableBody.innerHTML = members.map(m => `
    <tr onclick="viewProfile('${m.id}')">
      <td>${m.name}</td>
      <td>${m.email}</td>
      <td>${m.hostel || '-'}</td>
      <td>${m.level || '-'}</td>
    </tr>
  `).join('');
}

function viewProfile(id) {
  localStorage.setItem('view_id', id);
  window.location.href='../profile/profile.html';
}

fetchMembers();
