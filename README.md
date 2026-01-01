# PE Assessment Platform - Project Structure

**Updated:** January 1, 2026  
**Status:** Ready for Development

---

## 📂 Folder Organization Guide

### **Root Level**
```
Rob's FMS Scorecard/
├── 1_ARCHITECTURE_DESIGN/      ← Technical specifications & design
├── 2_DATA_DEFINITIONS/         ← Skill definitions & data structures
├── 3_UI_WIREFRAMES/            ← User interface designs
├── 4_EXCEL_EXTRACTION/         ← Source data extraction & analysis
├── 5_SOURCE_DATA/              ← Original Excel files & screenshots
├── PROJECT_DOCS/               ← Project management & roadmap
├── .venv/                       ← Python virtual environment
└── README.md                    ← This file
```

---

## 📋 Detailed Folder Descriptions

### **1️⃣ ARCHITECTURE_DESIGN** 
**Purpose:** Technical specifications for developers

| File | Contents |
|------|----------|
| `TECHNICAL_DESIGN_DOCUMENT.md` | Complete system architecture, tech stack, database schema, API design |
| `DATABASING_AND_STORAGE_STRATEGY.md` | Data storage, autosave, offline sync, conflict resolution, backend architecture |
| `FORMULA_REFERENCE.md` | Excel formula breakdown, TypeScript equivalents, normative scoring logic |

**When to use:** Before coding the backend and API layer. Reference for database schema, API endpoint design, and business logic.

---

### **2️⃣ DATA_DEFINITIONS**
**Purpose:** Production-ready data structures and skill definitions

| File | Contents |
|------|----------|
| `skills.json` | Complete skill framework (1,852 lines, production-ready) |
| | - 11 Vic FMS skills with components |
| | - ASTS (Age-appropriate sprint standards) |
| | - Routine (Gymnastics with rubric) |
| | - Rock to Stand (binary) |
| | - All normative thresholds (ages 5-12) |

**When to use:** Database seeding, API responses, skill selection dropdowns. Import into Prisma seed file.

---

### **3️⃣ UI_WIREFRAMES**
**Purpose:** User interface designs and interaction flows

```
3_UI_WIREFRAMES/
├── 00_WIREFRAMES/
│   ├── 00_WIREFRAME_GUIDE.md         ← Design standards, colors, spacing
│   ├── 01_Dashboard.md               ← Main landing page (class selection)
│   ├── 02_Class_List.md              ← Class management + student import
│   ├── 03_Assessment_Entry.md        ← High-density data entry grid
│   ├── 04_Student_Profile.md         ← Student progress tracking
│   └── 05_Class_Dashboard.md         ← Multi-framework assessment matrix
```

**When to use:** Before designing React components. Reference for layouts, responsive behavior, user flows, and interaction patterns.

---

### **4️⃣ EXCEL_EXTRACTION**
**Purpose:** Scripts and extracted data from source Excel files

```
4_EXCEL_EXTRACTION/
├── extract_skills.py               ← Script to extract skill data from Excel
├── extract_vba.py                  ← Script to analyze formulas & VBA
├── build_skills_json.py            ← Script to generate skills.json
├── skill_extractions/              ← Extracted skill definitions (16 .md files)
│   ├── Run.md
│   ├── Vertical_Jump.md
│   ├── ... (14 more)
│   └── Class_Export.md
└── vba_extractions/                ← Formula analysis results
    ├── Tracker_2.0_Formulas_Detailed.txt
    ├── Tracker_2.0_vbaProject.bin.txt
    ├── Tracker_2.0_DataValidations.txt
    └── ... (metadata files)
```

**When to use:** Reference for understanding Excel data structure. Scripts can be re-run if source Excel files change.

**Key findings:**
- No VBA code found (100% formula-based)
- 4,724 formulas analyzed
- 1,028 complex formulas → 2-3 TypeScript functions
- Normative scoring patterns documented

---

### **5️⃣ SOURCE_DATA**
**Purpose:** Original Excel files and reference materials

```
5_SOURCE_DATA/
├── Rob's PE Movement Assessment Tracker 2.0.xlsm  ← Primary assessment tool
├── Rob's PE MAT Whole School Tracker.xlsm         ← School-wide analytics
├── MAT 2.0 Screenshots/                           ← UI reference
└── Whole School Tracker Screenshots/              ← UI reference
```

**When to use:** Reference for current system behavior and UI patterns. Keep these for rollback or comparison during development.

---

### **6️⃣ PROJECT_DOCS**
**Purpose:** Project management, roadmap, and status

| File | Contents |
|------|----------|
| `INDEX.md` | Master roadmap, file navigation, quick Q&A, development timeline |
| `PRODUCTION_READINESS.md` | Project summary, MVP checklist, success metrics, next steps |

**When to use:** Quick reference for project status, development phases, and team communication.

---

## 🚀 How to Use This Structure

### **For Backend Developers**
1. Start with `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md` (database schema)
2. Review `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md` (API design, autosave)
3. Reference `1_ARCHITECTURE_DESIGN/FORMULA_REFERENCE.md` (business logic)
4. Use `2_DATA_DEFINITIONS/skills.json` for database seeding

### **For Frontend Developers**
1. Review `3_UI_WIREFRAMES/00_WIREFRAME_GUIDE.md` (design standards)
2. Study `3_UI_WIREFRAMES/00_WIREFRAMES/01_Dashboard.md` through `05_Class_Dashboard.md`
3. Reference `2_DATA_DEFINITIONS/skills.json` for dropdown content
4. Follow autosave patterns from `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md`

