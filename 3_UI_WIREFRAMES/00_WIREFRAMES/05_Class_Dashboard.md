# Class Dashboard (Assessment Data Wall - Zoomable Matrix View)

**URL Path:** `/class/:classId/dashboard`  
**User Role:** Teacher / Administrator  
**Primary Goal:** View comprehensive class-level assessment matrix (data wall) at a glance with zoom capability; identify which students need support in which skills  
**Key Data:** Student normative scores per skill, auto-calculated summary columns (category totals), zoom in/out functionality, filtering and sorting  
**Interactions:** Zoom in/out, filter by skill, sort students, click student for full profile, click individual skill cell for details  

---

## Desktop Layout (1920×1080)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PE Assessment Platform                              [User: Mrs. Smith] [⚙️]   │
├──────────────────┬──────────────────────────────────────────────────────────┤
│ Navigation       │ Class Dashboard: Grade 3A (25 students)                  │
│ ═════════════    │ Vic FMS Framework | Term 4, 2025 | Updated: Today 2:15PM│
│                  │ [← Back to Dashboard] [← Back to Classes]                │
│ 📊 Dashboard     │                                                           │
│ 📚 Classes       │ ┌─ ZOOM CONTROLS & FILTERS ────────────────────────────┐│
│ 📋 Assessments   │ │ [🔍 Zoom Out] [🔍 Reset] [🔍 Zoom In]              ││
│ 📈 Reports       │ │ [Filter: ▼ All Skills ▼] [Sort: ▼ Name ▼]          ││
│ ⚙️ Settings      │ │                                                      ││
│ 👤 Profile       │ └───────────────────────────────────────────────────────┘│
│ 🚪 Logout        │                                                           │
│                  │ ┌─ STUDENT ASSESSMENT MATRIX - VIC FMS (ZOOMABLE) ────┐│
│ ────────────     │ │                                                       ││
│ 📱 Mobile App    │ │ [FROZEN]    │ [LOCOMOTOR SKILLS]    │ [scroll →]   ││
│ ❓ Help & FAQ    │ │ Student     │ Loco │ Run│VJump│Leap│Dodge│          ││
│ 📧 Contact       │ │─────────────┼──────┼───┼─────┼───┼─────┤             ││
│                  │ │ Alice J.    │  2   │ 3 │  2  │ 3 │  2  │            ││
│ ────────────     │ │ Bob S.      │  1   │ 1 │  1  │ 1 │  1  │            ││
│ Version: 1.0.2   │ │ Carol D.    │  3   │ 3 │  3  │ 3 │  3  │            ││
│                  │ │ Diana L.    │  2   │ 2 │  3  │ 2 │  2  │            ││
│                  │ │ Ethan B.    │  0   │ 0 │  0  │ 0 │  0  │            ││
│                  │ │ Fiona W.    │  2   │ 2 │  2  │ 2 │  2  │            ││
│                  │ │ George H.   │  3   │ 3 │  3  │ 3 │  3  │            ││
│                  │ │ Hannah W.   │  1   │ 1 │  2  │ 1 │  2  │            ││
│                  │ │ [+ 17 more students]                                  ││
│                  │ │                                                       ││
│                  │ │ ▶ Scroll right to see: Object Control Skills,        ││
│                  │ │   Summary Columns (Catch, Throw, Kick...) & Totals  ││
│                  │ │                                                       ││
│                  │ │ Color Legend: 0=■ Beg | 1=■ Prog | 2=■ Achie | 3=■ Exce ││
│                  │ │                                                       ││
│                  │ └───────────────────────────────────────────────────────┘│
│                  │                                                           │
│                  │ ┌─ ACTION BUTTONS ───────────────────────────────────────┐│
│                  │ │ [✓ Start New Assessment] [📊 Generate Report]        ││
│                  │ │ [↓ Export Data (CSV/Excel)]                          ││
│                  │ │                                                       ││
│                  │ └───────────────────────────────────────────────────────┘│
│                  │                                                           │
└──────────────────┴──────────────────────────────────────────────────────────┘
│ Footer: © 2025 PE Assessment Platform                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Desktop Zoom & Interaction Behavior:**
- **[🔍 Zoom Out]:** Reduce font/cell size to show more columns at once (all skills visible in one view)
- **[🔍 Reset]:** Return to default zoom level (shown above)
- **[🔍 Zoom In]:** Enlarge text/cells to 120-150% for easier reading (fewer columns visible, requires horizontal scroll)
- **Frozen Columns:** Student name always visible on left; summary columns (Loco, ObjCtrl, Total) remain frozen during horizontal scroll
- **Horizontal Scroll:** Navigate through skills while keeping student names visible
- **Data Display:** Each cell shows numeric normative score (0, 1, 2, 3) with color-coded background
- **Click Student Name:** Opens Student Profile modal/page with detailed history
- **Click Skill Cell:** Shows expanded detail for that skill/student (criteria breakdown for that assessment)

