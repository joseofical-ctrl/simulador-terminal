// ============================================================
// OpenAI client configuration and helper utilities
// ============================================================

import OpenAI from "openai";
import { ExcuseCategory, Language } from "@/types";

// Initialize the OpenAI client using the server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Builds the prompt for generating an excuse based on category and language.
 */
function buildPrompt(category: ExcuseCategory, language: Language): string {
  const categoryDescriptions: Record<ExcuseCategory, Record<Language, string>> = {
    University: {
      en: "academic excuses for missing class, not doing homework, or failing an exam",
      es: "excusas académicas para faltar a clase, no hacer la tarea o reprobar un examen",
    },
    Work: {
      en: "professional excuses for being late, missing a meeting, or not finishing a task",
      es: "excusas profesionales para llegar tarde, faltar a una reunión o no terminar una tarea",
    },
    Friends: {
      en: "social excuses for canceling plans, forgetting a birthday, or ghosting",
      es: "excusas sociales para cancelar planes, olvidar un cumpleaños o desaparecer",
    },
    Family: {
      en: "family excuses for missing dinner, forgetting an anniversary, or not calling back",
      es: "excusas familiares para faltar a la cena, olvidar un aniversario o no devolver la llamada",
    },
    Relationship: {
      en: "romantic excuses for forgetting a date, being distant, or messing up",
      es: "excusas románticas para olvidar una cita, estar distante o meter la pata",
    },
    Absurd: {
      en: "completely ridiculous, surreal, and hilariously unbelievable excuses",
      es: "excusas completamente ridículas, surrealistas e increíblemente graciosas",
    },
  };

  const langLabel = language === "es" ? "Spanish" : "English";
  const description = categoryDescriptions[category][language];

  return `Generate a single short, funny, and creative excuse in ${langLabel} for the following situation: ${description}.

Rules:
- Keep it to 1-2 sentences maximum.
- Make it creative, slightly believable but humorous.
- Write entirely in ${langLabel}.
- Do NOT include any introduction or explanation, just the excuse itself.
- Do NOT use quotation marks around the excuse.
- Category: ${category}`;
}

/**
 * Generates a funny excuse using the OpenAI API.
 * @param category - The category of excuse to generate
 * @param language - The language for the excuse ("en" | "es")
 * @returns The generated excuse text
 */
export async function generateExcuse(
  category: ExcuseCategory,
  language: Language = "en"
): Promise<string> {
  const systemPrompt =
    language === "es"
      ? "Eres un generador creativo de excusas. Tus excusas son divertidas, ingeniosas y ligeramente absurdas pero creíbles. Responde siempre en español. Mantén las respuestas concisas."
      : "You are a creative excuse generator. Your excuses are funny, witty, and slightly absurd but believable. Keep responses concise.";

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: buildPrompt(category, language),
      },
    ],
    max_tokens: 150,
    temperature: 0.9,
  });

  const excuse = completion.choices[0]?.message?.content?.trim();

  if (!excuse) {
    throw new Error("No excuse was generated. Please try again.");
  }

  return excuse;
}

export default openai;
