import  { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Link } from 'react-router-dom';

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { getExpenses, deleteExpense } = useDatabase();

  useEffect(() => {
    const fetchExpenses = async () => {
      const expensesData = await getExpenses();
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, [getExpenses]);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Lista de Gastos</h2>
      {expenses.length === 0 ? (
        <p>No hay gastos registrados.</p>
      ) : (
        <ul>
          {expenses.map(expense => (
            <li key={expense.id} className="mb-4 p-4 border rounded-md">
              <h3 className="text-xl font-bold">{expense.gastos.find(g => g.descripcion === 'Ingresos Totales').cantidad} {expense.moneda}</h3>
              <p><strong>Entretenimiento:</strong> {expense.gastos.find(g => g.descripcion === 'Entretenimiento').cantidad}</p>
              <p><strong>Gastos domiciliarios:</strong> {expense.gastos.find(g => g.descripcion === 'Gastos domiciliarios').cantidad}</p>
              <p><strong>Transporte:</strong> {expense.gastos.find(g => g.descripcion === 'Transporte').cantidad}</p>
              <p><strong>Otros:</strong> {expense.gastos.find(g => g.descripcion === 'Otros').cantidad}</p>
              <p><strong>Diferencia:</strong> {expense.diferencia}</p>
              <p><strong>Consejo:</strong> {expense.consejos}</p>
              <Link to={`/expense/${expense.id}`} className="text-blue-500 hover:underline">Ver Detalles</Link>
              <button
                onClick={() => handleDelete(expense.id)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
              <Link to={`/edit-expense/${expense.id}`} className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Editar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

 
