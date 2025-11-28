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

function UsersApp() {
  try {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
      const user = getCurrentUser();
      if (!user) {
        window.location.href = 'index.html';
        return;
      }
      setCurrentUser(user);
      loadUsers();
      
      const isDark = localStorage.getItem('theme') === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const loadUsers = () => {
      const allUsers = JSON.parse(localStorage.getItem('system_users') || '[]');
      setUsers(allUsers);
    };

    const getRoleBadge = (role) => {
      const badges = {
        superusuario: 'bg-purple-100 text-purple-800',
        administrador: 'bg-blue-100 text-blue-800',
        usuario: 'bg-green-100 text-green-800'
      };
      return badges[role] || 'bg-gray-100 text-gray-800';
    };

    if (!currentUser) return null;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Topbar user={currentUser} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} currentPage="usuarios" />
        
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Gestión de Usuarios</h1>
            
            <div className="card dark:bg-gray-800 animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`badge px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UsersApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <UsersApp />
  </ErrorBoundary>
);