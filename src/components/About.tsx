"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Photo Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3 relative"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                            {/* Decorative Rings */}
                            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow" />
                            <div className="absolute inset-2 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            {/* Image Container */}
                            <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-border shadow-2xl">
                                {/* 
                  NOTE: Habib, replace the src below with your actual photo path 
                  e.g., src="/your-photo.jpg" after uploading it to 'public' folder.
                */}
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary/40 backdrop-blur-sm">
                                    <div className="text-center p-4">
                                        <p className="text-sm font-bold uppercase tracking-widest">Your Photo</p>
                                        <p className="text-[10px] mt-1 opacity-60">Upload to /public and change src in About.tsx</p>
                                    </div>
                                </div>
                                {/* Once you have a photo, uncomment the Image tag below and comment the placeholder div above */}
                                <Image
                                    src="/habib-pict.jpeg"
                                    alt="Habib"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-2/3 space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            About <span className="text-primary">Me</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Computer Science student at IPB University with a strong passion for emerging technologies, particularly artificial
                            intelligence (AI) and machine learning. Proficient in Python and experienced in other programming languages, I have developed my
                            technical skills through academic projects and personal exploration. Currently, I am actively seeking opportunities in the tech industry to
                            apply my knowledge and grow as a professional in this rapidly evolving field.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 pt-4">
                            <div className="p-4 rounded-xl bg-card/50 border border-border">
                                <h3 className="text-primary font-semibold mb-2">Education</h3>
                                <p className="text-sm text-muted-foreground">Final year Computer Science Student IPB University specializing in AI & Systems Development.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border">
                                <h3 className="text-primary font-semibold mb-2">Currently Thesis</h3>
                                <p className="text-sm text-muted-foreground">"Robustness Analysis of RetinaFace-Mobilenet Model using Synthetic Occlusion Training Strategy for Cattle Face Detection and Identification."</p>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border">
                                <h3 className="text-primary font-semibold mb-2">Awards</h3>
                                <p className="text-sm text-muted-foreground">Best Poster at Datathon SSMI 2025</p>
                                <p className="text-sm text-muted-foreground">Top 43 Big Data Challenge GAMMAFEST 2025</p>
                                <p className="text-sm text-muted-foreground">Semifinalist IT Business Case Hoology 6.0</p>
                            </div>
                            <div className="p-4 rounded-xl bg-card/50 border border-border">
                                <h3 className="text-primary font-semibold mb-2">Tech Skill</h3>
                                <p className="text-sm text-muted-foreground"><b>Technical</b> : Machine learning, IOT, Computer
                                    Vision, Natural Language Processing,
                                    Generative AI, LLM, Data Analytics
                                </p>
                                <p className="text-sm text-muted-foreground"><b>Language</b> : Python, SQL, React, Shell bash</p>
                                <p className="text-sm text-muted-foreground"><b>Tools</b> : N8n, Gemini API, Langchain, Looker
                                    Styudio</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
                            "Currently building a IOT based Container-Scanner and Cattle Face Recoginition."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
