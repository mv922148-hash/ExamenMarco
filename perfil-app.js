class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4">Error</div>;
    }
    return this.props.children;
  }
}

function ProfileApp() {
  try {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState(null);

    React.useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        window.location.href = 'index.html';
        return;
      }
      setCurrentUser(user);
      
      const isDark = localStorage.getItem('theme') === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }, []);

    if (!currentUser) return null;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Topbar user={currentUser} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} currentPage="perfil" />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Mi Perfil</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card dark:bg-gray-800 text-center animate-fade-in">
                <img 
                  src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=2563eb&color=fff&size=200`}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100 avatar"
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{currentUser.name}</h2>
                <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                  {currentUser.role}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentUser.email}</p>
              </div>

              <div className="lg:col-span-2">
                <div className="card dark:bg-gray-800 mb-6 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Información Personal</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="icon-user text-lg text-blue-600"></div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Nombre Completo</p>
                        <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <div className="icon-mail text-lg text-green-600"></div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Correo Electrónico</p>
                        <p className="font-medium text-gray-900 dark:text-white">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <div className="icon-shield text-lg text-purple-600"></div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Rol de Usuario</p>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">{currentUser.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <div className="icon-key text-lg text-orange-600"></div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID de Usuario</p>
                        <p className="font-medium text-gray-900 dark:text-white">#{currentUser.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card dark:bg-gray-800 animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estadísticas</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">24</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sesiones</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-300">156</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Acciones</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">98%</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Actividad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProfileApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ProfileApp />
  </ErrorBoundary>
);