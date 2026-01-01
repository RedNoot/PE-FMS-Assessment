# Quick Reference - Key Formulas & Data Structures

---

## 1. Normative Score Mapping Formula (Excel)

This formula appears **1,028 times** across all assessment sheets. Here's how it works:

### For Vic FMS Skills (e.g., Run)
```excel
=IFERROR(
   IF(H5 <= INDEX($B$36:$B$46, MATCH(G5, $A$36:$A$46, 0)), "Beginning",
      IF(H5 <= INDEX($C$36:$C$46, MATCH(G5, $A$36:$A$46, 0)), "Progressing",
         IF(H5 <= INDEX($D$36:$D$46, MATCH(G5, $A$36:$A$46, 0)), "Achieving",
            IF(H5 >= INDEX($E$36:$E$46, MATCH(G5, $A$36:$A$46, 0)), "Excelling", "Error")))),
   "Age Not Found")
```

**Breakdown:**
- `H5` = Student's total component score (SUM of columns B-F)
- `G5` = Student's age
- `$A$36:$A$46` = Age lookup column (5-12)
- `$B$36:$B$46` = Beginning thresholds by age
- `$C$36:$C$46` = Progressing thresholds by age
- `$D$36:$D$46` = Achieving thresholds by age
- `$E$36:$E$46` = Excelling thresholds by age

### For Gymnastics/Routine (Different Pattern)
```excel
=IFERROR(
   IF(G5 <= INDEX($B$44:$B$50, MATCH(F5, $A$44:$A$50, 0)), "Beginning",
      IF(AND(G5 >= INDEX($C$44:$C$50, MATCH(F5, $A$44:$A$50, 0)),
             G5 <= INDEX($D$44:$D$50, MATCH(F5, $A$44:$A$50, 0))), "Progressing",
         ...
```

**Why different?**
- Vic FMS: Simple comparison (`score <= threshold`)
- Gymnastics: Range check (`min <= score <= max`)

---

## 2. TypeScript Replacement (Web App)

Instead of 1,028 complex Excel formulas, use this simple function:

```typescript
interface NormativeThresholds {
  beginning: [number, number];    // [min, max]
  progressing: [number, number];
  achieving: [number, number];
  excelling: [number, number] | null;  // null = no max for Vic FMS
}

interface SkillDefinition {
  id: string;
  name: string;
  category: "Vic FMS" | "Time-Based" | "Rubric-Based" | "Binary";
  normativeThresholds: Record<string, NormativeThresholds>;  // age -> thresholds
}

function getNormativeLevel(
  score: number, 
  age: number, 
  skill: SkillDefinition
): string {
  const thresholds = skill.normativeThresholds[age];
  
  // For Vic FMS (simple comparison)
  if (score <= thresholds.beginning[1]) return "Beginning";
  if (score <= thresholds.progressing[1]) return "Progressing";
  if (score <= thresholds.achieving[1]) return "Achieving";
  return "Excelling";
}

function getNormativeLevel_Range(
  score: number, 
  age: number, 
  skill: SkillDefinition
): string {
  const t = skill.normativeThresholds[age];
  
  // For Gymnastics/Routine (range check)
  if (score <= t.beginning[1]) return "Beginning";
  if (score >= t.progressing[0] && score <= t.progressing[1]) return "Progressing";
  if (score >= t.achieving[0] && score <= t.achieving[1]) return "Achieving";
  if (score >= t.excelling[0]) return "Excelling";
  
  return "Error";
}
```

**Much cleaner than Excel!**

---

## 3. Data Validation Rules (Currently in Excel)

### Validation 1: Age Dropdown
- **Cells:** Column G (for each student row)
- **Type:** List
- **Values:** 5, 6, 7, 8, 9, 10, 11, 12
- **Web App:** Use `<select>` with age options

### Validation 2: Component Scores
- **Cells:** Columns B-F (for each component)
- **Type:** Whole Number
- **Range:** 0-1 (binary, but accepts 0-5 for flexibility)
- **Web App:** Use checkbox or number input with validation

---

## 4. Cross-Sheet Dependencies

```
CLASS LIST (Sheet)
├── Column A: Student names (e.g., A5:A31)
├── Column C: Student ages (e.g., C5:C31)
└── Column D: Class info

ASSESSMENT SHEETS (e.g., Run, Catch, etc.)
├── Row 1-2: Instructions, title, reference
├── Row 3: Headers (component names)
├── Row 4: Age expectations
├── Rows 5-30: Student data
│   ├── Column A: ='Class List'!A5 (student name)
│   ├── Columns B-F: Manual entry (component 1-5 scores)
│   ├── Column G: ='Class List'!$C5 (student age)
│   ├── Column H: =SUM(B5:F5) (total score)
│   └── Column I: [Complex formula] → normative level
├── Rows 36-46: Normative lookup table
│   ├── Column A: Ages (5-12)
│   ├── Column B: Beginning thresholds
│   ├── Column C: Progressing thresholds
│   ├── Column D: Achieving thresholds
│   └── Column E: Excelling thresholds
└── Rows 50+: Class analysis (COUNTIF aggregates)

WHOLE SCHOOL TRACKER (Different workbook)
├── Student progress over time
├── Uses exported data from Tracker 2.0
└── Not needed for Phase 1
```

---

## 5. Formula Counts by Complexity

