import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { Index } from "@upstash/vector";
import { Document } from "@langchain/core/documents";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import dotenv from "dotenv";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

dotenv.config({ path: ".env.local" });

async function ingest() {
    console.log("Memulai proses ingestion (Markdown & PDF) secara manual...");

    const dataDir = path.join(process.cwd(), "src/data");
    if (!fs.existsSync(dataDir)) {
        console.error("Folder src/data tidak ditemukan!");
        return;
    }

    const files = fs.readdirSync(dataDir);
    const allDocs = [];

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const ext = path.extname(file).toLowerCase();

        console.log(`Memproses file: ${file}...`);

        try {
            if (ext === ".md") {
                const content = fs.readFileSync(filePath, "utf-8");
                allDocs.push(new Document({
                    pageContent: content,
                    metadata: { source: file }
                }));
            } else if (ext === ".pdf") {
                const dataBuffer = fs.readFileSync(filePath);
                const data = await pdf(dataBuffer);
                allDocs.push(new Document({
                    pageContent: data.text,
                    metadata: { source: file }
                }));
            }
        } catch (err) {
            console.error(`Gagal memproses ${file}:`, err.message);
        }
    }

    if (allDocs.length === 0) {
        console.log("Tidak ada file yang didukung (.md atau .pdf) untuk di-ingest.");
        return;
    }

    // 2. Split data menjadi chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(allDocs);

    console.log(`Berhasil membagi data menjadi ${splitDocs.length} chunks.`);

    // 3. Setup Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
    });

    // 4. Setup Upstash Vector Store
    const index = new Index({
        url: process.env.UPSTASH_VECTOR_REST_URL,
        token: process.env.UPSTASH_VECTOR_REST_TOKEN,
    });

    const vectorStore = new UpstashVectorStore(embeddings, { index });

    // 5. Simpan ke Database
    console.log("Menyimpan ke Upstash Vector...");
    await vectorStore.addDocuments(splitDocs);

    console.log("Ingestion selesai! Semua data (MD & PDF) tersimpan di Upstash.");
}

ingest().catch(console.error);
