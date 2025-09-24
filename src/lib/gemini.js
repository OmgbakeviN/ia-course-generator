import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) throw new Error("VITE_GEMINI_API_KEY manquante");

const ai = new GoogleGenAI({ apiKey });

export async function chatWithGemini({ model = "gemini-2.5-flash", systemInstruction, history = [], temperature = 0.7 }) {
  const res = await ai.models.generateContent({
    model,
    contents: history.map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    })),
    config: {
      systemInstruction,
      temperature
    }
  });
  return res.text;
}

export async function checklistForModule({ model = "gemini-2.5-flash", topic }) {
  const res = await ai.models.generateContent({
    model,
    contents: `Produis une checklist concise et ordonnée des étapes à réaliser pour: ${topic}. Chaque étape doit avoir title, done=false par défaut, et tip courte.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                done: { type: Type.BOOLEAN },
                tip: { type: Type.STRING }
              },
              required: ["title"]
            }
          }
        },
        required: ["steps"]
      }
    }
  });
  return JSON.parse(res.text);
}
