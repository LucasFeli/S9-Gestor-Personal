# Gestor de Finanzas Personales

## Description

- ____ es una aplicación que ayuda a los usuarios a gestionar sus finanzas personales, hacer un seguimiento de sus gastos e ingresos, y obtener recomendaciones personalizadas para ahorrar dinero. La aplicación también proporciona gráficos y análisis para ayudar a los usuarios a entender mejor sus hábitos financieros.



## Características

- Registro de usuario
- Inicio de sesión de usuario
- Protección de rutas con autenticación
- Consejos financieros basicos

## Tecnologías Utilizadas

- React
- Firebase (Autenticación y Firestore)
- React Router
- React context

##  Configuracion de Firebase

1. Ve a Firebase Console y crea un nuevo proyecto.
2. Agrega una nueva aplicación web al proyecto y copia la configuración de Firebase.
3. Crea un archivo firebaseConfig.js en el directorio src/firebase y pega tu configuración de Firebase:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

<br>
