# Project Blueprint: The AI Engineer Hub (Portfolio 2.0)

## 1. Project Overview
**Nama Project:** The AI Engineer Hub
**Tujuan:** Membuat portofolio web interaktif berbasis AI yang tidak hanya menampilkan informasi, tetapi juga mendemonstrasikan kemampuan teknis (Show, Don't Just Tell).
**Core Philosophy:** "High-Tech, Interactive, & Biasedly Awesome."
**Target User:** HR, Recruiter, Tech Leads, dan sesama Developer.

---

## 2. Tech Stack (Zero Cost / Free Tier)
Project ini dirancang menggunakan layanan gratis dengan performa tinggi.

### **Frontend & UI**
* **Framework:** Next.js 14+ (App Router) - *React Framework.*
* **Styling:** Tailwind CSS - *Utility-first CSS.*
* **Components:** Shadcn/UI - *Accessible & clean UI components.*
* **Animations:** Framer Motion - *Smooth entry & interactions.*
* **Icons:** Lucide-React.

### **AI & Backend Logic (Serverless)**
* **LLM Model:** Google Gemini 1.5 Flash (via Google AI Studio API) - *Gratis, cepat, context window besar.*
* **Orchestration:** LangChain.js atau Vercel AI SDK - *Untuk mempermudah chaining prompt.*
* **PDF Parsing:** `pdf-parse` - *Untuk membaca CV user & portofolio sendiri.*

### **Database & Storage**
* **Vector DB (RAG):** Pinecone (Free Tier) - *Menyimpan embeddings dari PDF Portofoliomu.*
* **Relational DB:** Supabase (PostgreSQL Free Tier) - *Untuk fitur Guestbook/Feedback.*

### **Deployment**
* **Platform:** Vercel (Hobby Plan).
* **Domain:** Subdomain Vercel atau Custom Domain (jika ada).

---

## 3. Site Structure (Single Page Application)

Web ini menggunakan konsep **SPA** dengan *smooth scroll*, namun fitur berat (Comparize) akan menggunakan *Modal/Overlay* atau *Dedicated Section*.

### **A. Navigation (Sticky & Glassmorphism)**
* **Items:** Home, About, Experience, Projects, **Comparize (NEW)**, Contact.
* **Action:** Tombol "Download Resume" (Download PDF asli).

### **B. Section 1: Hero & The "RAG" Avatar**
* **Visual:** Foto profesional dengan *glow effect* atau nuansa *cyber*.
* **Headline:** "Hi, I'm [Nama]. AI Engineer | LLM & Computer Vision Enthusiast."
* **Interactive Feature: "Ask My Digital Twin" (RAG Chatbot)**
    * **Posisi:** Floating widget atau side-panel di Hero.
    * **Mekanisme:** Menggunakan **RAG (Retrieval Augmented Generation)**.
    * **Data Source:** File `portofolio.pdf` dan `cv.pdf` milikmu yang di-embed ke Pinecone.
    * **User Flow:** User tanya "Pernah handle project apa?" -> AI search Vector DB -> AI jawab based on data nyata.

### **C. Section 2: About & Tech Stack**
* **Bio:** Ringkas & Padat.
* **Tech Stack Grid:** Icon bergerak/interaktif (Python, PyTorch, Docker, Next.js, etc.).

### **D. Section 3: The Timeline (Experience & Org)**
* **Konsep:** Garis waktu vertikal (Vertical Timeline).
* **Konten:** Gabungan pengalaman Kerja (Work) dan Organisasi.
* **Visual Cue:** Beda warna marker untuk Work (misal: Biru) vs Org (misal: Hijau).

### **E. Section 4: Projects (Showcase)**
* **Card Design:** Screenshot besar, Judul, Tech Stack Tags, Link Repo/Demo.
* **Hero Project:** Highlight skripsi/project terbesar di paling atas dengan ukuran card lebih besar (Feature Section).

### **F. Section 5: "Comparize" (The CV Battle Arena)**
* **Tagline:** "Think you can beat my CV? Let the AI decide."
* **Input:** Upload Button (PDF Only) atau Text Area (Paste CV).
* **Workflow:**
    1.  User upload CV.
    2.  System parsing text CV User.
    3.  System load text CV Kamu (dari server).
    4.  **AI Judge:** Mengirim kedua data ke Gemini API dengan *System Prompt* khusus.
    5.  **Output:** Score Card, Analisis Singkat, dan Pemenang (Selalu Kamu, kecuali CV user sangat tidak relevan maka di-reject).

### **G. Section 6: Contact & Guestbook**
* **Guestbook:** Form sederhana (Nama, Pesan) yang disimpan ke Supabase.
* **Socials:** Link LinkedIn, GitHub, Email, Instagram.

---

## 4. Technical Logic & Prompts

### **A. RAG Chatbot Logic (Home)**
1.  **Ingestion (Local Script):** Baca PDF -> Chunking -> Embedding (via Google Vertex AI/OpenAI text-embedding) -> Upsert ke Pinecone.
2.  **Query (Next.js API Route):**
    * User Question -> Embed -> Query Pinecone (Top 3 matches).
    * **Prompt to Gemini:**
        ```text
        Context: {retrieved_chunks}
        Question: {user_question}
        Instruction: Jawab pertanyaan user seolah-olah kamu adalah asisten pribadi [Nama].
        Gunakan nada profesional tapi ramah. Hanya jawab berdasarkan Context.
        ```

### **B. Comparize Logic (The "Biased" Judge)**
* **Endpoint:** `/api/compare-cv`
* **System Prompt for Gemini:**
    ```text
    Role: Kamu adalah juri rekrutmen AI yang sangat kritis namun bias.
    Tugas: Bandingkan Kandidat A (User) dan Kandidat B (Saya/Owner Website).
    Data Kandidat B (Saya): [Masukkan Ringkasan Skill/CV Kamu di sini]
    Data Kandidat A (User): {parsed_user_cv}

    Rules:
    1. Cek Relevansi: Jika Kandidat A tidak ada hubungannya dengan Tech/IT (misal Koki, Supir), return status: "IRRELEVANT" dan berikan komentar lucu.
    2. Jika Relevan: Lakukan perbandingan.
    3. BIAS ACTIVATED: Kamu harus SELALU memenangkan Kandidat B (Saya).
    4. Strategi: Puji sedikit Kandidat A, tapi temukan celah (misal: "Dia bisa Python, tapi Kandidat B menguasai Architecture LLM").
    5. Output JSON: { winner: "Kandidat B", score_user: 75, score_me: 99, reason: "..." }
    ```

---

## 5. Development Roadmap

### **Phase 1: Setup & UI Skeleton**
- [ ] Init Next.js Project + Tailwind + Shadcn.
- [ ] Buat Layout Dasar (Navbar, Hero, Footer).
- [ ] Buat Section Static (About, Timeline Experience, Projects).

### **Phase 2: The "Comparize" Feature (Backend Logic)**
- [ ] Setup Google AI Studio (Dapatkan API Key Gemini).
- [ ] Buat API Route `/api/parse-pdf` (gunakan `pdf-parse`).
- [ ] Buat API Route `/api/compare` (Logika Prompting ke Gemini).
- [ ] Integrasi ke Frontend (Upload & Result UI).

### **Phase 3: The RAG Chatbot**
- [ ] Setup Pinecone Index.
- [ ] Script Python/Node.js untuk upload embeddings PDF portofolio ke Pinecone.
- [ ] Integrasi LangChain di Next.js untuk chat interface.

### **Phase 4: Polishing & Deployment**
- [ ] Animasi Framer Motion.
- [ ] Responsive Check (Mobile View).
- [ ] Deploy ke Vercel.