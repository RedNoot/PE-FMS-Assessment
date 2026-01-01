# Student Profile Wireframe

**Page:** 04_Student_Profile  
**Purpose:** Display individual student assessment history and progress over time  
**Key Interaction:** View skill progression graph → Download as CSV or PDF  
**Principle:** Clear progress visualization; minimal clutter; export-ready data  

---

## Page Navigation

**Access From:**
- Class Dashboard (click student name in matrix)
- Assessment Entry (quick view link on student row)
- Class List (student roster)

**Navigation To:**
- Class Dashboard (back button)
- Previous/Next student in class (arrow navigation)

---

## Desktop - Student Profile

### Layout Structure

**Header Section (Fixed):**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ◄ Back    Alice Johnson | Grade 5            [⬇ CSV]  [⬇ PDF]  [☰ Menu]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Student Info (Below Header):**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Student: Alice Johnson                                                       │
│ Grade: 5                                                                     │
│ Class: 5A                                                                    │
│ Last Assessment: 2025-12-22                                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Main Content Area - Two Sections:**

### Section 1: Progress Over Time Graph

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Skills Progress Over Time                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Score                                                                        │
│   3 ┌─────────────────────────────────────────────────────────────────────┐ │
│     │                                                                     │ │
│     │ Run ■    Catch ■    Vertical Jump ■    Leap ■    Dodge ■         │ │
│     │ Kick ■   Punt ■     Bounce ■          Strike ■   O. Throw ■      │ │
│     │                                                                     │ │
│   2 │  ○Run                                                               │ │
│     │  ○Catch                                                             │ │
│     │    ○V.Jump           ○Run                                           │ │
│     │      ○Kick      ○Catch                                              │ │
│     │          ○Punch                                                     │ │
│     │ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄                              │ │
│   1 │                                                                     │ │
│     │                                                                     │ │
│   0 └─────────────────────────────────────────────────────────────────────┘ │
│     Aug 2025     Sep 2025      Oct 2025      Nov 2025      Dec 2025        │
│                                                                              │
│ [Filter by Framework: All ▼]  [Zoom: All Time ▼]                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Section 2: Current Skills Summary Table

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Current Assessment Results (As of 2025-12-22)                                │
├────────────────────────────────────────┬──────────────┬──────────────────────┤
│ Skill                                  │ Score (0-3)  │ Level                │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ VIC FMS LOCOMOTOR SKILLS:              │              │                      │
│   Run                                  │ 3            │ Excelling ★★         │
│   Vertical Jump                        │ 2            │ Achieving ★          │
│   Leap                                 │ 3            │ Excelling ★★         │
│   Dodge                                │ 2            │ Achieving ★          │
│ Locomotor Score (avg)                  │ 2.5          │ Achieving ★          │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ VIC FMS OBJECT CONTROL SKILLS:         │              │                      │
│   Catch                                │ 2            │ Achieving ★          │
│   Overhand Throw                       │ 3            │ Excelling ★★         │
│   Kick                                 │ 2            │ Achieving ★          │
│   Punt                                 │ 1            │ Progressing ◐        │
│   Bounce                               │ 2            │ Achieving ★          │
│   Two-Handed Strike                    │ 2            │ Achieving ★          │
│   Forehand Strike                      │ 1            │ Progressing ◐        │
│ Object Control Score (avg)             │ 1.9          │ Progressing ◐        │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ VIC FMS TOTAL                          │ 2.2          │ Achieving ★          │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ ASTS (Athletic Skills Test)            │ 2            │ Achieving ★          │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ Routine (Sequencing)                   │ 3            │ Excelling ★★         │
│ Sequencing Summary (avg ASTS+Routine)  │ 2.5          │ Achieving ★          │
├────────────────────────────────────────┼──────────────┼──────────────────────┤
│ Rock to Stand                          │ Completed    │ ✓                    │
└────────────────────────────────────────┴──────────────┴──────────────────────┘
```

---

## Tablet Landscape - Student Profile

**Screen Size:** ~1024px width

```
┌────────────────────────────────────────────────────────────────┐
│ ◄ Alice Johnson | Grade 5                [⬇ CSV] [⬇ PDF]      │
├────────────────────────────────────────────────────────────────┤
│ Class: 5A    |    Last Assessment: 2025-12-22                 │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ Skills Progress Over Time                               │  │
│ ├──────────────────────────────────────────────────────────┤  │
│ │                                                          │  │
│ │ Score                                                   │  │
│ │   3 ┌──────────────────────────────────────────────────┐│  │
│ │     │ ○Run  ○Catch  ○V.Jump  ○Leap  ○Dodge          ││  │
│ │   2 │ ○Kick ○Punt   ○Bounce  ○Strike ○O.Throw       ││  │
│ │     │                                                  ││  │
│ │   1 │                                                  ││  │
│ │     │ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄      ││  │
│ │   0 └──────────────────────────────────────────────────┘│  │
│ │     Aug 2025   Oct 2025   Dec 2025                      │  │
│ │                                                          │  │
│ │ [Filter: All ▼]  [Zoom: All Time ▼]                   │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
│ Current Results (2025-12-22):                                │
│ ┌──────────────────┬──────────┬─────────────────┐            │
│ │ Skill            │ Score    │ Level           │            │
│ ├──────────────────┼──────────┼─────────────────┤            │
│ │ Run              │ 3        │ Excelling ★★    │            │
│ │ Catch            │ 2        │ Achieving ★     │            │
│ │ V. Jump          │ 2        │ Achieving ★     │            │
│ │ Leap             │ 3        │ Excelling ★★    │            │
│ │ [Scroll down...]  │          │                 │            │
│ └──────────────────┴──────────┴─────────────────┘            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Tablet Portrait - Student Profile

