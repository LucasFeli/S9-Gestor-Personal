import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Dashboard } from "./components/Logout";
import { FormularioGastos } from "./components/formularioGastos/FormularioGastos";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-expense" element={<PrivateRoute><FormularioGastos/></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
