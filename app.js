class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [alert, setAlert] = React.useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      
      if (!email || !password) {
        setAlert({ type: 'error', message: 'Por favor complete todos los campos' });
        return;
      }

      const result = await authenticateUser(email, password);
      
      if (result.success) {
        setAlert({ type: 'success', message: 'Inicio de sesión exitoso' });
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        setAlert({ type: 'error', message: result.message });
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-4" data-name="app" data-file="app.js">
        <div className="glass-card rounded-2xl p-8 w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-shield-check text-4xl text-white"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido</h1>
            <p className="text-blue-100">Sistema de Gestión de Usuarios</p>
          </div>

          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass"
                placeholder="usuario@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glass"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
            <p className="text-white text-xs font-semibold mb-2">Usuarios de prueba:</p>
            <p className="text-blue-100 text-xs">Super: super@admin.com / super123</p>
            <p className="text-blue-100 text-xs">Admin: admin@admin.com / admin123</p>
            <p className="text-blue-100 text-xs">Usuario: user@user.com / user123</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);