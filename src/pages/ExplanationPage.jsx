import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ExplanationPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleButtonClick = () => {
    if (currentUser) {
      navigate("/add-expense");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-5 text-white">
      <h1 className="text-3xl font-bold mb-5">Cómo Funciona Nuestra Página</h1>

      <section className="mb-5">
        <h2 className="text-2xl font-semibold mb-3">¿Qué es esta página?</h2>
        <p>
          Esta aplicación está diseñada para ayudarte a administrar tus gastos
          de manera eficiente. Puedes ingresar tus datos financieros y recibir
          consejos personalizados sobre cómo manejar mejor tus finanzas,
          proporcionados por una inteligencia artificial.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-2xl font-semibold mb-3">¿Cómo funciona?</h2>
        <ol className="list-decimal list-inside">
          <li className="mb-2">
            <strong>Ingresar Datos:</strong> Navega a la página de agregar
            gastos y proporciona información detallada sobre tus ingresos y
            gastos en diferentes categorías.
          </li>
          <li className="mb-2">
            <strong>Enviar Datos:</strong> Una vez que hayas ingresado toda la
            información, envía los datos a través del formulario.
          </li>
          <li className="mb-2">
            <strong>Recibir Consejos:</strong> La inteligencia artificial
            analizará tus datos y te proporcionará consejos personalizados sobre
            cómo optimizar tus gastos y ahorrar dinero.
          </li>
          <li className="mb-2">
            <strong>Guardar Consejos:</strong> Si los consejos son útiles,
            puedes guardarlos para referencia futura.
          </li>
        </ol>
      </section>

      <section className="mb-5">
        <h2 className="text-2xl font-semibold mb-3">
          ¿Cómo la IA proporciona consejos?
        </h2>
        <p>
          Utilizamos una avanzada inteligencia artificial para analizar los
          datos financieros que ingresas. La IA evalúa tus ingresos y gastos en
          diversas categorías y proporciona sugerencias específicas para
          ayudarte a reducir gastos innecesarios y optimizar tus finanzas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">
          Beneficios de Usar Esta Aplicación
        </h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Obtén una visión clara de tus finanzas.</li>
          <li className="mb-2">
            Recibe consejos personalizados y accionables.
          </li>
          <li className="mb-2">Ahorra dinero al optimizar tus gastos.</li>
          <li className="mb-2">
            Mantén un registro de tus finanzas y observa tu progreso.
          </li>
        </ul>
      </section>
      <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
        <Link
          to="/"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Home
        </Link>
        <button
          onClick={handleButtonClick}
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ir al formulario
        </button>
      </div>
    </div>
  );
};
