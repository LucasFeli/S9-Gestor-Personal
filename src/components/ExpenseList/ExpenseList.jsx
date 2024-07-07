import { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../modal/ConfirmModal";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { getExpenses, deleteExpense } = useDatabase();
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expensesData = await getExpenses();
      setExpenses(expensesData);
    };

    fetchExpenses();
  }, [getExpenses]);

  const handleDelete = async (id) => {
    if (expenseToDelete) {
      await deleteExpense(expenseToDelete);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      setModalOpen(false);
    }
  };

  const openModal = (id) => {
    setExpenseToDelete(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setExpenseToDelete(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5 text-white">Lista de Gastos</h2>
      {expenses.length === 0 ? (
        <p>No hay gastos registrados.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="mb-4 p-4 border rounded-md text-white"
            >
              <h3 className="text-xl font-bold">
                Ingreso Total Mensual :{" "}
                {
                  expense.gastos.find(
                    (g) => g.descripcion === "Ingresos Totales"
                  ).cantidad
                }{" "}
                {expense.moneda}
              </h3>
              <p>
                <strong>Entretenimiento:</strong>{" "}
                {
                  expense.gastos.find(
                    (g) => g.descripcion === "Entretenimiento"
                  ).cantidad
                }
              </p>
              <p>
                <strong>Gastos domiciliarios:</strong>{" "}
                {
                  expense.gastos.find(
                    (g) => g.descripcion === "Gastos domiciliarios"
                  ).cantidad
                }
              </p>
              <p>
                <strong>Transporte:</strong>{" "}
                {
                  expense.gastos.find((g) => g.descripcion === "Transporte")
                    .cantidad
                }
              </p>
              <p>
                <strong>Otros:</strong>{" "}
                {expense.gastos.find((g) => g.descripcion === "Otros").cantidad}
              </p>
              <p>
                <strong>Diferencia:</strong> {expense.diferencia}
              </p>
              <p>
                <strong>Consejo:</strong> {expense.consejos}
              </p>
              <p>
                <strong>Fecha de Consulta:</strong>{" "}
                {expense.createdAt.toDate().toLocaleDateString()}
              </p>
              <div className="mt-4">
                <Link
                  to={`/expense/${expense.id}`}
                  className=" bg-white text-blue-500  px-4 py-2 rounded hover:bg-yellow-500"
                >
                  Ver Detalles
                </Link>
                <button
                 onClick={() => openModal(expense.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
                <Link
                  to={`/add-expense`}
                  className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Hacer Nueva Consulta
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};
