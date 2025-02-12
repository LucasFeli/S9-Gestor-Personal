import { useState, useEffect } from "react";
import { obtenerConsejosFinancieros } from "../../services/GeminiService";
import { useAuth } from "../../context/AuthContext";
import { useDatabase } from "../../context/DatabaseContext";
import { GraficoGastos } from "../graficoGastos/GraficoGastos";
import { Logout } from "../Logout";
import { useNavigate, Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

export const FormularioGastos = () => {
  const [gastos, setGastos] = useState([
    { descripcion: "Ingresos Totales", cantidad: "" },
    { descripcion: "Entretenimiento", cantidad: "" },
    { descripcion: "Gastos domiciliarios", cantidad: "" },
    { descripcion: "Transporte", cantidad: "" },
    { descripcion: "Otros", cantidad: "" },
  ]);
  const [moneda, setMoneda] = useState("USD");
  const [diferencia, setDiferencia] = useState(0);
  const [consejos, setConsejos] = useState("");
  const [graficoImage, setGraficoImage] = useState("");
  const { saveExpenses } = useDatabase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const calcularDiferencia = () => {
      const ingresosTotales = parseFloat(gastos[0].cantidad) || 0;
      const gastosTotales = gastos
        .slice(1)
        .reduce((total, gasto) => total + (parseFloat(gasto.cantidad) || 0), 0);
      setDiferencia(ingresosTotales - gastosTotales);
    };
    calcularDiferencia();
  }, [gastos]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newGastos = [...gastos];
    newGastos[index].cantidad = value;
    setGastos(newGastos);
  };

  const handleMonedaChange = (e) => {
    setMoneda(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    gastos.forEach((gasto, index) => {
      if (!gasto.cantidad) {
        newErrors[index] = "Este campo es obligatorio";
        
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const datosGasto = {
      gastos,
      moneda,
      diferencia,
    };
    const consejos = await obtenerConsejosFinancieros(datosGasto);
    setConsejos(consejos);
  };

  const handleSave = async () => {
    const datosGasto = {
      gastos,
      moneda,
      diferencia,
      consejos,
      graficoImage,
      userId: currentUser.uid,
      createdAt: Timestamp.now(),
    };
    await saveExpenses(datosGasto);
    navigate("/expenses");
  };

  const handleGenerateImage = (base64Image) => {
    setGraficoImage(base64Image);
  };

  return (
    <div className="container mx-auto p-5">
      <Logout />
      <h2 className="text-2xl font-bold mb-5 text-white">Agregar Gastos</h2>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit}>
            {gastos.map((gasto, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-white">{gasto.descripcion}</label>
                <input
                  type="number"
                  name="cantidad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={gasto.cantidad}
                  onChange={(e) => handleChange(e, index)}
                  placeholder={`Cantidad para ${gasto.descripcion}`}
                />
                {errors[index] && <p className="text-red-500 text-sm">{errors[index]}</p>}
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-white">Moneda</label>
              <select
                name="moneda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={moneda}
                onChange={handleMonedaChange}
              >
                <option value="USD">Dólares</option>
                <option value="EUR">Euros</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white">Diferencia</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={diferencia}
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Obtener Consejo
              </button>
              <div className="text-sm text-center">
                <Link
                  to="/expenses"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Ver Lista de Consultas
                </Link>
              </div>
            </div>
          </form>
          {consejos && (
            <div className="mt-5">
              <h3 className="text-xl font-bold mb-3">
                Consejos para Administrar tu Dinero
              </h3>
              <p>{consejos}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Guardar Consejo
                </button>
                <button
                  onClick={() => setConsejos("")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  No Guardar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <GraficoGastos
            datos={gastos.filter(
              (gasto) => gasto.descripcion !== "Ingresos Totales"
            )}
            onGenerateImage={handleGenerateImage}
          />
        </div>
      </div>
    </div>
  );
};