---

## Tablet Landscape Layout (1024×768)

```
┌──────────────────────────────────────────────────────────────┐
│ PE Assessment Platform                        [User] [⚙️]     │
├──────────┬──────────────────────────────────────────────────┤
│ [☰] Nav  │ Class Dashboard: Grade 3A                        │
│ Collapsed│ Vic FMS | Updated: Today, 2:15 PM | [← Back]     │
│          │                                                  │
│          │ ┌─ ZOOM & FILTERS ───────────────────────────┐  │
│          │ │ [🔍 Out] [🔍 Reset] [🔍 In]               ││  │
│          │ │ [Filter: ▼ All ▼] [Sort: ▼ Name ▼]        ││  │
│          │ └────────────────────────────────────────────┘  │
│          │                                                  │
│          │ ┌─ ASSESSMENT MATRIX (Simplified) ────────────┐ │
│          │ │ Name     │Loco│Run│VJump│Leap│Dodge│ObjCtrl││ │
│          │ │──────────┼───┼──┼────┼───┼────┼────┤       ││ │
│          │ │ Alice J. │ 2  │ 3│  2 │ 3 │  2 │  2 ││ │
│          │ │ Bob S.   │ 1  │ 1│  1 │ 1 │  1 │  0 ││ │
│          │ │ Carol D. │ 3  │ 3│  3 │ 3 │  3 │  3 ││ │
│          │ │ Diana L. │ 2  │ 2│  3 │ 2 │  2 │  2 ││ │
│          │ │ [+ 21 more] [→ scroll to Total]        ││ │
│          │ │                                         ││ │
│          │ └─────────────────────────────────────────┘ │
│          │                                              │
│          │ [Start Assessment] [Generate] [Export]       │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
│ © 2025 PE Assessment Platform                            │
└──────────────────────────────────────────────────────────┘
```

---

## Tablet Portrait Layout (768×1024)

```
┌──────────────────────────────────────┐
│ Class Dashboard [⚙️]                 │
├──────────────────────────────────────┤
│ [← Back] Grade 3A                    │
│ Vic FMS | Updated: Today, 2:15 PM    │
│                                      │
│ ┌─ ZOOM & FILTERS ──────────────────┐│
│ │ [🔍 Out] [Reset] [In]            ││
│ │ [Filter: ▼ All Skills ▼]         ││
│ │ [Sort: ▼ Name ▼]                 ││
│ └──────────────────────────────────┘│
│                                      │
│ ┌─ STUDENT CARDS ───────────────────┐│
│ │ Alice Johnson                     ││
│ │ Loco: 2 | Run: 3 | VJump: 2     ││
│ │ Leap: 3 | Dodge: 2               ││
│ │ ObjCtrl: 2 (showing top skills)  ││
│ │ [→ VIEW ALL SKILLS DETAIL]        ││
│ └──────────────────────────────────┘│
│                                      │
│ ┌─ STUDENT CARDS ───────────────────┐│
│ │ Bob Smith                         ││
│ │ Loco: 1 | Run: 1 | VJump: 1      ││
│ │ Leap: 1 | Dodge: 1                ││
│ │ ObjCtrl: 0                         ││
│ │ [→ VIEW ALL SKILLS DETAIL]        ││
│ └──────────────────────────────────┘│
│                                      │
│ ┌─ STUDENT CARDS ───────────────────┐│
│ │ Carol Davis                       ││
│ │ Loco: 3 | Run: 3 | VJump: 3      ││
│ │ Leap: 3 | Dodge: 3                ││
│ │ ObjCtrl: 3                         ││
│ │ [→ VIEW ALL SKILLS DETAIL]        ││
│ └──────────────────────────────────┘│
│ [+ 22 more students] (scroll)        │
│                                      │
├──────────────────────────────────────┤
│ [Start Assessment]                   │
├──────────────────────────────────────┤
│ [Generate Report]                    │
├──────────────────────────────────────┤
│ [Export]                             │
├──────────────────────────────────────┤
│ [📊] [📚] [📋] [📈]                  │
└──────────────────────────────────────┘
```

