# DAY 1 INSTRUCTIONS: Foundation & "Neural Cyberpunk" UI

## Context & Role
You are an expert Senior Frontend Engineer specializing in **Next.js 14+ (App Router)**, **Tailwind CSS**, and **Framer Motion**.
We are building a portfolio called **"The AI Engineer Hub"**.
**Theme:** Neural Cyberpunk (Deep Black background, Neon Cyan primary, Matrix Green secondary).

**Objective:**
1. Fix the Tailwind configuration to resolve "unknown utility class" errors.
2. Implement the Global CSS variables.
3. Build the `Navbar` (Glassmorphism).
4. Build the `Hero` Section (Animated with a Mockup AI Chat Interface).

---

## 1. CONFIGURATION (CRITICAL)
*Action: Overwrite the following files completely to fix the theme system.*

### A. `tailwind.config.ts`
*Overwrite the existing file in the root directory.*
```ts
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  			popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
  			primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  			secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
  			muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  			accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
  			destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
        animation: {
            "spin-slow": "spin-slow 10s linear infinite",
        },
        keyframes: {
            "spin-slow": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
            }
        }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

### B. 'src/app/globals.css' (Overwrite)
*Overwrite to set the CSS variables for the 'Cyberpunk' LOOK.*
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Deep Black & Neon Cyan Theme */
    --background: 222 47% 4%; /* #050a14 */
    --foreground: 210 40% 98%;
    
    --card: 222 47% 6%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222 47% 4%;
    --popover-foreground: 210 40% 98%;
    
    --primary: 180 100% 50%; /* #00F2EA - Electric Cyan */
    --primary-foreground: 222 47% 4%;
    
    --secondary: 160 84% 39%; /* Matrix Green */
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;
    
    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --border: 217 33% 17%; /* Defines 'border-border' */
    --input: 217 33% 17%;
    --ring: 180 100% 50%;
    
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    /* Subtle Grid Background */
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}
```
## 2. COMPONENTS
### A. 'src/components/Navbar.tsx' (Create)
*Create this file. It should be sticky, have a glassmorphism effect, and responsive links.*
```ts
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Muthi<span className="text-primary">.ai</span>
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
          <div className="hidden sm:flex gap-3 text-muted-foreground">
            <Link href="[https://github.com](https://github.com)" target="_blank" className="hover:text-white transition-colors"><Github size={20}/></Link>
            <Link href="[https://linkedin.com](https://linkedin.com)" target="_blank" className="hover:text-white transition-colors"><Linkedin size={20}/></Link>
          </div>
          <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
            <FileText className="mr-2 h-4 w-4" /> Resume
          </Button>
        </div>
      </div>
    </nav>
  );
}
### B. 'src/components/Hero.tsx' (Create)
*Create this file. It contains the "Neural Halo" avatar on the left and a "Dummy Chatbot" on the right. Use framer-motion for entrance animations.*
```ts
"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
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
            Hi, I'm <span className="text-white font-semibold">Muthi</span>. 
            AI Engineer specializing in Large Language Models, Computer Vision, and scalable MLOps.
          </p>

          <div className="flex gap-4">
            <Button className="bg-primary text-black hover:bg-cyan-400 text-lg py-6 px-8">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-lg py-6 px-8 border border-white/10 hover:bg-white/5">
              Contact Me
            </Button>
          </div>
        </motion.div>

        {/* RIGHT: Chatbot Mockup UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ask My Digital Twin</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online • RAG Active
                  </p>
                </div>
              </div>
            </div>

            {/* Mock Chat Content */}
            <div className="space-y-4 mb-6 h-[200px] overflow-y-auto">
              <div className="flex gap-3">
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm">
                  Halo! Saya adalah AI Assistant Muthi. Tanyakan apa saja tentang skill atau projectnya! 🤖
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                 <div className="bg-primary/20 text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%] text-sm">
                  What is his focus?
                 </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%] text-sm">
                  Muthi focuses on LLMs, Computer Vision (YOLO), and Backend Engineering. Currently building a Hybrid Dairy Recommender!
                </div>
              </div>
            </div>

            {/* Mock Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask something..." 
                disabled
                className="w-full bg-black/50 border border-white/10 rounded-full py-3 px-5 text-sm focus:outline-none opacity-70 cursor-not-allowed"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```
### C. 'src/components/page.tsx' (Create)
*Assemble the components.*
```ts
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <section className="h-screen flex items-center justify-center border-t border-white/5">
        <p className="text-muted-foreground animate-pulse">Coming Next: Experience & Comparize AI...</p>
      </section>
    </main>
  );
}
