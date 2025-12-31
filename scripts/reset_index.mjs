import { Index } from "@upstash/vector";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function resetIndex() {
    console.log("Menghapus semua data di Upstash Vector...");

    const index = new Index({
        url: process.env.UPSTASH_VECTOR_REST_URL,
        token: process.env.UPSTASH_VECTOR_REST_TOKEN,
    });

    try {
        await index.reset();
        console.log("✅ Index berhasil dikosongkan!");
    } catch (error) {
        console.error("❌ Gagal mereset index:", error.message);
    }
}

resetIndex();
