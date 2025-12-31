"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, X, Code2, Cpu, Database, Layout, Sparkles, Clock } from "lucide-react";

interface TechStack {
    name: string;
    icon: React.ReactNode;
}

interface Project {
    id: number;
    title: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    techStack: TechStack[];
    images: string[];
    github?: string;
    demo?: string;
    category: "AI & ML" | "Systems" | "Fullstack & AI" | "IOT Development";
    featured?: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: "[ON GOING] Cattle Face Identification",
        shortDesc: "Robustness analysis of RetinaFace-Mobilenet for cattle detection using Synthetic Occlusion.",
        longDesc: "My thesis project involves developing a robust system for identifying individual dairy cows using facial recognition. I'm implementing Synthetic Occlusion Training strategies to improve model performance in real-farm conditions where cows might be partially obscured.",
        duration: "Dec 2025 - Present",
        techStack: [
            { name: "Python", icon: <Code2 size={16} /> },
            { name: "PyTorch", icon: <Cpu size={16} /> },
            { name: "OpenCV", icon: <Database size={16} /> },
            { name: "PWA", icon: <Layout size={16} /> }

        ],
        images: ["/idea-cattle.png"],
        github: "https://github.com/habibarrsyd/cattle-pwa-identifier",
        category: "Fullstack & AI",
        featured: true
    },
    {
        id: 2,
        title: "[ON GOING] Container-Scanner IOT based",
        shortDesc: "Container Scanner IOT based for cargo tracking using RaspberryPi and remote controller.",
        longDesc: ".",
        duration: "Nov - Present",
        techStack: [
            { name: "React(js)", icon: <Layout size={16} /> },
            { name: "Flask", icon: <Cpu size={16} /> },
            { name: "RaspberryPi", icon: <Sparkles size={16} /> },
            { name: "OpenCV", icon: <Database size={16} /> },
            { name: "Pytorch", icon: <Layout size={16} /> }
        ],
        images: ["/image.png", "/rasbery.jpeg", "/roboto.jpeg"],
        demo: "",
        category: "IOT Development",
        featured: true
    },
    {
        id: 3,
        title: "Automating Port Risk Analysis",
        shortDesc: "Building a Real-Time Monitoring System with AI-Driven Insights.",
        longDesc: "Instead of just delivering raw data alerts, the workflow leverages n8n for automation and integrates Google Gemini AI to perform real-time analysis. The AI assesses the data (like wind speed vs. safety thresholds) and generates actionable insights on potential operational impacts, such as crane shutdowns or berthing delays.",
        duration: "Oct - Nov 2025",
        techStack: [
            { name: "N8N", icon: <Code2 size={16} /> },
            { name: "Looker Studio", icon: <Database size={16} /> },
            { name: "Gemini LLM", icon: <Layout size={16} /> }
        ],
        images: ["/autorisk2.png", "/autorisk.png"],
        category: "Systems"
    },
    {
        id: 4,
        title: "SPIL Copilot Operasional Kapal",
        shortDesc: "Chatbot system for vessel operations submissions by leveraging our company’s .",
        longDesc: "Developed a chatbot system for vessel operations submissions by leveraging our company’s large language model (LLM) combined with Retrieval-Augmented Generation (RAG) features, utilizing the LangChain framework. This solution enables the chatbot to accurately retrieve and provide answers to operational queries based on the company’s internal knowledge base.",
        duration: "Sep - Oct 2025",
        techStack: [
            { name: "LangChain", icon: <Cpu size={16} /> },
            { name: "VectorDB", icon: <Database size={16} /> },
            { name: "KoboldAI", icon: <Layout size={16} /> },
            { name: "React(js)", icon: <Layout size={16} /> }
        ],
        images: ["/copilot.png"],
        category: "AI & ML"
    },
    {
        id: 5,
        title: "Port Monitoring System",
        shortDesc: "Automated Port Monitoring Dashboard leveraging proprietary LLM",
        longDesc: " For intelligent vessel issue classification, transforming raw data into strategic, actionable insights that enable managers to make timely, data-driven decisions and optimize port operational efficiency",
        duration: "Aug - Sep 2025",
        techStack: [
            { name: "React(js)", icon: <Cpu size={16} /> },
            { name: "POSTGRESQL", icon: <Database size={16} /> },
            { name: "Flask", icon: <Layout size={16} /> },
            { name: "KoboldAI", icon: <Layout size={16} /> }
        ],
        images: ["/dasbor.jpg", "/port-time.jpg", "/porttime.jpg"],
        category: "Fullstack & AI"
    },
    {
        id: 6,
        title: "Finbuddy",
        shortDesc: "Smart Financial Dashboard & AI Assistant",
        longDesc: " Smart Financial Solution with an dashboard system, participated as part of the machine learning development team for this website. I contributed to developing a simple chatbot using fine-tuning techniques with basic RAG without utilizing OpenAI's API",
        duration: "Apr - May 2025",
        techStack: [
            { name: "SentenceTransformers", icon: <Cpu size={16} /> },
            { name: "Flask", icon: <Database size={16} /> },
            { name: "React(js)", icon: <Layout size={16} /> }
        ],
        images: ["/fb3.png", "/fb2.png", "/fb.png"],
        github: "https://github.com/xlord-003/FinBuddy",
        category: "Fullstack & AI"
    },
    {
        id: 7,
        title: "Crazyflie UAV Drone Detection",
        shortDesc: "Autonomus Drone Detection System",
        longDesc: " AI-based drone for plant detection, Implemented on-device machine learning for real-time image data collection and processing on drone hardware",
        duration: "Feb - May 2025",
        techStack: [
            { name: "LinuxBash", icon: <Cpu size={16} /> },
            { name: "OpenCV", icon: <Database size={16} /> },
            { name: "Ubuntu", icon: <Layout size={16} /> },
        ],
        images: ["/drone.jpeg", "/spil-magang.jpeg"],
        demo: "https://youtu.be/h3_bopc3xCc?si",
        category: "Systems"
    },
    {
        id: 8,
        title: "ETL Automation Systems",
        shortDesc: "Auotmate Data Processing using ETL Pipeline with Flask & BeautifulSoup",
        longDesc: "Build an automation extract, transform, and load data with BeautifulSoup and Python. This pipeline can make effective data processing",
        duration: "Mar 2025",
        github: "https://github.com/habibarrsyd/pipeline-etl",
        techStack: [
            { name: "BeautifulSoup", icon: <Cpu size={16} /> },
            { name: "Pandas", icon: <Database size={16} /> },
            { name: "Flask", icon: <Layout size={16} /> }
        ],
        images: ["/etl2.jpeg"],
        category: "Systems"
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-24 relative scroll-mt-24 overflow-hidden">
            <div className="container px-4 mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-primary italic">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A showcase of my work in AI, Machine Learning, and Systems development.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[300px] md:auto-rows-[250px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-xl ${project.featured
                                ? "md:col-span-3 md:row-span-2"
                                : "md:col-span-2 md:row-span-1"
                                }`}
                        >
                            {/* Project Image */}
                            <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2 opacity-80">
                                    {project.category}
                                </span>
                                <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${project.featured ? "text-2xl md:text-3xl" : "text-xl"
                                    }`}>
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 group-hover:text-foreground transition-colors">
                                    {project.shortDesc}
                                </p>

                                {/* Tech Stack Preview */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20 backdrop-blur-md">
                                            {tech.icon} {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <Sparkles size={18} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 text-white hover:bg-primary hover:text-black transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col lg:flex-row">
                                {/* Image Section / Gallery */}
                                <div className="lg:w-3/5 relative min-h-[300px] lg:min-h-full bg-black/20">
                                    <div className="sticky top-0 h-full p-6">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-lg">
                                            <Image
                                                src={selectedProject.images[0]}
                                                alt={selectedProject.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Thumbnail Gallery (Mock) */}
                                        <div className="grid grid-cols-4 gap-3 mt-4">
                                            {selectedProject.images.map((img, i) => (
                                                <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === 0 ? 'border-primary' : 'border-border'}`}>
                                                    <Image src={img} alt="Gallery" fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock size={12} /> {selectedProject.duration}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl font-bold mb-6">{selectedProject.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed mb-8">
                                            {selectedProject.longDesc}
                                        </p>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, i) => (
                                                    <span key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/50 border border-border text-sm backdrop-blur-sm">
                                                        {tech.icon} {tech.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-6 border-t border-border">
                                        {selectedProject.github && (
                                            <a href={selectedProject.github} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background font-bold hover:bg-primary transition-colors">
                                                <Github size={20} /> Github Repo
                                            </a>
                                        )}
                                        {selectedProject.demo && (
                                            <a href={selectedProject.demo} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors">
                                                <ExternalLink size={20} /> Live Demo
                                            </a>
                                        )}
                                        {!selectedProject.github && !selectedProject.demo && (
                                            <div className="flex-1 text-center py-3 text-muted-foreground italic text-sm">
                                                Repository restricted or private
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
