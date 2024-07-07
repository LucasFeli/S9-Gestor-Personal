import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseContext";
import { Link, useNavigate } from "react-router-dom";

export const ExpenseDetail = () => {
  const { id } = useParams();
  const { getExpense } = useDatabase();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      const expenseData = await getExpense(id);
      setExpense(expenseData);
    };

    fetchExpense();
  }, [id, getExpense]);

  if (!expense) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-5 text-white">
      <h2 className="text-2xl font-bold mb-5">Detalle del Gasto</h2>
      <div className="mb-4 p-4 border rounded-md">
        <h3 className="text-xl font-bold">
          Ingreso Total Mensual :{" "}
          {
            expense.gastos.find((g) => g.descripcion === "Ingresos Totales")
              .cantidad
          }{" "}
          {expense.moneda}
        </h3>
        <p>
          <strong>Entretenimiento:</strong>{" "}
          {
            expense.gastos.find((g) => g.descripcion === "Entretenimiento")
              .cantidad
          }
        </p>
        <p>
          <strong>Gastos domiciliarios:</strong>{" "}
          {
            expense.gastos.find((g) => g.descripcion === "Gastos domiciliarios")
              .cantidad
          }
        </p>
        <p>
          <strong>Transporte:</strong>{" "}
          {expense.gastos.find((g) => g.descripcion === "Transporte").cantidad}
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
        <div className="mt-4">
          <Link
            className="ml-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            to="/expenses"
          >
            Regresar al Listado
          </Link>
        </div>
      </div>
    </div>
  );
};
