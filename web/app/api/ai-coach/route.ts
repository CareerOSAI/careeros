import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const rawHistory = (history ?? []).map(
      (m: { role: string; text: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }],
      })
    );

    // Gemini requires the first entry in history to have role "user".
    // Drop any leading "model" messages (like the initial greeting).
    const firstUserIndex = rawHistory.findIndex(
      (m: { role: string }) => m.role === "user"
    );
    const cleanHistory =
      firstUserIndex === -1 ? [] : rawHistory.slice(firstUserIndex);

const chat = model.startChat({
      history: cleanHistory,
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are a friendly, direct career coach specialized in tech careers (developers, QA, DevOps, mobile, UI/UX, product management). Give concise, practical, actionable advice. Keep responses focused, not overly long. Respond in the same language the user writes in.",
          },
        ],
      },
    });

let result;
    let lastError;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        result = await chat.sendMessage(message);
        break;
      } catch (err: any) {
        lastError = err;
        if (err?.status === 503 && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
          continue;
        }
        throw err;
      }
    }

    if (!result) throw lastError;

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI Coach error:", error);
    return NextResponse.json(
      { error: "Failed to get a response. Please try again." },
      { status: 500 }
    );
  }
}