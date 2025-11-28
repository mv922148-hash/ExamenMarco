# Sistema de Gestión de Usuarios

Sistema completo de gestión con autenticación, roles de usuario y dashboard interactivo.

## Características

- Login con efecto cristal (glassmorphism)
- Sistema de roles: Superusuario, Administrador, Usuario
- Dashboard con 8 tarjetas de estadísticas
- Gráficas interactivas (línea, barras, dona, radar)
- Topbar con notificaciones y perfil
- Sidebar con menú desplegable
- Base de datos local con 6 usuarios predefinidos

## Usuarios de Prueba

### Superusuarios
- super@admin.com / super123
- super2@admin.com / super123

### Administradores
- admin@admin.com / admin123
- admin2@admin.com / admin123

### Usuarios
- user@user.com / user123
- user2@user.com / user123

## Estructura

- `index.html` - Página de login
- `dashboard.html` - Dashboard principal con estadísticas
- `usuarios.html` - Gestión de usuarios con tabla
- `perfil.html` - Perfil detallado del usuario
- `components/` - Componentes React reutilizables
- `utils/auth.js` - Lógica de autenticación

## Tecnologías

- React 18
- TailwindCSS
- Chart.js
- Lucide Icons
- LocalStorage para persistencia