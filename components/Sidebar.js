function Sidebar({ isOpen, onToggle, currentPage = 'inicio' }) {
  try {
    const menuItems = [
      { id: 'inicio', label: 'Inicio', icon: 'home', url: 'dashboard.html' },
      { id: 'usuarios', label: 'Usuarios', icon: 'users', url: 'usuarios.html' },
      { id: 'perfil', label: 'Perfil', icon: 'user-circle', url: 'perfil.html' },
      { id: 'configuracion', label: 'Configuración', icon: 'settings', url: 'configuracion.html' }
    ];

    const handleNavigation = (url) => {
      if (url && url !== '#') {
        window.location.href = url;
      }
    };

    return (
      <div className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden z-40`} data-name="sidebar" data-file="components/Sidebar.js">
        <div className="p-4 h-full overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.url)}
                className={`sidebar-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <div className={`icon-${item.icon} text-xl`}></div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}