### **For Project Managers**
1. Read `PROJECT_DOCS/INDEX.md` (project timeline + roadmap)
2. Review `PROJECT_DOCS/PRODUCTION_READINESS.md` (MVP scope + checklist)
3. Check `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md` section 6 for user workflows

### **For Data Analysis**
1. Check `4_EXCEL_EXTRACTION/skill_extractions/` for extracted data
2. Review `4_EXCEL_EXTRACTION/vba_extractions/` for formula analysis
3. Reference `1_ARCHITECTURE_DESIGN/FORMULA_REFERENCE.md` for logic breakdown

---

## 📊 Project Overview

### **What Are We Building?**
A modern web application to replace 2 Excel-based PE assessment tools:
- **PE Movement Assessment Tracker 2.0** → Individual class assessment
- **PE MAT Whole School Tracker** → School-wide analytics

### **Tech Stack (Phase 1 MVP)**
- **Frontend:** Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend:** Next.js API routes + Prisma ORM
- **Database:** PostgreSQL (cloud or self-hosted)
- **Offline:** IndexedDB + Service Workers (PWA)
- **State:** TanStack Query + Zustand

### **Core Features (Phase 1)**
✅ Teacher authentication + school setup  
✅ Class management (create, import students from CSV)  
✅ Assessment data entry (4 frameworks: Vic FMS, ASTS, Routine, Rock to Stand)  
✅ Class dashboard (multi-framework view)  
✅ Student profiles (progress tracking)  
✅ CSV/PDF export  
✅ Autosave & offline support  

### **Assessment Frameworks** (14 skills total)
- **Vic FMS:** 11 skills (Run, Jump, Leap, Dodge, Catch, Throw, Kick, Punt, Bounce, Two-Handed Strike, Forehand Strike)
- **ASTS:** Age-appropriate sprint standards (time-based)
- **Routine:** Gymnastics assessment (rubric-based)
- **Rock to Stand:** Binary (achieved/not achieved)

---

## 📈 Development Phases

### **Phase 1 - MVP (Weeks 1-2)**
- [ ] Prisma schema + PostgreSQL setup
- [ ] Authentication (NextAuth.js)
- [ ] Class & student management
- [ ] Assessment data entry (all 4 frameworks)
- [ ] Basic dashboard
- [ ] Autosave infrastructure

### **Phase 2 - Expansion (Weeks 3-4)**
- [ ] Student profiles + progress charts
- [ ] CSV/PDF export
- [ ] Historical data management
- [ ] Offline mode (PWA)
- [ ] Mobile optimization

### **Phase 3 - Polish (Week 5+)**
- [ ] Advanced analytics
- [ ] Real-time collaboration (WebSocket)
- [ ] Admin dashboard
- [ ] Performance optimization
- [ ] User testing & feedback

---

## 🔍 Key Files at a Glance

| File | Size | Purpose |
|------|------|---------|
| `TECHNICAL_DESIGN_DOCUMENT.md` | 25.9 KB | Complete architecture specification |
| `DATABASING_AND_STORAGE_STRATEGY.md` | 18+ KB | Database & sync strategy |
| `skills.json` | 36 KB | Production-ready skill definitions |
| `FORMULA_REFERENCE.md` | 9.4 KB | Excel formula breakdown |
| `extract_skills.py` | 2 KB | Extract skill data from Excel |
| `extract_vba.py` | 3 KB | Analyze Excel formulas |

---

## 📝 Next Steps

**Ready for Phase 1 Development:**

1. **Create Prisma Schema**
   - File: `prisma/schema.prisma`
   - Reference: TECHNICAL_DESIGN_DOCUMENT.md section 5
   - Use skills.json for seed data

2. **Setup Next.js Project**
   ```bash
   npx create-next-app@latest pe-assessment-app --typescript --tailwind
   npm install @prisma/client @tanstack/react-query zustand zod react-hook-form recharts
   npm install -D prisma
   ```

3. **Initialize Database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed  # Uses skills.json
   ```

4. **Start Building Components**
   - Reference: 3_UI_WIREFRAMES/ (all 5 pages)
   - Follow: DATABASING_AND_STORAGE_STRATEGY.md (autosave patterns)

---

## 👥 Team Notes

**Developers:** Keep bookmarks to TECHNICAL_DESIGN_DOCUMENT.md and DATABASING_AND_STORAGE_STRATEGY.md  
**Designers:** Reference 3_UI_WIREFRAMES/00_WIREFRAME_GUIDE.md for design standards  
**PMs:** Check PROJECT_DOCS/INDEX.md weekly for status updates  

---

## ❓ Quick Questions?

- **"What's the database schema?"** → 1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md (section 5)
- **"How does autosave work?"** → 1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md (section 2)
- **"What are the UI layouts?"** → 3_UI_WIREFRAMES/00_WIREFRAMES/ (all pages)
- **"What skills do we support?"** → 2_DATA_DEFINITIONS/skills.json
- **"What's the project timeline?"** → PROJECT_DOCS/INDEX.md (section 7)
- **"How do I extract new data?"** → 4_EXCEL_EXTRACTION/extract_skills.py (run with source Excel)

---

**Generated:** January 1, 2026  
**Version:** 1.0  
**Status:** Ready for Development
