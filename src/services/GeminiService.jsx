import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 150,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

export const obtenerConsejosFinancieros = async (datosGasto) => {
  const prompt = generarPrompt(datosGasto);

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);

    return result.response.text();
  } catch (error) {
    console.error(
      "Error al obtener los consejos financieros:",
      error.response?.data || error.message
    );
    throw new Error("No se pudieron obtener los consejos financieros");
  }
};

const generarPrompt = (datosGasto) => {
  const { gastos, moneda, diferencia } = datosGasto;
  console.log(datosGasto);
  return `
    Basado en los siguientes datos de gastos, proporciona algunos consejos financieros:
    Ingresos Totales: ${
      gastos.find((g) => g.descripcion === "Ingresos Totales").cantidad
    } ${moneda}
    Entretenimiento: ${
      gastos.find((g) => g.descripcion === "Entretenimiento").cantidad
    } ${moneda}
    Gastos domiciliarios: ${
      gastos.find((g) => g.descripcion === "Gastos domiciliarios").cantidad
    } ${moneda}
    Transporte: ${
      gastos.find((g) => g.descripcion === "Transporte").cantidad
    } ${moneda}
    Otros: ${gastos.find((g) => g.descripcion === "Otros").cantidad} ${moneda}
    Diferencia: ${diferencia} ${moneda}
  `;
};
