const token = localStorage.getItem('token');
if (!token) location.href = '../index.html';

const payload = JSON.parse(atob(token.split('.')[1]));
const role = payload.role;

const sidebar = document.getElementById('sidebar');
const topbar = document.getElementById('topbar');

// Sidebar menu based on role
const menus = [];

if (role === 'master_admin') menus.push({ name: 'Chapters', link: 'chapels.html' });
if (role === 'chapel_leader') menus.push({ name: 'Pastors', link: 'pastors.html' }, { name: 'Shepherds', link: 'shepherds.html' }, { name: 'Members', link: 'members.html' });
if (role === 'pastor') menus.push({ name: 'Shepherds', link: 'shepherds.html' }, { name: 'Members', link: 'members.html' });
if (role === 'shepherd') menus.push({ name: 'Members', link: 'members.html' });

sidebar.innerHTML = menus.map(m => `<a href="${m.link}">${m.name}</a>`).join('');
topbar.innerHTML = `<div class="topbar-left">ShepherdNet</div><div class="topbar-right">Role: ${role}</div>`;

// Logout button
const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Logout';
logoutBtn.onclick = () => { localStorage.removeItem('token'); location.href='../index.html'; };
topbar.appendChild(logoutBtn);