**Tablet Portrait Behavior:**
- **Card Layout:** Each student shown as a card with key data points
- **Summary Scores:** Show category summaries (Loco, ObjCtrl) for quick scan
- **[→ VIEW ALL SKILLS DETAIL]:** Clicking opens full expanded view showing all skills for that student
- **Filter/Sort Controls:** At top; helps manage large lists
- **Responsive:** Cards stack vertically; easy to swipe through students

---

## Mobile Layout (375×812)

```
┌─────────────────────────────────┐
│ Grade 3A Dashboard [⚙️]          │
├─────────────────────────────────┤
│ [← Back]                         │
│ Vic FMS | 25 students            │
│ Updated: Today, 2:15 PM          │
│                                  │
│ ┌─ FILTERS ────────────────────┐ │
│ │ [Filter: ▼ All ▼]           │ │
│ │ [Sort: ▼ Name ▼]            │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌─ STUDENT: ALICE JOHNSON ─────┐ │
│ │ Loco Score: 2 ■             │ │
│ │   Run: 3, VJump: 2, Leap: 3 │ │
│ │   Dodge: 2                   │ │
│ │ ObjCtrl Score: 2 ■          │ │
│ │   (6 skills assessed)        │ │
│ │ Overall: ACHIEVING           │ │
│ │ [→ VIEW FULL DETAIL]         │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌─ STUDENT: BOB SMITH ─────────┐ │
│ │ Loco Score: 1 ■              │ │
│ │   Run: 1, VJump: 1, Leap: 1  │ │
│ │   Dodge: 1                    │ │
│ │ ObjCtrl Score: 0 ■           │ │
│ │   (4 skills assessed)        │ │
│ │ Overall: BEGINNING           │ │
│ │ [→ VIEW FULL DETAIL]         │ │
│ └──────────────────────────────┘ │
│                                  │
│ ┌─ STUDENT: CAROL DAVIS ────────┐ │
│ │ Loco Score: 3 ■               │ │
│ │   Run: 3, VJump: 3, Leap: 3  │ │
│ │   Dodge: 3                    │ │
│ │ ObjCtrl Score: 3 ■           │ │
│ │   (7 skills assessed)        │ │
│ │ Overall: EXCELLING           │ │
│ │ [→ VIEW FULL DETAIL]         │ │
│ └──────────────────────────────┘ │
│ [+ 22 more] (scroll to load)      │
│                                  │
├─────────────────────────────────┤
│ [Start Assessment]               │
├─────────────────────────────────┤
│ [Generate Report]                │
├─────────────────────────────────┤
│ [Export]                         │
├─────────────────────────────────┤
│ [📊] [📚] [📋] [📈]              │
└─────────────────────────────────┘
```

**Mobile Card Behavior:**
- **Summary Cards:** Show category scores (Loco, ObjCtrl) prominently
- **[→ VIEW FULL DETAIL]:** Expands to show all skills (Run, Catch, Leap, etc.) with individual scores
- **Color Coding:** Numeric scores with color badges (0=Red, 1=Yellow, 2=Light Green, 3=Dark Green)
- **Scroll:** Load more students as user scrolls down (infinite scroll or pagination)

---

## Component Breakdown

### Header & Navigation
- **Class Name & Details:** "Grade 3A (25 students)" + "Vic FMS Framework"
- **Term/Period Info:** "Term 4, 2025"
- **Last Updated:** "Updated: Today, 2:15 PM" with timestamp
- **Breadcrumb:** "[← Back to Dashboard] [← Back to Classes]"
- **Responsive:**
  - Desktop: Full header with all details
  - Tablet: Condensed header, one-line layout
  - Mobile: Back button only, class name in title bar

