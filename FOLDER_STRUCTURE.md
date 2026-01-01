# Project Structure Map

```
Rob's FMS Scorecard/
│
├── 📘 README.md                          ← START HERE: Complete guide
│
├── 📁 1_ARCHITECTURE_DESIGN/             ← For Developers & Architects
│   ├── TECHNICAL_DESIGN_DOCUMENT.md      ← Full system design (DB schema, tech stack)
│   ├── DATABASING_AND_STORAGE_STRATEGY.md ← Data flow, autosave, offline, API design
│   └── FORMULA_REFERENCE.md              ← Excel formulas → TypeScript logic
│
├── 📁 2_DATA_DEFINITIONS/                ← For Backend & Seed Data
│   └── skills.json                       ← Production-ready skill definitions (1,852 lines)
│
├── 📁 3_UI_WIREFRAMES/                   ← For Frontend & Designers
│   └── 00_WIREFRAMES/
│       ├── 00_WIREFRAME_GUIDE.md         ← Design standards & conventions
│       ├── 01_Dashboard.md               ← Main landing (class selection)
│       ├── 02_Class_List.md              ← Class mgmt + student import
│       ├── 03_Assessment_Entry.md        ← Data entry grid (4 frameworks)
│       ├── 04_Student_Profile.md         ← Student progress & export
│       └── 05_Class_Dashboard.md         ← Multi-framework view
│
├── 📁 4_EXCEL_EXTRACTION/                ← For Data Analysis & Reference
│   ├── extract_skills.py                 ← Python: Extract skill data
│   ├── extract_vba.py                    ← Python: Analyze formulas
│   ├── build_skills_json.py              ← Python: Generate skills.json
│   ├── skill_extractions/                ← Extracted skill data (16 files)
│   │   ├── Run.md, Vertical_Jump.md, ... └─ (one per assessment)
│   └── vba_extractions/                  ← Formula analysis results
│       ├── Tracker_2.0_Formulas_Detailed.txt (4,724 formulas)
│       ├── Tracker_2.0_DataValidations.txt
│       └── ... (metadata files)
│
├── 📁 5_SOURCE_DATA/                     ← Original Files & Reference
│   ├── Rob's PE Movement Assessment Tracker 2.0.xlsm
│   ├── Rob's PE MAT Whole School Tracker.xlsm
│   ├── MAT 2.0 Screenshots/
│   └── Whole School Tracker Screenshots/
│
├── 📁 PROJECT_DOCS/                      ← Project Management
│   ├── INDEX.md                          ← Master roadmap & file index
│   └── PRODUCTION_READINESS.md           ← MVP checklist & success metrics
│
├── 📁 .venv/                             ← Python virtual environment
│
└── 📁 [Future]                           
    ├── app/                              ← Next.js application (Phase 1)
    ├── prisma/                           ← Database schema & migrations
    ├── tests/                            ← Unit & integration tests
    └── public/                           ← Static assets
```

---

## 🎯 Quick Access Guide

### **I'm Starting Development**
1. Open `README.md` (this folder)
2. Read `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md` (20 min)
3. Skim `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md` (10 min)
4. Review `2_DATA_DEFINITIONS/skills.json` (5 min)

### **I'm Building the Database**
1. `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md` (section 5) → Copy schema
2. `2_DATA_DEFINITIONS/skills.json` → Seed data
3. `1_ARCHITECTURE_DESIGN/FORMULA_REFERENCE.md` → Normative scoring logic

### **I'm Building UI Components**
1. `3_UI_WIREFRAMES/00_WIREFRAME_GUIDE.md` → Design standards
2. `3_UI_WIREFRAMES/00_WIREFRAMES/01_Dashboard.md` → Layout reference
3. `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md` → Autosave patterns

### **I'm Checking Progress**
1. `PROJECT_DOCS/INDEX.md` → Timeline & status
2. `PROJECT_DOCS/PRODUCTION_READINESS.md` → MVP checklist

### **I Need to Understand the Current System**
1. `4_EXCEL_EXTRACTION/skill_extractions/` → See what data is in each sheet
2. `4_EXCEL_EXTRACTION/vba_extractions/` → View formulas & validation rules
3. `1_ARCHITECTURE_DESIGN/FORMULA_REFERENCE.md` → Understand the logic

---

## 📊 File Organization Principles

**Numbered Folders (1-5):**
- Sequential order: Read in order from 1 → 5
- 1 = Architecture (start here)
- 2 = Data (what to build)
- 3 = UI (how it looks)
- 4 = Extraction (historical data)
- 5 = Source (original files)

**PROJECT_DOCS:**
- Separate from development folders
- For project managers & status tracking
- References other folders but doesn't block development

**Naming Convention:**
- Descriptive names (not cryptic abbreviations)
- Numbered files for sequence (00_, 01_, etc.)
- Underscores for multi-word names
- Extension shows type (.md, .py, .json)

---

## ✨ Benefits of This Structure

✅ **Clear Purpose:** Each folder has one clear job  
✅ **Easy Navigation:** Open README.md to find anything  
✅ **Scalable:** Easy to add new files without confusion  
✅ **Team-Friendly:** New team members get oriented fast  
✅ **Separation of Concerns:** Development code will be separate from docs  
✅ **Version Control Ready:** Organized for git commits  

---

**Last Updated:** January 1, 2026  
**Ready for:** Phase 1 Development