**Screen Size:** ~600px width

```
┌──────────────────────────────────────┐
│ ◄ Alice Johnson              [☰]    │
├──────────────────────────────────────┤
│ Grade: 5  |  Class: 5A               │
│ Last Assessment: 2025-12-22          │
│                                      │
│ [⬇ CSV]  [⬇ PDF]                    │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Skills Progress Over Time            │
│ ┌──────────────────────────────────┐ │
│ │ Score                            │ │
│ │   3 ┌─────────────────────────┐  │ │
│ │     │                         │  │ │
│ │   2 │ ○ Various skills        │  │ │
│ │     │                         │  │ │
│ │   1 │ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │  │ │
│ │     │                         │  │ │
│ │   0 └─────────────────────────┘  │ │
│ │     Aug   Oct   Dec              │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [Filter: All ▼]  [Zoom: All Time ▼]│
│                                      │
├──────────────────────────────────────┤
│                                      │
│ Current Results (2025-12-22)         │
│                                      │
│ Run                            ★★    │
│ Score: 3  |  Excelling             │
│                                      │
│ Catch                          ★     │
│ Score: 2  |  Achieving             │
│                                      │
│ Vertical Jump                  ★     │
│ Score: 2  |  Achieving             │
│                                      │
│ Leap                           ★★    │
│ Score: 3  |  Excelling             │
│                                      │
│ Dodge                          ★     │
│ Score: 2  |  Achieving             │
│                                      │
│ [Scroll for more...]                │
│                                      │
└──────────────────────────────────────┘
```

---

## Mobile - Student Profile

**Screen Size:** ~375px width

```
┌──────────────────────────────┐
│ ◄ Alice Johnson         [☰]  │
├──────────────────────────────┤
│ Grade 5  |  Class 5A         │
│ Last: 2025-12-22            │
│                              │
│ [⬇ CSV]  [⬇ PDF]             │
│                              │
├──────────────────────────────┤
│                              │
│ Progress Over Time           │
│ ┌──────────────────────────┐ │
│ │ Score                    │ │
│ │   3 ┌──────────────────┐ │ │
│ │     │                  │ │ │
│ │   2 │ ○ Skills shown  │ │ │
│ │     │                  │ │ │
│ │   1 │ ┄┄┄┄┄┄┄┄┄┄┄┄┄ │ │ │
│ │     │                  │ │ │
│ │   0 └──────────────────┘ │ │
│ │     Aug  Oct  Dec        │ │
│ └──────────────────────────┘ │
│                              │
│ [Filter: All ▼]             │
│ [Zoom: All Time ▼]          │
│                              │
├──────────────────────────────┤
│                              │
│ Current Results              │
│                              │
│ Run                     ★★   │
│ 3 - Excelling              │
│                              │
│ Catch                   ★    │
│ 2 - Achieving              │
│                              │
│ Vertical Jump           ★    │
│ 2 - Achieving              │
│                              │
│ Leap                    ★★   │
│ 3 - Excelling              │
│                              │
│ Dodge                   ★    │
│ 2 - Achieving              │
│                              │
│ [Scroll for more...]        │
│                              │
└──────────────────────────────┘
```

