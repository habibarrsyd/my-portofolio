"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/50 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    habibarrsyd<span className="text-primary">.portfolio</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="#about" className="hover:text-primary transition-colors">About</Link>
                    <Link href="#experience" className="hover:text-primary transition-colors">Experience</Link>
                    <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
                    <Link href="#comparize" className="text-primary hover:text-cyan-300 animate-pulse">Comparize</Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="hidden sm:flex gap-3 text-muted-foreground">
                        <Link href="https://github.com/habibarrsyd" target="_blank" className="hover:text-foreground transition-colors"><Github size={20} /></Link>
                        <Link href="https://linkedin.com/in/habibarrsyd" target="_blank" className="hover:text-foreground transition-colors"><Linkedin size={20} /></Link>
                    </div>
                    <a href="/cv-Habib_Fabri_Arrosyid.pdf" download="CV_Habib_Fabri_Arrosyid.pdf">
                        <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
                            <FileText className="mr-2 h-4 w-4" /> Resume
                        </Button>
                    </a>
                </div>
            </div>
        </nav>
    );
}
