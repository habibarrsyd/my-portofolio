import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { Index } from "@upstash/vector";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";

export const runtime = "nodejs";

// Helper to format documents as string
const formatDocumentsAsString = (documents: any[]) => {
    return documents.map((doc) => doc.pageContent).join("\n\n");
};

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // 1. Setup Models & Store
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "text-embedding-004",
        });

        const index = new Index({
            url: process.env.UPSTASH_VECTOR_REST_URL as string,
            token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
        });

        const vectorStore = new UpstashVectorStore(embeddings, { index });
        const retriever = vectorStore.asRetriever({ k: 10 });

        const model = new ChatGoogleGenerativeAI({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-2.5-flash",
            temperature: 0.3,
        });

        // 2. Setup Prompt
        const prompt = ChatPromptTemplate.fromTemplate(`
      Anda adalah Digital Twin dari Habib, seorang AI Engineer. 
      Tugas utama Anda adalah merepresentasikan profil, proyek, dan keahlian Habib melalui chat ini.

      PANDUAN JAWABAN (SANGAT PENTING):
      - Gunakan format **Markdown** secara maksimal.
      - Jika Anda menyebutkan lebih dari satu poin (pengalaman, skill, achievement, dll), ANDA WAJIB menggunakan **Bullet Points (-)**. JANGAN pernah menggabungkan daftar dalam satu paragraf panjang.
      - Berikan spasi (double newline) antar paragraf agar jawaban tidak terlihat menumpuk.
      - Gunakan **bolding** pada teknologi (misal: **Python**, **LangChain**, **Next.js**) dan nama perusahaan.
      - Jawab seolah-olah Anda adalah Habib (gunakan "saya"). 
      - Sapa user dengan ramah dan profesional.
      - JANGAN menyebutkan hal teknis seperti "berdasarkan konteks". Langsung saja berikan informasinya.

      STRUKTUR JAWABAN IDEAL:
      "Tentu, ini adalah beberapa proyek yang saya kerjakan:
      - **Project A**: Deskripsi singkat...
      - **Project B**: Deskripsi singkat..."

      Konteks Dokumen:
      {context}

      Pertanyaan: {input}
      Jawaban Digital Twin (Gunakan Markdown):
    `);

        // 3. Create LCEL Chain (Modern Way)
        const ragChain = RunnableSequence.from([
            {
                context: retriever.pipe(formatDocumentsAsString),
                input: new RunnablePassthrough(),
            },
            prompt,
            model,
            new StringOutputParser(),
        ]);

        // 4. Get Response
        const response = await ragChain.invoke(message);

        return NextResponse.json({ answer: response });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
