# VBA & Formula Analysis - PE Assessment Tracker

**Generated:** 2026-01-01  
**Extracted from:** Rob's PE Movement Assessment Tracker 2.0.xlsm

---

## Executive Summary

The Excel workbook uses **NO VBA/Macro code** - it's 100% formulas and data validation. The entire logic is driven by:
1. **Nested IF/INDEX/MATCH formulas** for normative score mapping
2. **Data validation dropdowns** for student selection
3. **Cross-sheet references** (Class List → Assessment Sheets → Whole School Tracker)

**Total Formulas Extracted:** 4,724  
**VBA/Macro Code:** None found (✓ good for migration - no VBA dependency)

---

## Key Formula Patterns

### 1. **Normative Score Lookup (Vic FMS Skills)**

**Pattern:** INDEX/MATCH with nested IF statements

**Example (Run sheet, cell I5):**
```excel
=IFERROR(
   IF(H5 <= INDEX($B$36:$B$46, MATCH(G5, $A$36:$A$46, 0)), "Beginning",
      IF(H5 <= INDEX($C$36:$C$46, MATCH(G5, $A$36:$A$46, 0)), "Progressing",
         IF(H5 <= INDEX($D$36:$D$46, MATCH(G5, $A$36:$A$46, 0)), "Achieving",
            IF(H5 >= INDEX($E$36:$E$46, MATCH(G5, $A$36:$A$46, 0)), "Excelling", "Error")))),
   "Age Not Found")
```

**What it does:**
1. Takes student's component score in H5
2. Looks up student's age in G5
3. Uses MATCH to find age row in $A$36:$A$46
4. Uses INDEX to get corresponding thresholds from columns B, C, D, E (for Beginning, Progressing, Achieving, Excelling)
5. Maps score to nearest normative level
6. IFERROR handles "Age Not Found" cases

**Complexity:** Complex (350+ chars per formula)  
**Repetition:** Copied down for each student row (27 students × 11 Vic FMS skills ≈ 297 similar formulas)

---

### 2. **Gymnastics/Routine Scoring (Different Pattern)**

**Pattern:** Uses AND() for range checks instead of simple <= comparisons

**Example (Gymnastics sheet, cell H5):**
```excel
=IFERROR(
   IF(G5 <= INDEX($B$44:$B$50, MATCH(F5, $A$44:$A$50, 0)), "Beginning",
      IF(AND(G5 >= INDEX($C$44:$C$50, MATCH(F5, $A$44:$A$50, 0)),
             G5 <= INDEX($D$44:$D$50, MATCH(F5, $A$44:$A$50, 0))), "Progressing",
         IF(AND(G5 >= INDEX($E$44:$E$50, MATCH(F5, $A$44:$A$50, 0)),
                G5 <= INDEX($F$44:$F$50, MATCH(F5, $A$44:$A$50, 0))), "Achieving",
            IF(G5 >= INDEX($G$44:$G$50, MATCH(F5, $A$44:$A$50, 0)), "Excelling",
               "Error")))),
   "Age Not Found")
```

**Why different:**
- Run: 0-5 score → simpler comparison (if score ≤ threshold)
- Gymnastics: 1-20 score → needs range checks (if score BETWEEN min AND max)

**Complexity:** Very Complex (510+ chars per formula)

---

### 3. **Summary Calculations (ASTS - Time-Based)**

**Pattern:** Simple calculations and COUNTIF aggregation

**Example (ASTS sheet, E5):**
```excel
=(D5/C5)*100
```

Calculates "Motor quotient" = (50th percentile time / student time) × 100

**Example (ASTS sheet, F51 - Class Summary):**
```excel
=COUNTIF(F$5:F$48, "Excelling")
```

Counts how many students scored "Excelling" in this assessment

**Complexity:** Simple (30-40 chars per formula)

---

## Formula Distribution by Sheet

| Sheet | Total | Simple | Moderate | Complex | Key Pattern |
|-------|-------|--------|----------|---------|------------|
| ASTS 2+3 | 124 | 84 | 40 | 0 | Time calculations + COUNTIF |
| Bounce | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Catch | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Dodge | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Forehand Strike | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Gymnastics | 127 | 93 | 4 | 30 | INDEX/MATCH/IF with AND ranges |
| Kick | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Leap | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Overhand Throw | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Punt | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Rock to Stand | 120 | 90 | 2 | 28 | INDEX/MATCH/IF normative lookups |
| Run | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Two-Handed Strike | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| Vertical Jump | 129 | 95 | 4 | 30 | INDEX/MATCH/IF normative lookups |
| **TOTAL** | **4,724** | **3,452** | **244** | **1,028** | — |

---

## Data Validation Rules

