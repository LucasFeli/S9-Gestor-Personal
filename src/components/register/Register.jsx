import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setError("El formato del email no es válido.");
    }
    if (!validatePassword(password)) {
      return setError("La contraseña debe tener al menos 8 caracteres.");
    }
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }
    setError("");
    try {
      await register(email, password);
      console.log("User registered");
      navigate("/add-expense");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya está en uso.");
      } else if (error.code === "auth/configuration-not-found") {
        setError("Error en la configuración de Firebase.");
      } else {
        setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-b from-gray-900 to-purple-900 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <h2 className="text-2xl font-bold text-center">Registrarse</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
            <p>la contraseña debe tener minimo 8 caracteres</p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Register
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="text-sm text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Ya tienes una cuenta? Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
