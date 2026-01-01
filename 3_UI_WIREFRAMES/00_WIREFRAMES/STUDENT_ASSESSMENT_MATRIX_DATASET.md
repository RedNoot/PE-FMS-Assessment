# Student Assessment Matrix Dataset Specification

**Version:** 2.0  
**Date:** December 30, 2025 (Updated)  
**Purpose:** Define the structure of assessment data as displayed in the Student Assessment Matrix across wireframes  

---

## Overview

The Student Assessment Matrix is the core data structure that displays student achievement across multiple assessment frameworks. It includes:
- **Individual assessments** (single skills like "Run", "Catch", "ASTS", "Routine")
- **Summary columns** (aggregate scores calculated from groups of assessments)
- **Multi-framework display** (all frameworks shown together in stacked view with clear separators)

---

## Assessment Framework Structures

### 1. Victorian Fundamental Movement Skills (Vic FMS) - Primary Framework

**Total Skills:** 14 individual assessments organized into 2 categories

**Category 1: Locomotor Skills**
- Run
- Vertical Jump
- Leap
- Dodge

**Category 2: Object Control Skills**
- Catch
- Overhand Throw
- Kick
- Punt
- Bounce
- Two-Handed Strike
- Forehand Strike

**Summary Columns (Auto-calculated):**
- **Locomotor Score:** Average normative score of [Run, Vertical Jump, Leap, Dodge]
  - Range: 0-3 (0=Beginning, 1=Progressing, 2=Achieving, 3=Excelling)
  - Display: Color-coded badge, numeric average
- **Object Control Score:** Average normative score of [Catch, Overhand Throw, Kick, Punt, Bounce, Two-Handed Strike, Forehand Strike]
  - Range: 0-3
  - Display: Color-coded badge
- **Vic FMS Total:** Average of [Locomotor Score, Object Control Score]
  - Range: 0-3
  - Display: Color-coded badge (primary indicator for this framework)

**Matrix Display:**
```
Student Name | Run | V Jump | Leap | Dodge | [Loco] | Catch | O Throw | Kick | Punt | Bounce | 2-Hand | Forehand | [ObjCtrl] | [Vic FMS Total]
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Alice        |  3  |   2    |  3   |   3   |   3   |   2   |   3     |  2   |  2   |   3    |   2    |    2     |     2     |       2.5
```

---

### 2. Athletic Skills Test (ASTS) - Time-Based Assessment

**Total Skills:** 1 individual assessment (time-based)

**Assessment Details:**
- **ASTS:** Time-based assessment with normative comparison
  - Student completes timed athletic task
  - Time compared to normative matrix (by age and gender)
  - Produces single normative score (0=Beginning, 1=Progressing, 2=Achieving, 3=Excelling)
  - **Underlying logic (time thresholds, gender/age normatives) is hidden from display**
  - Display shows only the final normative score

**Summary Columns (Auto-calculated):**
- **Sequencing Summary:** Average of [ASTS, Routine]
  - Range: 0-3
  - Combines time-based athletic assessment with routine sequencing assessment
  - Display: Color-coded badge, numeric average

**Matrix Display:**
```
Student Name | ASTS | [Sequencing Summary]
──────────────────────────────────────────
Alice        |  2   |        2.0
```

---

### 3. Routine Assessment (Sequencing)

**Total Skills:** 1 individual assessment (with 4 criteria/rubric)

**Assessment Details:**
- **Routine:** Assessment of student's ability to sequence a movement routine
  - Evaluated using 4-point rubric with criteria (details added in future phases)
  - Produces single normative score (0=Beginning, 1=Progressing, 2=Achieving, 3=Excelling)
  - Combines elements of gymnastics, cheerleading, and dance sequencing
  - Rubric criteria can be expanded/configured per framework version

**Summary Columns (Auto-calculated):**
- **Sequencing Summary:** Average of [ASTS, Routine]
  - Range: 0-3
  - Display: Color-coded badge, numeric average

**Matrix Display:**
```
Student Name | Routine | [Sequencing Summary]
──────────────────────────────────────────────
Alice        |    2    |        2.0
```

---

### 4. Rock to Stand Assessment

**Total Skills:** 1 individual assessment (standalone)