### Zoom Controls
- **[🔍 Zoom Out]** → Reduce zoom level to show more columns (all skills visible at once)
- **[🔍 Reset]** → Return to default 100% zoom level
- **[🔍 Zoom In]** → Increase zoom level to 120-150% for easier reading (requires horizontal scroll)
- **Behavior:**
  - Desktop: Zoom affects matrix text size and cell dimensions
  - Tablet: Simplified zoom (maybe just Out/In, no Reset needed)
  - Mobile: Not applicable (card layout automatically optimized)

### Filter & Sort Controls
- **Filter Dropdown:** "[Filter: ▼ All Skills ▼]"
  - Options: "All Skills", then individual frameworks/skills (Run, Catch, Gymnastics, etc.)
  - Filters matrix to show only selected skill(s)
  - Useful to focus on one skill across all students
- **Sort Dropdown:** "[Sort: ▼ Name ▼]"
  - Options: "Name" (A-Z), "Score" (low to high), "Last Assessed" (most recent first), "Help Needed" (lowest scores first)
  - Sorts student rows

### Student Assessment Matrix (Main Data Wall)

#### Desktop/Tablet Landscape (Table Format):
- **Frozen Left Column:** Student Name (always visible)
- **Frozen Summary Columns:** Numeric scores with color backgrounds
  - Category Summary (e.g., "Loco Score"), then individual skills, then Total
  - Example: [Loco = 2] [Run = 3] [VJump = 2] [Leap = 3] [Dodge = 2] ... [ObjCtrl = 2] ... [Vic FMS Total = 2]
- **Horizontal Scrolling:** Reveals additional skills; frozen columns stay visible
- **Data Cells:**
  - Content: Single numeric value (0, 1, 2, or 3)
  - Background Color: Red (0), Yellow (1), Light Green (2), Dark Green (3)
  - Clickable: Opens detail modal showing criteria for that skill/student
- **Row Height:** Optimized for readability; adequate spacing
- **Max Visible:** Show 8-10 students before pagination or lazy load

#### Mobile (Card Format):
- **Card per Student:**
  - Student name (clickable → Student Profile)
  - Category scores (Loco, ObjCtrl) with color badges
  - Top 1-2 skills abbreviated
  - Overall achievement level
  - "[→ VIEW FULL DETAIL]" link to expand all skills
- **Expandable Detail:**
  - Click to expand shows all skills for that student
  - Full matrix-style view but for one student

