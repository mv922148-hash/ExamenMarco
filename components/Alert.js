function Alert({ type, message, onClose }) {
  try {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500'
    };

    return (
      <div className={`${colors[type]} text-white p-4 rounded-lg mb-4 flex items-center justify-between`} data-name="alert" data-file="components/Alert.js">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <div className="icon-x text-lg"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Alert component error:', error);
    return null;
  }
}