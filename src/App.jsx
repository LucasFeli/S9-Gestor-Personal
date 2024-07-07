import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Logout } from "./components/Logout";
import { FormularioGastos } from "./components/formularioGastos/FormularioGastos";
import {ExpenseList} from "./components/ExpenseList/ExpenseList";
import { ExpenseDetail } from "./components/ExpenseDetail/ExpenseDetail";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<PrivateRoute><ExpenseList/></PrivateRoute>}></Route>
        <Route path="/add-expense" element={<PrivateRoute><FormularioGastos/></PrivateRoute>}></Route>
        <Route path="/expense/:id" element={<PrivateRoute><ExpenseDetail/></PrivateRoute>}></Route>
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
