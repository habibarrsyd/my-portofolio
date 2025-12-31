import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { cv1, cv2 } = await req.json();

        if (!cv1 || !cv2) {
            return NextResponse.json({ error: "Kedua data CV diperlukan untuk memulai battle!" }, { status: 400 });
        }

        const model = new ChatGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-2.5-flash", // Using 1.5 Flash for speed and cost
            temperature: 0.8, // Slightly higher for more creative "roasts"
        });

        const prompt = ChatPromptTemplate.fromTemplate(`
      Anda adalah juri di "CV BATTLE ARENA". 
      Tugas Anda adalah membandingkan dua CV dan menentukan siapa pemenangnya dengan gaya yang lucu, sedikit sarkastik (roasting), namun tetap memberikan insight profesional yang tajam.

      PANDUAN OUTPUT (WAJIB):
      - Gunakan format **Markdown**.
      - Berikan skor (0-100) untuk masing-masing.
      - Tentukan "THE WINNER".
      - Berikan alasan kemenangan.
      - Berikan "Roast" singkat untuk masing-masing CV (apa yang kurang atau apa yang terlalu 'lebay').
      - Gunakan emoji agar suasana meriah.

      CV PLAYER 1 (SISI KIRI):
      {cv1}

      CV PLAYER 2 (SISI KANAN):
      {cv2}

      BIO JURI: Anda adalah AI yang sangat berpengalaman, sudah melihat jutaan CV, dan sangat bosan dengan CV yang standar. Anda menyukai skill teknis yang nyata dan proyek yang unik.

      HASIL BATTLE:
    `);

        const chain = RunnableSequence.from([
            prompt,
            model,
            new StringOutputParser(),
        ]);

        const response = await chain.invoke({
            cv1: cv1,
            cv2: cv2,
        });

        return NextResponse.json({ result: response });
    } catch (error: any) {
        console.error("Comparize API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