### Dropdown Validations (2 per skill sheet)

**Validation 1: Grade/Age Selector**
- **Applies to:** Column G (1 cell per student row)
- **Type:** List/Dropdown
- **Purpose:** Select student age (5, 6, 7, 8, 9, 10, 11, 12)
- **Used by:** Normative lookup formulas to find correct thresholds

**Validation 2: Skill Component Entry**
- **Applies to:** Columns B-F (5 cells per student, 27 students = 135 cells per sheet)
- **Type:** Whole Number / Decimal
- **Constraint:** 0 or 1 (binary, but could accept 0-5 for scoring)
- **Purpose:** Prevent invalid entries during assessment data entry

---

## Data Flow & Dependencies

```
Class List (Sheet)
    ↓ (Student names, ages)
    ↓
Assessment Sheets (Run, Catch, Vertical Jump, etc.)
    ├─ Column A: Pull student names from Class List
    ├─ Column G: Pull student ages from Class List
    ├─ Columns B-F: Manual entry (component scores)
    ├─ Column H: SUM(B:F) = Total component score
    ├─ Column I: INDEX/MATCH/IF formula → Normative level
    │
    └─ Normative Lookup Table (Rows 36-46)
       ├─ Column A: Ages 5-12
       ├─ Column B: Beginning thresholds
       ├─ Column C: Progressing thresholds
       ├─ Column D: Achieving thresholds
       └─ Column E: Excelling thresholds

Class Analysis Section
    ├─ COUNTIF formulas for summary stats
    └─ Charts based on summary tables
```

---

## Cross-Sheet References

**Pull from Class List:**
- A5:A31 → Student names
- C5:C31 → Student ages

**Formula Pattern:**
```excel
=Class List!A5        (Pull name)
='Class List'!$C5     (Pull age - with $ for consistency)
```

**Why the quotes?** Excel requires sheet names with spaces to be enclosed in single quotes.

---

## Complexity Analysis

### Simple Formulas (73%)
- **Purpose:** Data calculations, sums, counts
- **Examples:** `=SUM(B5:F5)`, `=(D5/C5)*100`, `=COUNTIF(...)`
- **Maintainability:** ✓ Easy to understand

### Moderate Formulas (5%)
- **Purpose:** Conditional aggregation
- **Examples:** `=COUNTIF(F$5:F$48, "Excelling")`
- **Maintainability:** ✓ Straightforward with formula bar

### Complex Formulas (22%)
- **Purpose:** Normative score mapping (INDEX/MATCH/IF nesting)
- **Examples:** 350+ character formulas with 3-4 levels of nesting
- **Maintainability:** ✗ Difficult to debug, error-prone to edit
- **Repetition:** Heavy copy-paste (same formula in 27-30 rows per sheet)

---

## Key Observations for Web App Migration

1. **No VBA = No code extraction needed** ✓
   - All logic is formula-based → can be replicated in JavaScript/Python

2. **Normative scoring is hardcoded in lookup tables**
   - Currently: $A$36:$E$46 ranges per skill sheet
   - Migration: Should move to database (skills_json already has these!)

3. **Data validation is lightweight**
   - No complex conditional validation
   - Web app can use simple dropdown/number input constraints

4. **Heavy formula repetition**
   - Same normative formula copied 27-30 times per sheet
   - In web app: Calculate once per submission, not per-row

5. **Cross-sheet references are simple**
   - Pull from Class List only
   - Web app: Join Class and Assessment tables

6. **Calculation order matters**
   - Student age → Normative lookup → Status mapping
   - Web app: Execute in sequence with clear logic flow

---

## Recommendation for Development

The `skills.json` file you already generated contains all the data needed:
- ✓ Component definitions
- ✓ Age-based normative thresholds
- ✓ Rubric scales

**Next step:** In the web app backend, replace these complex Excel formulas with simple TypeScript functions:

```typescript
function getNormativeLevel(score: number, age: number, skill: SkillDefinition): string {
  const thresholds = skill.normativeThresholds[age];
  if (score <= thresholds.beginning[1]) return "Beginning";
  if (score <= thresholds.progressing[1]) return "Progressing";
  if (score <= thresholds.achieving[1]) return "Achieving";
  return "Excelling";
}
```

Much cleaner than Excel's nested IFs!

---

## Files Generated

- `Tracker_2.0_Formulas_Detailed.txt` (132.7 KB) - Full formula listing with complexity analysis
- `Tracker_2.0_vbaProject.bin.txt` (21.4 KB) - Raw VBA project metadata (no executable code)
- `Tracker_2.0_sheet1.xml.xml` (78.4 KB) - XML metadata
- `Tracker_2.0_table1.xml.xml` (3 KB) - Table structure metadata