### Color Legend
- **0 = Beginning:** ■ Red (#EF4444)
- **1 = Progressing:** ■ Yellow (#FBBF24)
- **2 = Achieving:** ■ Light Green (#86EFAC)
- **3 = Excelling:** ■ Dark Green (#22C55E)

### Action Buttons
- **[✓ Start New Assessment]** → Navigate to 03_Assessment_Entry.md to begin new assessment
- **[📊 Generate Report]** → Open report generator (pre-select this class)
- **[↓ Export Data (CSV/Excel)]** → Download matrix as CSV or Excel file

---

## Navigation Paths

From Class Dashboard, users can navigate to:

```
Class Dashboard
├── [Back] → 01_Dashboard.md or 02_Class_List.md
├── [Student Name] → 04_Student_Profile.md (shows full skill history)
├── [Skill Cell / View Full Detail] → Skill Detail modal (criteria for that skill)
├── [Start New Assessment] → 03_Assessment_Entry.md
├── [Generate Report] → 06_Reports.md (class pre-selected)
├── [Export Data] → Download handler (CSV/Excel)
└── Header:
    ├── Logo → 01_Dashboard.md
    ├── [⚙️] → 08_Settings.md
    └── [User Menu] → Profile, Logout
```

---

## Data Elements & Calculation

Refer to: **STUDENT_ASSESSMENT_MATRIX_DATASET.md** for complete data structure specifications

**Quick Reference:**
- **Individual Skill Score:** Numeric 0-4 (normative level)
- **Summary Column (e.g., Loco Score):** Average of constituent skills
  - Example: (Run + VJump + Leap + Dodge) / 4
  - Displayed as: Numeric, color-coded, frozen column
- **Total Score (e.g., Vic FMS Total):** Average of category summaries
  - Example: (Loco Score + ObjCtrl Score) / 2
  - Displayed as: Numeric, color-coded, frozen column

---

## Responsive Behavior

### Desktop (>1200px)
- Left sidebar visible
- Zoom controls active and functional
- Matrix as table with horizontal scroll
- Student name and summary columns frozen
- All details visible without clicking (hoverable tooltips for extra info)
- Large touch targets (60×40px minimum for cells)

### Tablet Landscape (768-1199px)
- Sidebar collapsible
- Simplified zoom (maybe just Out/In, remove Reset)
- Matrix table with fewer columns visible (scroll to reveal)
- Frozen columns work as on desktop
- Touch-friendly spacing (44×44px minimum)

### Tablet Portrait (600-767px)
- Sidebar hidden (hamburger menu)
- Zoom not applicable; card layout used instead
- Student cards: one per card, horizontally stacked in vertical column
- Each card shows category scores + top 1-2 skills
- Click [→ VIEW FULL DETAIL] to see all skills for one student
- Bottom navigation bar

### Mobile (<600px)
- Full-width single column
- Cards optimized for thumb interaction
- Large tap targets (44×44px minimum)
- Card layout with summary; expand for detail
- Infinite scroll or pagination
- Bottom tab navigation

---

## Notes & Considerations

### Performance
- **Large Classes:** If > 25 students, implement pagination (show 10 per page) or lazy loading (load more on scroll)
- **Zoom State:** Cache user's zoom preference in localStorage
- **Matrix Rendering:** Consider virtual scrolling if many columns to avoid lag

### Accessibility
- Color coding supplemented with numeric values (not color-only)
- All interactive elements keyboard accessible
- Proper ARIA labels for frozen columns, zoom buttons, filters
- Student names are links; clear focus states
- Zoom buttons have clear labels/tooltips

### Future Enhancements
- **Student Skill Detail Modal:** Click on a skill cell → see all criteria/elements for that skill/student
- **Filtering by Level:** Show only students at "Beginning" level, etc.
- **Multi-Framework View:** Tab to switch between Vic FMS, ASFC, etc.
- **Custom Column Selection:** Teachers choose which skills to display
- **Real-time Sync:** WebSocket updates when new assessment submitted
- **Video Evidence:** Attach assessment videos/photos per skill
- **Student Notes:** Add teacher notes per skill or per student
- **Trending Mini-Charts:** Small sparklines in cells showing progress over time

### Design Rationale
- **Data Wall Approach:** Mirrors Excel layout teachers know; easy scanning of many students × many skills
- **Zoomable Matrix:** Allows "big picture" view (zoom out) and "detailed analysis" view (zoom in)
- **Frozen Columns:** Excel-like behavior; student name and summary columns always visible during horizontal scroll
- **Numeric Scores:** Objective, color-coded for quick interpretation
- **Card Layout on Mobile:** Optimized UX for small screens; prevents table layout that's hard to read
- **Filter/Sort at Top:** Quick access to common operations without navigating

### Security & Permissions
- Only show data for students in this class
- Teachers can only view their own classes (unless admin)
- Only admins/principals can compare across classes (if implemented)

---

## Linked Wireframes

- [01_Dashboard.md](01_Dashboard.md) - Main dashboard
- [02_Class_List.md](02_Class_List.md) - Manage classes
- [03_Assessment_Entry.md](03_Assessment_Entry.md) - Data entry
- [04_Student_Profile.md](04_Student_Profile.md) - Individual student history
- [06_Reports.md](06_Reports.md) - Generate reports
- [08_Settings.md](08_Settings.md) - App settings
- [STUDENT_ASSESSMENT_MATRIX_DATASET.md](STUDENT_ASSESSMENT_MATRIX_DATASET.md) - Data structure reference
- [00_WIREFRAME_GUIDE.md](00_WIREFRAME_GUIDE.md) - Design guide
