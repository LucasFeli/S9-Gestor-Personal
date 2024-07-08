import { Link, useNavigate } from "react-router-dom";
import preView from "../assets/review.png";
import { useAuth } from "../context/AuthContext";

export const HomePage = () => {
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
    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bienvenido
            <br />
            Este es Gestor de Finanzas Personales.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            ¿Cansado de no saber a dónde va tu dinero? Nuestro gestor de
            finanzas personales te brindara consejos para llevar el control de
            tus gastos, ahorrar dinero y planificar tu futuro financiero. ¡Es
            fácil de usar y completamente gratis!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <button
              onClick={handleButtonClick}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ir al formulario
            </button>
            <Link
              to="/how-it-works"
              className="text-sm font-semibold leading-6 text-white"
            >
              Saber Mas <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          <img
            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            src={preView}
            alt="App screenshot"
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
};
