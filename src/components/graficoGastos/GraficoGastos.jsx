import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraficoGastos = ({ datos }) => {
  const labels = datos.map((gasto) => gasto.descripcion);
  const cantidades = datos.map((gasto) => gasto.cantidad);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Gastos",
        data: cantidades,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
