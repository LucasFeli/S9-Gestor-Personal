import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };
  
    return (
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <p>Bienvenido, {currentUser && currentUser.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    );
}

 