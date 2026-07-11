import { NextRequest, NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const pdf = await getDocumentProxy(buffer);
    const { text } = await extractText(pdf, { mergePages: true });

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract readable text from this PDF." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `You are a professional CV/resume analyzer specialized in the tech industry (developers, QA, DevOps, mobile, UI/UX, product management).

Analyze the following CV text and respond ONLY with valid JSON (no markdown, no code fences, no extra text), matching EXACTLY this structure:

{
  "atsScore": number (0-100, how well this CV would perform in Applicant Tracking Systems),
  "summary": string (2-3 sentence overall assessment, written directly to the candidate using "you"),
  "strengths": string[] (3-5 concise bullet points),
  "weaknesses": string[] (3-5 concise bullet points),
  "missingSkills": string[] (skills commonly expected for similar roles but not present in the CV),
  "suggestions": string[] (3-5 concrete, actionable suggestions to improve the CV),
  "detectedSkills": string[] (technical skills/technologies found in the CV),
  "seniorityLevel": string (one of exactly: "Junior", "Mid", "Senior", "Unclear")
}

CV TEXT:
"""
${text.slice(0, 15000)}
"""`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleaned = responseText.replace(/```json|```/g, "").trim();

    const analysis = JSON.parse(cleaned);

    return NextResponse.json({
      analysis,
      extractedText: text,
      fileName: file.name,
    });
  } catch (error) {
    console.error("CV analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze CV. Please try again." },
      { status: 500 }
    );
  }
}