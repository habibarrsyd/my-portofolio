"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Sparkles, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "bot";
    content: string;
}

export default function Hero() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Halo! Saya adalah **AI Digital Twin** Habib. Tanyakan apa saja tentang pengalaman, skill, atau project saya! 🤖" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();
            if (data.answer) {
                setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
            } else {
                setMessages(prev => [...prev, { role: "bot", content: "Maaf, terjadi kesalahan. Coba lagi ya!" }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "bot", content: "Koneksi ke otak AI terputus. Pastikan environment variables sudah benar!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT: Bio & Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <Badge variant="outline" className="border-primary text-primary px-4 py-1 text-sm rounded-full">
                        <Sparkles className="w-3 h-3 mr-2" /> Open to Work: AI Engineer Intern
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Architecting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Intelligence.
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg">
                        Hi, I'm <span className="text-foreground font-semibold underline decoration-primary/50">Habib Arrosyid</span>.
                        AI Engineer specializing in Large Language Models, Computer Vision, and scalable MLOps.
                    </p>

                    <div className="flex gap-4">
                        <Button className="bg-primary text-black hover:bg-cyan-400 text-lg py-6 px-8">
                            View Projects <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="ghost" className="text-lg py-6 px-8 border border-border hover:bg-accent">
                            Contact Me
                        </Button>
                    </div>
                </motion.div>

                {/* RIGHT: Functional Chatbot UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 bg-card/50 border border-border backdrop-blur-xl rounded-2xl p-6 shadow-2xl h-[450px] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-border pb-4 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Ask My Digital Twin</h3>
                                    <p className="text-xs text-green-500 flex items-center gap-1 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online • RAG Active
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Content */}
                        <div ref={scrollRef} className="flex-grow space-y-4 mb-6 overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.role === "user"
                                            ? "bg-primary/20 text-foreground rounded-tr-none ml-auto"
                                            : "bg-muted text-foreground rounded-tl-none mr-auto"
                                            }`}>
                                            <ReactMarkdown
                                                components={{
                                                    ul: ({ children }) => <ul className="list-disc ml-4 space-y-1 my-2">{children}</ul>,
                                                    ol: ({ children }) => <ol className="list-decimal ml-4 space-y-1 my-2">{children}</ol>,
                                                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                        <div className="bg-muted p-3 rounded-lg rounded-tl-none flex items-center gap-2 text-sm text-muted-foreground">
                                            <Loader2 size={16} className="animate-spin" /> Habib sedang berpikir...
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="relative flex-shrink-0">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about my projects..."
                                className="w-full bg-background/50 border border-border rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-black rounded-full hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
