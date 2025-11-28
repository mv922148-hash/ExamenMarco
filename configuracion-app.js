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

function ConfiguracionApp() {
    try {
        const [sidebarOpen, setSidebarOpen] = React.useState(true);
        const [currentUser, setCurrentUser] = React.useState(null);
        const [username, setUsername] = React.useState('');

        const colors = [
            { name: 'Azul', value: '#2563eb' },
            { name: 'Verde', value: '#16a34a' },
            { name: 'Morado', value: '#9333ea' },
            { name: 'Naranja', value: '#ea580c' },
            { name: 'Rojo', value: '#dc2626' },
        ];

        React.useEffect(() => {
            const user = getCurrentUser();
            if (!user) {
                window.location.href = 'index.html';
                return;
            }
            setCurrentUser(user);
            setUsername(user.name);
        }, []);

        React.useEffect(() => {
            const isDark = localStorage.getItem('theme') === 'dark';
            document.documentElement.classList.toggle('dark', isDark);

            const savedColor = localStorage.getItem('theme_color');
            if (savedColor) {
                document.documentElement.style.setProperty('--primary-color', savedColor);
            }
        }, []);

        const handleUpdateUser = () => {
            if (!username.trim()) return;

            const updates = { name: username };
            const updatedUser = { ...currentUser, ...updates };
            setCurrentUser(updatedUser);
            localStorage.setItem('current_user', JSON.stringify(updatedUser));

            const users = JSON.parse(localStorage.getItem('system_users') || '[]');
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updates };
                localStorage.setItem('system_users', JSON.stringify(users));
            }

            // Optional: Show success message
            alert('Nombre de usuario actualizado');
        };

        const handleColorChange = (color) => {
            document.documentElement.style.setProperty('--primary-color', color);
            localStorage.setItem('theme_color', color);
        };

        if (!currentUser) return null;

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" data-name="configuracion-app" data-file="configuracion-app.js">
                <Topbar user={currentUser} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} currentPage="configuracion" />

                <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">Configuración</h1>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-2xl">
                            <div className="space-y-8">

                                {/* User Settings */}
                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="icon-user text-blue-500"></div>
                                        Perfil de Usuario
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Nombre de Usuario
                                            </label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <button
                                                    onClick={handleUpdateUser}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                >
                                                    Guardar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                                {/* Appearance Settings */}
                                <section>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="icon-palette text-purple-500"></div>
                                        Apariencia
                                    </h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Color del Tema
                                        </label>
                                        <div className="flex flex-wrap gap-4">
                                            {colors.map(color => (
                                                <button
                                                    key={color.value}
                                                    onClick={() => handleColorChange(color.value)}
                                                    className="group relative w-12 h-12 rounded-full border-2 border-transparent hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                                                    style={{ backgroundColor: color.value }}
                                                    title={color.name}
                                                >
                                                    <span className="sr-only">{color.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ConfiguracionApp error:', error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <ConfiguracionApp />
    </ErrorBoundary>
);
