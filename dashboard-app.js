const ChartJS = window.Chart;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-center">Algo salió mal</div>;
    }
    return this.props.children;
  }
}

function DashboardApp() {
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
    }, []);

    React.useEffect(() => {
      const isDark = localStorage.getItem('theme') === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const handleUpdateUser = (updates) => {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));

      // Update in system_users as well to persist across sessions
      const users = JSON.parse(localStorage.getItem('system_users') || '[]');
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('system_users', JSON.stringify(users));
      }
    };

    const handleColorChange = (color) => {
      document.documentElement.style.setProperty('--primary-color', color);
      // Also update accent color to be a bit darker/different if needed, 
      // but for now just primary is fine or we can derive it.
      // Let's just set primary.
      localStorage.setItem('theme_color', color);
    };

    React.useEffect(() => {
      const savedColor = localStorage.getItem('theme_color');
      if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
      }
    }, []);

    if (!currentUser) return null;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" data-name="dashboard-app" data-file="dashboard-app.js">
        <Topbar user={currentUser} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPage="inicio"
        />

        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard title="Total Usuarios" value="1,245" icon="users" color="blue" trend="+12%" />
              <StatsCard title="Ventas Hoy" value="$8,432" icon="dollar-sign" color="green" trend="+8%" />
              <StatsCard title="Pedidos" value="342" icon="shopping-cart" color="purple" trend="+23%" />
              <StatsCard title="Ingresos" value="$52,420" icon="trending-up" color="orange" trend="+15%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Ventas Mensuales" type="line" />
              <ChartCard title="Categorías" type="bar" />
              <ChartCard title="Distribución" type="doughnut" />
              <ChartCard title="Rendimiento" type="radar" />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);