---

## Export Formats

### CSV Export Example

```
Student Profile Export
Generated: 2025-12-22

Student Name: Alice Johnson
Grade: 5
Class: 5A

Assessment History:

Date,Skill,Score,Level
2025-12-22,Run,3,Excelling
2025-12-22,Vertical Jump,2,Achieving
2025-12-22,Leap,3,Excelling
2025-12-22,Dodge,2,Achieving
2025-12-22,Catch,2,Achieving
2025-12-22,Overhand Throw,3,Excelling
2025-12-22,Kick,2,Achieving
2025-12-22,Punt,1,Progressing
2025-12-22,Bounce,2,Achieving
2025-12-22,Two-Handed Strike,2,Achieving
2025-12-22,Forehand Strike,1,Progressing
2025-12-22,ASTS,2,Achieving
2025-12-22,Routine,3,Excelling
2025-12-22,Rock to Stand,Completed,✓

Skill Summaries:
Locomotor Score,2.5,Achieving
Object Control Score,1.9,Progressing
VIC FMS Total,2.2,Achieving
Sequencing Summary,2.5,Achieving
```

### PDF Export

**Header:**
- Student Name
- Grade, Class
- Report Date

**Content:**
1. Progress Over Time Graph (full-width, printable)
2. Current Assessment Results Table
3. Summary Statistics (if space allows)

**Footer:**
- Report generated date
- School name
- Page number (if multi-page)

---

## Progress Graph Features

### Filter Options

**By Framework:**
- All (default)
- VIC FMS Locomotor Skills
- VIC FMS Object Control Skills
- ASTS (Athletic Skills Test)
- Routine (Sequencing)
- Rock to Stand

### Zoom Options

**Time Range:**
- All Time (default) - Show all assessment history
- Last 3 Months
- Last 6 Months
- Last Year
- Custom Date Range (calendar picker)

### Graph Interaction

- **Hover** on data point → Show skill name, date, score
- **Click legend** → Toggle skill visibility on/off
- **Responsive** → Adapts to screen width; legend moves to bottom on mobile
- **Auto-scale** → Y-axis scales 0-3, with 0.5 increments

---

## Skills Summary Table - Data Details

### Columns:
1. **Skill** - Assessment name (Run, Catch, ASTS, etc.)
2. **Score (0-3)** - Numeric normative value
3. **Level** - Text label with visual indicator

### Visual Indicators:
- ○ Beginning (0) - White circle
- ◐ Progressing (1) - Half-filled circle
- ★ Achieving (2) - Star filled
- ★★ Excelling (3) - Double star filled
- ✓ Completed - Checkmark (for Rock to Stand)

### Organization:
- Group by framework (VIC FMS Locomotor, VIC FMS Object Control, etc.)
- Summary rows for aggregate scores (Locomotor Score, VIC FMS Total, Sequencing Summary)
- Separated sections with clear headers
- Sortable by skill name or score (click column header)

---

## Data Model - Student Assessment Record

```json
{
  "studentId": "sid_001",
  "firstName": "Alice",
  "lastName": "Johnson",
  "grade": "5",
  "classId": "cls_2025_5a",
  "className": "5A",
  "assessmentHistory": [
    {
      "assessmentId": "assess_20251222_001",
      "assessmentDate": "2025-12-22",
      "skillId": "run",
      "skillName": "Run",
      "frameworkId": "vic-fms",
      "normativeScore": 3,
      "level": "Excelling"
    },
    {
      "assessmentId": "assess_20251215_001",
      "assessmentDate": "2025-12-15",
      "skillId": "run",
      "skillName": "Run",
      "frameworkId": "vic-fms",
      "normativeScore": 2,
      "level": "Achieving"
    }
  ],
  "summaryScores": [
    {
      "summaryId": "summary_locomotor",
      "summaryName": "Locomotor Score",
      "assessmentDate": "2025-12-22",
      "calculatedScore": 2.5,
      "level": "Achieving"
    }
  ],
  "lastAssessmentDate": "2025-12-22"
}
```

---

## Wireframe Integration

**Links To/From:**
- **From:** Class Dashboard (student name click), Assessment Entry (quick view)
- **To:** Class Dashboard (back button), Previous/Next student (navigation arrows)
- **Export:** CSV file download, PDF report download

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-31 | Initial specification - progress graph, current skills table, CSV/PDF export, responsive layouts |
