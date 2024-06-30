import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
