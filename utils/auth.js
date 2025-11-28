const USERS_KEY = 'system_users';
const CURRENT_USER_KEY = 'current_user';

const defaultUsers = [
  { id: 1, email: 'super@admin.com', password: 'super123', name: 'Super Usuario', role: 'superusuario' },
  { id: 2, email: 'super2@admin.com', password: 'super123', name: 'Super Usuario 2', role: 'superusuario' },
  { id: 3, email: 'admin@admin.com', password: 'admin123', name: 'Administrador', role: 'administrador' },
  { id: 4, email: 'admin2@admin.com', password: 'admin123', name: 'Administrador 2', role: 'administrador' },
  { id: 5, email: 'user@user.com', password: 'user123', name: 'Usuario', role: 'usuario' },
  { id: 6, email: 'user2@user.com', password: 'user123', name: 'Usuario 2', role: 'usuario' }
];

function initializeUsers() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

async function authenticateUser(email, password) {
  initializeUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, message: 'Credenciales incorrectas' };
}

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}