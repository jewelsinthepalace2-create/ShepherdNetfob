const token = localStorage.getItem('token');
if (!token) location.href='../index.html';

// Elements
const usersTableBody = document.querySelector('#users-table tbody');
const addUserBtn = document.getElementById('add-user-btn');
const modal = document.getElementById('user-modal');
const form = document.getElementById('user-form');
const cancelBtn = document.getElementById('cancel-btn');
const modalTitle = document.getElementById('modal-title');

let editingUserId = null;

// Fetch all users
async function fetchUsers() {
  const res = await fetch('https://your-worker-name.workers.dev/users', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const users = await res.json();
  usersTableBody.innerHTML = users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td>${u.chapel_id || '-'}</td>
      <td>
        <button onclick="editUser('${u.id}')">Edit</button>
        <button onclick="deleteUser('${u.id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

// Show Add User Modal
addUserBtn.addEventListener('click', () => {
  editingUserId = null;
  modalTitle.textContent = 'Add User';
  form.reset();
  modal.classList.remove('hidden');
});

// Cancel Modal
cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Submit Form
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    role: form.role.value,
    chapel_id: form.chapel_id.value || null,
    pastor_id: form.pastor_id.value || null,
    shepherd_id: form.shepherd_id.value || null,
    hostel: form.hostel.value,
    level: form.level.value,
    course: form.course.value,
    profile_pic: form.profile_pic.value
  };

  const url = editingUserId 
    ? `https://your-worker-name.workers.dev/users/${editingUserId}`
    : 'https://your-worker-name.workers.dev/add-user';
    
  const method = editingUserId ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data)
  });

  modal.classList.add('hidden');
  fetchUsers();
});

// Edit User
window.editUser = async id => {
  editingUserId = id;
  modalTitle.textContent = 'Edit User';

  const res = await fetch(`https://your-worker-name.workers.dev/users/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const user = await res.json();

  form.name.value = user.name;
  form.email.value = user.email;
  form.role.value = user.role;
  form.chapel_id.value = user.chapel_id || '';
  form.pastor_id.value = user.pastor_id || '';
  form.shepherd_id.value = user.shepherd_id || '';
  form.hostel.value = user.hostel || '';
  form.level.value = user.level || '';
  form.course.value = user.course || '';
  form.profile_pic.value = user.profile_pic || '';

  modal.classList.remove('hidden');
};

// Delete User
window.deleteUser = async id => {
  if (!confirm('Are you sure you want to delete this user?')) return;

  await fetch(`https://your-worker-name.workers.dev/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  fetchUsers();
};

// Initial load
fetchUsers();