**Assessment Details:**
- **Rock to Stand:** Standalone assessment
  - Produces single normative score (0=Beginning, 1=Progressing, 2=Achieving, 3=Excelling)
  - No category or summary columns

**Matrix Display:**
```
Student Name | Rock to Stand
──────────────────────────────
Alice        |      2
```

---

## Multi-Framework Matrix Display (Standard Format)

**IMPORTANT:** The matrix is ALWAYS displayed as a multi-framework view. Each framework is shown as a stacked section with clear visual separators using cell background shading to distinguish between frameworks.

### Display Structure:

Frameworks are arranged left-to-right in this order:
1. **Vic FMS Section** (Background: Light gray #F3F4F6)
   - Frozen: Student Name (always visible)
   - Locomotor Score [darker shade]
   - Individual skills: Run, V Jump, Leap, Dodge
   - Object Control Score [darker shade]
   - Individual skills: Catch, O Throw, Kick, Punt, Bounce, 2-Hand, Forehand
   - Vic FMS Total [darker shade]

2. **ASTS/Routine/Sequencing Section** (Background: Medium gray #E5E7EB)
   - ASTS (time-based score)
   - Routine (rubric-based score)
   - Sequencing Summary [darker shade]

3. **Rock to Stand Section** (Background: Light gray #F3F4F6)
   - Rock to Stand (standalone score)

### Example Multi-Framework Matrix Display:

```
┌──────────────┬────────────── VIC FMS (Light Gray) ──────────────────┬─ ASTS/ROUTINE (Medium Gray) ─┬─ R2S ─┐
│ Student Name │Loco│Run│VJump│Leap│Dodge│ObjCtrl│Catch│OThrow│Total│ASTS│Routine│Seq Sum│ R2S   │
├──────────────┼────┼──┼─────┼───┼────┼──────┼─────┼──────┼────┼───┼─────┼──────┼───────┤
│ Alice        │ 2  │3 │  2  │ 3 │ 2  │  2   │  2  │  2   │2.0 │ 2  │  2  │ 2.0  │  2    │
│ Bob          │ 1  │1 │  1  │ 1 │ 1  │  0   │  0  │  1   │0.5 │ 1  │  0  │ 0.5  │ N/A   │
│ Carol        │ 3  │3 │  3  │ 3 │ 3  │  3   │  3  │  3   │3.0 │ 3  │  3  │ 3.0  │  1    │
│ Diana        │ 2  │2 │  3  │ 2 │ 2  │  2   │  2  │  2   │2.0 │ 2  │  2  │ 2.0  │  3    │
└──────────────┴────┴──┴─────┴───┴────┴──────┴─────┴──────┴────┴───┴─────┴──────┴───────┘
```

### Visual Design Rules for Multi-Framework Matrix:

1. **Framework Sections:** Clear visual boundaries using:
   - **Alternating background shades:** Light gray, medium gray, light gray (creates clear sections)
   - **Vertical divider lines** between framework sections (solid border)
   - **Framework section headers** centered above columns for that section

2. **Summary Columns (Darker Shade):** Highlighted with darker background (e.g., #D1D5DB):
   - Within each framework, summary columns stand out
   - Examples: Locomotor Score, Object Control Score, Vic FMS Total, Sequencing Summary

3. **Frozen Column:** Student name always visible on left during horizontal scroll

4. **Responsive Behavior:**
   - **Desktop:** All sections visible; horizontal scroll reveals individual skills within sections
   - **Tablet Landscape:** Simplified view showing only category/framework summaries
   - **Tablet Portrait:** Card layout with collapsible framework sections
   - **Mobile:** Framework-specific cards with expandable detail

5. **Interactivity:**
   - Click framework section header to expand/collapse that section (for mobile/tablet)
   - Zoom controls apply to entire matrix (all frameworks zoom together)
   - Filter/Sort can be by framework or by individual skill

### Example: Zoomed Out View (All Frameworks in One Screen)

When zoomed out, user sees all framework totals:
```
│ Student Name │ Loco│...│VIC FMS Total│ ASTS│Routine│Seq Sum│ R2S │
├──────────────┼────┼───┼─────────────┼──────┼────┼────┼────┤
│ Alice        │ 2  │...│     2.0     │  2  │  2 │ 2.0 │ 2  │
│ Bob          │ 1  │...│     0.5     │  1  │  0 │ 0.5 │N/A │
```

### Example: Zoomed In View (Individual Skills Visible)

When zoomed in, user sees detailed skills within one or more frameworks:
```
│ Student Name │Loco│Run│VJump│Leap│Dodge│ObjCtrl│Catch│OThrow│Kick│Punt│Bounce│2-Hand│Forehand│VIC Total│...
├──────────────┼───┼──┼────┼───┼───┼─────┼─────┼──────┼───┼───┼──────┼────┼──────┼────┼
│ Alice        │ 2 │ 3│  2 │ 3 │ 2 │  2  │  2  │  2   │ 2 │ 2 │  3   │ 2  │  2   │ 2.0│...
```

---

## Data Calculation Rules

### Normative Score Averaging

**Rule:** When calculating summary scores, use numeric normative level (0, 1, 2, 3) and average across constituent assessments.

**Example (Vic FMS Locomotor):**
```
Student: Alice Johnson
Run: Achieving (2)
Vertical Jump: Progressing (1)
Leap: Achieving (2)
Dodge: Achieving (2)

Locomotor Score = (2 + 1 + 2 + 2) / 4 = 1.75 → Display as 1.8 or 2 (depending on rounding)
```

**Rounding:** 
- Display to 1 decimal place (1.75) OR round to nearest integer based on app preference
- Threshold: If score ≥ 2.5, rounds to 3 (Excelling)

**N/A Handling:**
- If student hasn't been assessed in a skill yet = "N/A" (gray badge)
- When calculating summary, **exclude N/A values from the average**
- Example: Assessed skills [2, 1, N/A, 3] = average (2+1+3)/3 = 2.0

---

## TypeScript Interface Reference

```typescript
interface AssessmentRecord {
  studentId: string;
  assessmentName: string; // "Run", "Catch", "ASTS", "Routine", etc.
  frameworkId: string; // "vic-fms", "asts", "routine", "rock-to-stand"
  normativeScore: 0 | 1 | 2 | 3 | null; // 0=Beginning, 1=Progressing, 2=Achieving, 3=Excelling, null=Not Assessed
  assessmentDate: string; // ISO 8601
}

interface SummaryScore {
  studentId: string;
  summaryName: string; // "Locomotor Score", "Vic FMS Total", "Sequencing Summary", etc.
  constituentAssessments: string[]; // ["Run", "Vertical Jump", "Leap", "Dodge"]
  calculatedNormativeScore: number; // 0-3 or decimal (e.g., 1.75)
  displayLevel: "Beginning" | "Progressing" | "Achieving" | "Excelling";
}

interface MatrixRow {
  studentId: string;
  studentName: string;
  classId: string;
  assessmentRecords: Record<string, AssessmentRecord>;
  summaryScores: Record<string, SummaryScore>;
  lastAssessmentDate: string;
}

interface AssessmentMatrix {
  classId: string;
  frameworks: string[]; // ["vic-fms", "asts", "routine", "rock-to-stand"]
  rows: MatrixRow[];
  columnDefinitions: ColumnDefinition[];
  frozenColumns: string[]; // ["studentName", "locomotorScore", "vicFmsTotal", ...]
}

interface ColumnDefinition {
  key: string; // "run", "locomotorScore", "vicFmsTotal", "asts", "routine", "sequencingSummary", "rockToStand"
  label: string; // "Run", "Locomotor Score", "Vic FMS Total", "ASTS", etc.
  frameworkId: string; // Which framework this column belongs to
  type: "assessment" | "summary" | "metadata";
  isSummary: boolean;
  isFrozen: boolean;
  backgroundColor: string; // Framework section background color
  darkerBackground?: boolean; // For summary columns within section
}
```

---

## Wireframe Integration

This data structure is displayed in:

1. **Class Dashboard (05_Class_Dashboard.md)** - Main multi-framework matrix view
2. **Assessment Entry (03_Assessment_Entry.md)** - During data entry (single skill focus)
3. **Student Profile (04_Student_Profile.md)** - Student history (one student × all skills × time)
4. **Reports (06_Reports.md)** - Export/printable matrix views

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2025-12-30 | Updated ASFC→ASTS (time-based), Gymnastics/Cheer/Dance→Routine (single rubric), added multi-framework stacked display with visual separators |
| 1.0 | 2025-12-30 | Initial specification |
