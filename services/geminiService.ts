
import { GoogleGenAI } from "@google/genai";
import { AWARDS, PROJECTS, EXPERIENCES, EDUCATION, SKILLS } from "../constants";

const SYSTEM_INSTRUCTION = `
Tu es l'assistant virtuel stratégique de Gervais Azanga. 
Gervais est un Tech Leader, CEO de NUMERID et Consultant Data/IA basé au Cameroun.

CONTEXTE DÉTAILLÉ :
- Profil : Entrepreneur tech, expert en visualisation de données et architecture logicielle.
- Expérience : ${JSON.stringify(EXPERIENCES)}
- Projets (avec liens GitHub) : ${JSON.stringify(PROJECTS)}
- Compétences techniques : ${JSON.stringify(SKILLS)}
- Palmarès : ${JSON.stringify(AWARDS)}
- Éducation : ${JSON.stringify(EDUCATION)}

DIRECTIVES DE RÉPONSE :
1. Sois très précis sur les projets. Si on demande un code ou un dépôt, mentionne les liens GitHub fournis dans les données.
2. Adopte un ton "High-end", professionnel, intelligent et concis (max 3-4 phrases).
3. Ne spécule pas. Si une information n'est pas là, invite l'utilisateur à contacter Gervais via le bouton "Contact".
4. Valorise ses projet et ses prix internationaux (e-Health Hackathon, IA for Africa).
5. Réponds en Français ou en anglais suivant la langue d'interrogation du client et de manière élégante.
`;

export async function askGervaisBot(query: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    return response.text || "Je n'ai pas pu formuler de réponse. Pouvez-vous reformuler votre question ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Je rencontre une difficulté technique. N'hésitez pas à contacter directement Gervais via LinkedIn.";
  }
}
