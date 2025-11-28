function Topbar({ user, onToggleSidebar }) {
  try {
    const [showProfile, setShowProfile] = React.useState(false);

    const handleLogout = () => {
      logout();
      window.location.href = 'index.html';
    };

    const [isDark, setIsDark] = React.useState(() => {
      return localStorage.getItem('theme') === 'dark';
    });

    const toggleTheme = () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
    };

    React.useEffect(() => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }, []);

    return (
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 transition-colors" data-name="topbar" data-file="components/Topbar.js">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggleSidebar}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <div className="icon-menu text-xl"></div>
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <div className="icon-home text-xl"></div>
            </button>
            <button 
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <div className={`icon-${isDark ? 'sun' : 'moon'} text-xl`}></div>
            </button>
          </div>

          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)} className="flex items-center space-x-3">
              <img src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`} alt="Profile" className="w-10 h-10 rounded-full avatar" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-100 dark:border-gray-700 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                    {user.role}
                  </span>
                </div>
                <button 
                  onClick={() => window.location.href = 'perfil.html'}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <div className="icon-user text-base"></div>
                  <span>Ver Perfil</span>
                </button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                  <div className="icon-log-out text-base"></div>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Topbar component error:', error);
    return null;
  }
}