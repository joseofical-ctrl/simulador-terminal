// ============================================================
// API Route: POST /api/generate-excuse
// Receives category + language and returns an AI-generated excuse
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { generateExcuse } from "@/lib/openai";
import { GenerateExcuseRequest, GenerateExcuseResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: GenerateExcuseRequest = await request.json();
    const { category, language = "en" } = body;

    // Validate category
    const validCategories = [
      "University",
      "Work",
      "Friends",
      "Family",
      "Relationship",
      "Absurd",
    ];

    if (!category || !validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid or missing category" },
        { status: 400 }
      );
    }

    // Validate language
    const validLanguages = ["en", "es"];
    if (!validLanguages.includes(language)) {
      return NextResponse.json(
        { error: "Invalid language. Use 'en' or 'es'" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    // Generate the excuse using OpenAI with the requested language
    const excuse = await generateExcuse(category, language);

    const response: GenerateExcuseResponse = {
      excuse,
      category,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error generating excuse:", error);

    const message =
      error instanceof Error ? error.message : "Failed to generate excuse";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
