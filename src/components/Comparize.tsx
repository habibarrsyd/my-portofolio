"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Swords, Trophy, AlertTriangle, ShieldAlert, Zap, MessageSquareQuote, Send } from "lucide-react";

const roasts = [
    "Mending jualan cilok aja dek, CV kamu kayak struk belanja.",
    "Ini CV apa sertifikat lomba mewarnai tingkat RT?",
    "CV kamu terlalu humble, saking humblenya sampe nggak ada isinya.",
    "Coba lagi 10 tahun lagi, siapa tau saya udah pensiun (tapi saya nggak bakal pensiun).",
    "Habis baca CV kamu, algoritma saya langsung kena depresi ringan.",
    "Skill kamu: 'Bisa bernafas saat tidur'. Luar biasa, tapi saya tetep menang.",
    "Maaf, seleranya ketinggian buat kamu yang CV-nya masih pake font Arial.",
];

export default function Comparize() {
    const [status, setStatus] = useState<"idle" | "uploading" | "battling" | "result" | "feedback">("idle");
    const [fileName, setFileName] = useState<string | null>(null);
    const [battleResult, setBattleResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock data for Habib's CV (can be based on knowledge.md)
    const habibCV = `
        HABIB FABRI ARROSYID
        AI Engineer Intern at PT Salam Pacific Indonesia Lines.
        Computer Science at IPB University (GPA 3.57).
        Skills: Python, LLM, RAG, LangChain, React.js, n8n.
        Achievements: Best Poster Datathon 2025, Semi-Finalist HOLOGY 6.0.
    `;

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setStatus("uploading");

        try {
            // Step 1: Simulated Upload
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus("battling");

            // Step 2: Read PDF (Mocking for now as we need a library for real PDF parsing in browser, 
            // for MVP let's assume it's text-based or just roast based on a placeholder if parsing fails)
            // In a real scenario, we'd use a library like pdfjs-dist or send the file to a parsing API.
            // For this demo, let's use a placeholder text representing the "Challenger"
            const challengerText = "Challenger CV Content from " + file.name;

            // Step 3: Call API
            const response = await fetch("/api/comparize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cv1: habibCV, cv2: challengerText }),
            });

            const data = await response.json();
            if (data.result) {
                setBattleResult(data.result);
                setStatus("result");
            } else {
                throw new Error(data.error || "Battle failed");
            }
        } catch (error) {
            console.error("Battle Error:", error);
            setBattleResult("## ⚠️ ERROR: ARENA COLLAPSED\nSepertinya CV kamu terlalu berat sampai server saya nangis. Coba lagi nanti ya!");
            setStatus("result");
        }
    };

    const reset = () => {
        setStatus("idle");
        setFileName(null);
        setBattleResult("");
    };

    return (
        <section id="comparize" className="py-24 relative scroll-mt-24 overflow-hidden bg-primary/5">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                        COMPARIZ<span className="text-primary italic">E AI</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-[0.3em] text-xs font-mono">
                        HABIB VS THE WORLD • ARE YOU BRAVE ENOUGH?
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {!hasAgreed ? (
                            <motion.div
                                key="disclaimer"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                className="absolute inset-0 z-[60] flex items-center justify-center p-4 lg:p-8"
                            >
                                <div className="max-w-2xl w-full bg-card/80 backdrop-blur-3xl border-2 border-primary/30 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_50px_rgba(0,255,255,0.1)] relative overflow-hidden">
                                    {/* Decorative Scan Line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />

                                    <div className="mb-8 flex justify-center">
                                        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/40 flex items-center justify-center relative">
                                            <ShieldAlert className="text-primary animate-pulse" size={40} />
                                            <div className="absolute inset-0 border border-primary/20 rounded-2xl animate-ping" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">SECURITY <span className="text-primary">PROTOCOL</span></h3>

                                    <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed mb-10 text-justify md:text-center">
                                        <p>
                                            <span className="text-primary font-bold">[DISCLAIMER]</span> Fitur ini dibuat <span className="text-foreground font-bold">MURNI UNTUK HIBURAN</span> dan have fun semata. Tidak ada niatan untuk menghina, menjatuhkan, atau merendahkan siapapun.
                                        </p>
                                        <p>
                                            Ini adalah simulasi untuk melatih implementasi <span className="text-foreground">AI Text/File Reading</span> dengan pendekatan kreatif. Semua hasil "roasting" adalah hasil randomisasi sarkasme yang bersifat fiktif.
                                        </p>
                                        <p className="text-xs font-mono opacity-60 italic">
                                            "Entering this arena means you have thick skin and a sense of humor. Don't take it personally, it's just bits and bytes."
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setHasAgreed(true)}
                                        className="group relative px-10 py-4 bg-primary text-black font-black rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] hover:scale-105 active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-3">
                                            <Zap size={20} fill="currentColor" /> PROTOCOL ACCEPTED
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="arena"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative flex flex-col lg:flex-row items-stretch justify-center gap-8"
                            >
                                {/* LEFT SIDE: HABIB (THE GOD) */}
                                <div className="lg:w-1/3 relative group">
                                    <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <div className="relative h-full p-8 rounded-3xl bg-card/40 border-2 border-primary/50 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-primary/20 text-primary text-[10px] font-mono px-2 py-0.5 rounded border border-primary/40 leading-none">GOD-TIER</span>
                                        </div>

                                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_20px_#00ffff] mb-6">
                                            <Image src="/habib-pict.jpeg" alt="Habib" fill className="object-cover" />
                                        </div>

                                        <h3 className="text-2xl font-black mb-1 tracking-tight">HABIB <span className="text-primary italic">ARSYD</span></h3>
                                        <p className="text-primary/70 font-mono text-[10px] mb-6 tracking-widest uppercase">THE ETERNAL VICTOR</p>

                                        <div className="w-full space-y-2">
                                            <div className="flex justify-between text-[10px] font-mono">
                                                <span>AURA</span>
                                                <span className="text-primary">OVER 9000</span>
                                            </div>
                                            <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                                                <div className="w-full h-full bg-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CENTER: VS & RESULT AREA */}
                                <div className="lg:w-2/3 flex flex-col gap-8">
                                    <div className="relative min-h-[400px]">
                                        <AnimatePresence mode="wait">
                                            {status === "idle" && (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 1.1 }}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="absolute inset-0 p-8 rounded-3xl bg-card/20 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center text-center group/drop"
                                                >
                                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleUpload} accept=".pdf" />
                                                    <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mb-6 group-hover/drop:bg-primary/20 transition-colors">
                                                        <Upload className="text-muted-foreground group-hover/drop:text-primary transition-colors" size={32} />
                                                    </div>
                                                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">UPLOAD YOUR CV</h3>
                                                    <p className="text-sm text-muted-foreground max-w-[300px]">Face the ultimate judgment. No PDF, no glory.</p>
                                                    <div className="mt-8 px-4 py-2 rounded-full border border-border text-[10px] font-mono opacity-50 uppercase tracking-widest">PDF ONLY • ENCRYPTED CONNECTION</div>
                                                </motion.div>
                                            )}

                                            {status === "uploading" && (
                                                <motion.div
                                                    key="uploading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 p-8 rounded-3xl bg-card/20 border-2 border-primary/30 flex flex-col items-center justify-center text-center"
                                                >
                                                    <div className="w-64 h-2 bg-muted/30 rounded-full overflow-hidden mb-4 p-[2px]">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: 1.5 }}
                                                            className="h-full bg-primary shadow-[0_0_15px_#00ffff] rounded-full"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-mono text-primary animate-pulse uppercase tracking-[0.4em]">Extracting Weaknesses...</p>
                                                </motion.div>
                                            )}

                                            {status === "battling" && (
                                                <motion.div
                                                    key="battling"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 p-8 rounded-3xl bg-card/20 border-2 border-primary/30 flex flex-col items-center justify-center overflow-hidden"
                                                >
                                                    <motion.div
                                                        animate={{ y: [-200, 400] }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_#00ffff] z-0"
                                                    />
                                                    <div className="relative z-10 flex flex-col items-center">
                                                        <Swords className="text-primary mb-6 animate-spin" size={48} />
                                                        <div className="space-y-3 text-center font-mono text-[10px]">
                                                            <p className="text-primary">RUNNING CROSS-VAL... [SUCCESS]</p>
                                                            <p className="text-primary">RANKING SKILLS... [LOW-TIER]</p>
                                                            <p className="text-destructive animate-pulse mt-4 font-bold">WARNING: CRITICAL LACK OF VIBES</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {status === "result" && (
                                                <motion.div
                                                    key="result"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute inset-0 p-8 rounded-3xl bg-card/30 border-2 border-primary/50 overflow-y-auto custom-scrollbar"
                                                >
                                                    <div className="prose prose-invert prose-primary max-w-none text-sm leading-relaxed">
                                                        <div className="flex items-center justify-between mb-8 border-b border-primary/20 pb-4">
                                                            <h3 className="text-2xl font-black tracking-tighter uppercase m-0">BATTLE REPORT</h3>
                                                            <button onClick={reset} className="text-[10px] font-mono text-primary border border-primary/30 px-3 py-1 rounded hover:bg-primary/10 transition-colors uppercase">REMATCH</button>
                                                        </div>
                                                        <div className="whitespace-pre-wrap font-sans text-muted-foreground">
                                                            {battleResult.split('\n').map((line, i) => (
                                                                <p key={i} className={line.startsWith('#') ? "text-primary font-bold text-lg mt-4 mb-2" : "mb-2"}>
                                                                    {line}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Action Buttons (Cope Area) */}
                                    {status === "result" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4"
                                        >
                                            <button
                                                onClick={() => setStatus("feedback")}
                                                className="flex-1 py-4 px-6 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive font-bold text-xs uppercase tracking-widest hover:bg-destructive/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <AlertTriangle size={16} /> ADMIT DEFEAT & COPE
                                            </button>
                                            <button
                                                onClick={reset}
                                                className="px-6 py-4 rounded-2xl bg-primary text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all"
                                            >
                                                TRY AGAIN
                                            </button>
                                        </motion.div>
                                    )}

                                    {status === "feedback" && (
                                        <motion.div
                                            key="feedback"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-8 rounded-3xl bg-card border-2 border-primary/50"
                                        >
                                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 m-0">
                                                <Trophy className="text-primary" size={20} /> ADMISSION FORM
                                            </h3>
                                            <p className="text-xs text-muted-foreground mb-6">Ceritakan perasaanmu setelah dihajar oleh Sang Legenda.</p>
                                            <div className="space-y-4">
                                                <textarea
                                                    className="w-full p-4 rounded-xl bg-background/50 border border-border focus:border-primary h-24 text-sm resize-none"
                                                    placeholder="Contoh: Sangat terinspirasi untuk pensiun dini..."
                                                ></textarea>
                                                <button
                                                    onClick={reset}
                                                    className="w-full py-4 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Send size={16} /> SUBMIT & DISAPPEAR
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