| Sheet | Simple | Moderate | Complex | Purpose |
|-------|--------|----------|---------|---------|
| Run | 95 | 4 | 30 | Vic FMS - 5 components |
| Catch | 95 | 4 | 30 | Vic FMS - 5 components |
| Vertical Jump | 95 | 4 | 30 | Vic FMS - 5 components |
| Leap | 95 | 4 | 30 | Vic FMS - 5 components |
| Dodge | 95 | 4 | 30 | Vic FMS - 5 components |
| Overhand Throw | 95 | 4 | 30 | Vic FMS - 5 components |
| Kick | 95 | 4 | 30 | Vic FMS - 5 components |
| Punt | 95 | 4 | 30 | Vic FMS - 5 components |
| Bounce | 95 | 4 | 30 | Vic FMS - 5 components |
| Two-Handed Strike | 95 | 4 | 30 | Vic FMS - 5 components |
| Forehand Strike | 95 | 4 | 30 | Vic FMS - 5 components |
| Gymnastics | 93 | 4 | 30 | Routine - Range-based thresholds |
| Rock to Stand | 90 | 2 | 28 | Binary assessment |
| ASTS 2+3 | 84 | 40 | 0 | Time-based + MOQ calculation |
| **TOTAL** | **3,452** | **244** | **1,028** | — |

**Key insight:** All complex formulas are normative scoring (the 1,028). Simple formulas are just sums and counts.

---

## 6. Assessment Data Structure (From skills.json)

### Vic FMS Example (Run)
```json
{
  "id": "run",
  "name": "Run",
  "category": "Vic FMS",
  "type": "component",
  "components": [
    { "name": "Eyes focused forward", "ageExpectancy": "5y.o" },
    { "name": "Knees bend at lift", "ageExpectancy": "6y.o" },
    { "name": "Arms bend at elbow", "ageExpectancy": "7y.o" },
    { "name": "Contact ground with ball of foot", "ageExpectancy": "8y.o" },
    { "name": "Body leans slightly forward", "ageExpectancy": "9y.o" }
  ],
  "normativeThresholds": {
    "5": { "beginning": [0,0], "progressing": [0,0], "achieving": [1,1], "excelling": [2,5] },
    "6": { "beginning": [0,0], "progressing": [1,1], "achieving": [2,2], "excelling": [3,5] },
    "7": { "beginning": [1,1], "progressing": [2,2], "achieving": [3,3], "excelling": [4,5] },
    ...
  }
}
```

### ASTS Example
```json
{
  "id": "asts",
  "name": "ASTS (Age-Appropriate Sprint Time Standard)",
  "category": "Time-Based",
  "type": "time_input",
  "ageGroups": {
    "6-8": {
      "label": "Years 2-3 (Age 6-9)",
      "girls": {
        "50th_percentile": 29,
        "normativeThresholds": {
          "beginning": { "min": 0, "max": 65 },
          "progressing": { "min": 65, "max": 95 },
          "achieving": { "min": 95, "max": 120 },
          "excelling": { "min": 120, "max": 9999 }
        }
      },
      "boys": { ... }
    }
  }
}
```

### Routine Example
```json
{
  "id": "routine",
  "name": "Routine (Gymnastics)",
  "category": "Rubric-Based",
  "type": "rubric",
  "rubricScale": [
    { "score": 1, "level": "Not Demonstrated", "description": "..." },
    { "score": 2, "level": "Emerging", "description": "..." },
    { "score": 3, "level": "Developing", "description": "..." },
    { "score": 4, "level": "Demonstrated", "description": "..." }
  ],
  "components": [
    { "name": "Sequencing", "ageExpectancy": "9y.o" },
    { "name": "Creativity", "ageExpectancy": "9y.o" },
    { "name": "Execution", "ageExpectancy": "9y.o" },
    { "name": "Variety of Elements", "ageExpectancy": "9y.o" }
  ],
  "normativeThresholds": {
    "9": { "beginning": [0,5], "progressing": [6,9], "achieving": [10,13], "excelling": [14,16] },
    ...
  }
}
```

---

## 7. Database Seeding Strategy

```sql
-- From skills.json → skill_definitions table
INSERT INTO skill_definitions (id, name, category, type, definition_json)
SELECT id, name, category, type, JSON_BUILD_OBJECT(...)
FROM skills.json;

-- Create normative score lookup table
INSERT INTO normative_scores (skill_id, age, level, min_score, max_score)
FROM skills.json UNNEST normativeThresholds;

-- Create assessment elements (components)
INSERT INTO assessment_elements (skill_id, name, age_expectancy)
FROM skills.json UNNEST components;
```

**Note:** `skills.json` is production-ready for seeding. No manual entry needed.

---

## 8. Excel to Web App Translation Matrix

| Excel | Web App | Complexity |
|-------|---------|-----------|
| INDEX/MATCH normative lookup | Function call `getNormativeLevel()` | ✓ Simplify |
| Cross-sheet references (Class List) | Database JOIN | ✓ Clean |
| Data validation dropdowns | React `<select>` | ✓ Easy |
| Cell formula copy-paste | Server-side function | ✓ DRY |
| Conditional formatting colors | CSS classes (color-coded) | ✓ Visual |
| COUNTIF aggregates | SQL GROUP BY | ✓ Efficient |
| Cell comments | Database notes field | ✓ Better |

---

## Key Takeaway

**The Excel workbook is 100% formula-based with NO VBA.** This means:
- ✓ No compiled code to extract/translate
- ✓ All logic is in skills.json + simple functions
- ✓ Clean migration path to web app
- ✓ Formulas can be replaced with readable TypeScript

**Total work:** Replace 1,028 complex formulas with 2-3 simple functions = **~20 lines of clean code**.
