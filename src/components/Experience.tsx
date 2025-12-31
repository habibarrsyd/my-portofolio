"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Calendar, Briefcase, GraduationCap, MapPin } from "lucide-react";

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    duration: string;
    description: string[];
    logo: string;
    photos?: string[];
    type: "experience" | "organization";
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: "AI Engineer Intern",
        company: "PT. Salam Pacific Indonesia Lines",
        duration: "Aug 2025 - Present",
        description: [
            "Spearheaded development and deployment of three critical AI and automation projects for maritime logistics modernization.",
            "Leveraged LLMs, RAG, and automation tools (n8n, LangChain, Gemini) to transform reactive processes into proactive intelligence hubs.",
            "Streamlined workflows and mitigated operational risks in real-time for port and vessel operations management."
        ],
        logo: "/spilkan.svg", // Example logo
        photos: ["/image.png", "/spil-magang.jpeg"], // Added a second photo
        type: "experience"
    },
    {
        id: 2,
        role: "Head of Human Resource Development",
        company: "Himpunan Mahasiswa Ilmu Komputer IPB",
        duration: "Jan - Dec 2024",
        description: [
            "Providing soft skills training and leadership development programs for members.",
            "Conducting detailed analysis of association member performance data.",
            "Assessing and evaluating the overall growth and performance of organization members."
        ],
        logo: "/ipbb.png", // Example logo
        photos: ["/hrd-1.jpeg", "/hrd-2.jpeg"], // Added a second photo
        type: "organization"
    },
    {
        id: 3,
        role: "Project Based Virtual Intern: Data Scientist",
        company: "Home Credit Indonesia",
        duration: "Jun - Jul 2025",
        description: [
            "Completed a data science project involving big data collection, machine learning modeling, and dataset merging.",
            "Analyzed test cases provided by the company to ensure model robustness and accuracy.",
            "Presented data visualizations and insightful reports to summarize findings."
        ],
        logo: "/homecredit.jpg", // Example logo
        photos: [], // Added placeholder photos
        type: "experience"
    },
    {
        id: 4,
        role: "AI Research Assistant - Crazyflie UAV Project Based",
        company: "Dept. Computer Science IPB University",
        duration: "Feb - May 2025",
        description: [
            "Assisted in creating a plant-based object image detection AI model for Crazyflie-based drone application.",
            "Managed the collection of image samples for training the computer vision model.",
            "Integrated the AI model directly into the drone for autonomous operation."
        ],
        logo: "/ipbb.png", // Example logo
        photos: ["/drone.jpeg", "/crazyflie.jpeg"], // Added a second photo
        type: "experience"
    },
    {
        id: 5,
        role: "Machine Learning Cohort",
        company: "Codingcamp Powered by DBS Foundation",
        duration: "Jan - Jun 2025",
        description: [
            "Developed 'FinBuddy', a financial reporting product with savings recommendations and behavior tracking.",
            "Created and implemented a chatbot-based customer service AI model for the product interface.",
            "Integrated the AI model and financial features into the web-based student platform."
        ],
        logo: "/dbs-found.webp", // Example logo
        photos: ["/dbs-ppp.png", "/dbs-egaen.png"], // Added a second photo
        type: "experience"
    },
    {
        id: 6,
        role: "Staff of Academic",
        company: "Data Mining Club IPB",
        duration: "Aug - Oct 2024",
        description: [
            "Managing the curriculum for materials related to data mining and analytics.",
            "Providing hard skills training focused on data processing and mining techniques."
        ],
        logo: "/daming.png", // Example logo
        photos: ["/dbs-ppp.png", "/dbs-egaen.png"], // Added a second photo
        type: "organization"
    },
    {
        id: 7,
        role: "Staff of People and Culture",
        company: "Ormawa Eksekutif PKU IPB 2023",
        duration: "Jan - Dec 2023",
        description: [
            "Contributing to organizational management and people development strategies.",
            "Coordinating programs focused on member welfare and cultural growth within the organization."
        ],
        logo: "/daming.png", // Example logo
        photos: ["/dbs-ppp.png", "/dbs-egaen.png"], // Added a second photo
        type: "organization"
    }
    // Add more items here
];

export default function Experience() {
    const [activeTab, setActiveTab] = useState<"experience" | "organization">("experience");

    const filteredExperiences = experiences.filter(exp => exp.type === activeTab);

    return (
        <section id="experience" className="py-24 relative scroll-mt-24">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        My <span className="text-primary italic">Journey</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A chronological exploration of my professional growth and organizational involvement.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-card/30 p-1 rounded-xl border border-border backdrop-blur-md flex gap-2">
                        <button
                            onClick={() => setActiveTab("experience")}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium ${activeTab === "experience"
                                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                                : "hover:bg-primary/10 text-muted-foreground"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Briefcase size={18} /> Experience
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("organization")}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 font-medium ${activeTab === "organization"
                                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                                : "hover:bg-primary/10 text-muted-foreground"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <GraduationCap size={20} /> Organization
                            </span>
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent hidden md:block" />

                    <div className="space-y-12">
                        <AnimatePresence mode="wait">
                            {filteredExperiences.map((exp, index) => (
                                <motion.div
                                    key={`${activeTab}-${exp.id}`}
                                    initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2">
                                        <div className={`group relative p-6 rounded-2xl bg-card/40 border border-border backdrop-blur-xl hover:border-primary/50 transition-all duration-500 shadow-xl overflow-hidden`}>
                                            {/* Decorative Background Glow */}
                                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                        {exp.duration}
                                                    </span>
                                                    <Image
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-lg bg-white/10 p-1"
                                                        // Adding error handling for placeholder logos
                                                        onError={(e) => {
                                                            (e.target as any).src = "https://ui-avatars.com/api/?name=" + exp.company;
                                                        }}
                                                    />
                                                </div>

                                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-secondary font-medium mb-4 flex items-center gap-2">
                                                    <MapPin size={14} /> {exp.company}
                                                </p>

                                                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                                                    {exp.description.map((item, i) => (
                                                        <li key={i} className="flex gap-2">
                                                            <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Mini Photo Gallery */}
                                                {exp.photos && exp.photos.length > 0 && (
                                                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
                                                        {exp.photos.map((photo, i) => (
                                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden group/img">
                                                                <Image
                                                                    src={photo}
                                                                    alt={`Activity ${i}`}
                                                                    fill
                                                                    className="object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Node (Dot) */}
                                    <div className="relative flex items-center justify-center md:static">
                                        <div className="absolute md:relative z-20 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_#00ffff]" />
                                    </div>

                                    {/* Empty Space for alignment */}
                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
