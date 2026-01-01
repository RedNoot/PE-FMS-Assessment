# Assessment Entry Wireframe

**Page:** 03_Assessment_Entry  
**Purpose:** Core data entry interface for assessing individual movement skills  
**Key Interaction:** Grade selection → Skill selection → Component-based assessment for multiple students  
**Principle:** High-density component checklist; multiple students visible without scrolling when possible; vertical scroll for additional students  

---

## Page Navigation

**Access From:**
- Dashboard [Start Assessment] button
- Class Dashboard [+ Assessment] button
- Top navigation (if side menu visible)

**Navigation To:**
- Dashboard (Cancel or Finish Assessment)
- Class Dashboard (Save & View Results)
- Student Profile (quick view of student history - future)

---

## Desktop - Main Assessment Entry

### Layout Structure

**Header Section (Fixed, Always Visible):**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ◄ Back    Assessment Entry: Grade 5 | PE Movement Skills                        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Control Panel (Fixed Below Header, Sticky):**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Grade: [Grade 5 ▼]    Skill: [Select Skill ▼]    ⌛ 0 of 28 Assessments Complete  │
│                                                                          Save & Continue
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Scrollable Assessment Grid (Main Content Area):**
- High-density table
- Student names frozen on left
- Component columns vary by skill selection
- Checkboxes for component achievement

---

## Control Section Details

### Grade Selector
```
Grade: [Grade 5 ▼]

Dropdown Options:
  - Grade 3
  - Grade 4
  - Grade 5
  - Grade 6
```

**Behavior:**
- Pre-populated with current class grade (from Class Dashboard context)
- Changing grade may filter available students
- Cascades to Skill selector reset

### Skill Selector
```
Skill: [Select Skill ▼]

Dropdown Categories & Options:
─────────────────────────────────
VIC FMS LOCOMOTOR SKILLS:
  ├─ Run
  ├─ Vertical Jump
  ├─ Leap
  └─ Dodge

VIC FMS OBJECT CONTROL SKILLS:
  ├─ Catch
  ├─ Overhand Throw
  ├─ Kick
  ├─ Punt
  ├─ Bounce
  ├─ Two-Handed Strike
  └─ Forehand Strike

TIME-BASED:
  ├─ ASTS (Athletic Skills Test)
  └─ Routine (Sequencing)

OTHER:
  └─ Rock to Stand
```

**Behavior:**
- Only available skills for this grade shown
- Selecting skill immediately populates assessment grid
- Grid shows only students from selected grade/class

### Progress Indicator
```
⌛ 0 of 28 Assessments Complete
```

- Shows total students and number already assessed for this skill
- Updates in real-time as checkboxes are checked
- Helps teacher track progress without saving

---

## Assessment Grid - Skill-Specific Component Layout

### Example 1: Run (Locomotor Skill - 4 Components)

**When skill selected = "Run"**

```
┌──────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ Student Name     │ Bent elbows (6y.o)       │ Opposite to foot (6y.o)  │ Knee lift, forward (6y)  │ Trailing leg (6y.o)      │ Up & Fwd (5y.o)          │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Alice Johnson    │ □                        │ □                        │ □                        │ □                        │ □                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Bob Smith        │ □                        │ □                        │ □                        │ □                        │ □                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Carol Davis      │ ☑                        │ □                        │ ☑                        │ □                        │ ☑                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Diana Martinez   │ □                        │ □                        │ □                        │ □                        │ □                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ [Scroll for more students below]
```

**Skill Components for Run:**
- Bent elbows, pumping (6y.o)
- Opposite to foot (6y.o)
- Knee lift, forward (6y.o)
- Trailing leg extended (6y.o)
- Up & Forward (5y.o)

**Design Rules:**
- Each skill component is a separate column
- Age expectation shown in brackets after component name in header
- Multiple checkboxes allowed per student per component
- Checked items show checked box (☑) with darker background
- No component categorization or grouping

---

### Example 2: Catch (Object Control Skill - 4 Components)

**When skill selected = "Catch"**

```
┌──────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ Student Name     │ Opposite sides (5y.o)    │ Fingers up (5y.o)        │ Eyes on ball (5y.o)      │ Adjusts head (6y.o)      │ Gives inward (6y.o)      │ Draw object in (6y.o)    │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Alice Johnson    │ □                        │ □                        │ □                        │ □                        │ □                        │ □                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Bob Smith        │ □                        │ □                        │ □                        │ □                        │ □                        │ □                        │
├──────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Carol Davis      │ ☑                        │ ☑                        │ ☑                        │ □                        │ ☑                        │ ☑                        │
```

**Skill Components for Catch:**
- Opposite sides (5y.o)
- Fingers up (5y.o)
- Eyes on ball (5y.o)
- Adjusts head (6y.o)
- Gives, hands inward (6y.o)
- Draw object in (6y.o)

---

### Example 3: ASTS (Time-Based Assessment - 1 Component)

**When skill selected = "ASTS"**

```
┌──────────────────┬──────────────────────────────────────────────────────┐
│ Student Name     │ ASTS Time (seconds)                                  │
├──────────────────┼──────────────────────────────────────────────────────┤
│ Alice Johnson    │ [____] seconds  (normative: Achieving ✓)            │
├──────────────────┼──────────────────────────────────────────────────────┤
│ Bob Smith        │ [____] seconds  (normative: Progressing ◐)          │
├──────────────────┼──────────────────────────────────────────────────────┤
│ Carol Davis      │ [____] seconds  (normative: Excelling ✓✓)           │
├──────────────────┼──────────────────────────────────────────────────────┤
│ Diana Martinez   │ [____] seconds  (normative: Beginning ○)            │
```

**Skill Components for ASTS:**
- **ASTS Time Input (6y.o)** - 1 numeric field
  - Text input: enter time in seconds
  - Age expectation varies by grade
  - Auto-calculates normative level based on age/gender (hidden logic)
  - Shows normative level assessment badge
  - Normative badges:
    - ○ Beginning (0) - White
    - ◐ Progressing (1) - Light blue
    - ✓ Achieving (2) - Green
    - ✓✓ Excelling (3) - Dark green

**Behavior:**
- As teacher types time, normative badge updates automatically
- Non-interactive normative display (calculated, not manually checked)

---

### Example 4: Routine (Rubric-Based - 4 Criteria)

**When skill selected = "Routine"**

```
┌──────────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ Student Name     │ Complexity   │ Flow/Timing  │ Creativity   │ Confidence   │
├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Alice Johnson    │ □ Beginning  │ □ Beginning  │ □ Beginning  │ □ Beginning  │
│                  │ □ Progress   │ □ Progress   │ □ Progress   │ □ Progress   │
│                  │ ☑ Achieving  │ ☑ Achieving  │ □ Achieving  │ ☑ Achieving  │
│                  │ □ Excelling  │ □ Excelling  │ □ Excelling  │ □ Excelling  │
├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Bob Smith        │ □ Beginning  │ □ Beginning  │ □ Beginning  │ □ Beginning  │
│                  │ ☑ Progress   │ ☑ Progress   │ □ Progress   │ □ Progress   │
│                  │ □ Achieving  │ □ Achieving  │ □ Achieving  │ □ Achieving  │
│                  │ □ Excelling  │ □ Excelling  │ □ Excelling  │ □ Excelling  │
```

**Skill Components for Routine:**
- **Complexity (6y.o)** - 4-point rubric (Beginning, Progressing, Achieving, Excelling)
- **Flow/Timing (6y.o)** - 4-point rubric
- **Creativity (7y.o)** - 4-point rubric
- **Confidence (6y.o)** - 4-point rubric

**Behavior:**
- Only ONE rubric level per component column should be selected (radio button behavior)
- Clicking one automatically unchecks others in that column for that student
- Color coding: Selected rubric level highlighted (green for selected)

---

### Example 5: Rock to Stand (Simple 1-Level Assessment)

**When skill selected = "Rock to Stand"**

```
┌──────────────────┬──────────────────────────────────────────────┐
│ Student Name     │ Rock to Stand Completion                    │
├──────────────────┼──────────────────────────────────────────────┤
│ Alice Johnson    │ ☑ Completed                                 │
├──────────────────┼──────────────────────────────────────────────┤
│ Bob Smith        │ □ Completed                                 │
├──────────────────┼──────────────────────────────────────────────┤
│ Carol Davis      │ ☑ Completed                                 │
├──────────────────┼──────────────────────────────────────────────┤
│ Diana Martinez   │ □ Completed                                 │
```

**Skill Components for Rock to Stand:**
- **Rock to Stand (5y.o)** - Single checkbox (can do / cannot do)

---

## Grid Density & Scrolling

### Key Design Principles

1. **Vertical Density:**
   - Show as many students as possible without horizontal scroll (typically 5-7 students)
   - Each student row = ~35-40px height
   - Minimize row padding/margins
   - Use compact font for component labels

2. **Student Overflow:**
   - When more students exist, scrollable area allows vertical scroll
   - Student names remain left-aligned and visible
   - Checkbox area scrolls with student list
   - No horizontal scroll needed for normal assessment (all components fit in width)

3. **Column Width Management:**
   - Component columns auto-size based on content
   - Longer component names are abbreviated in header (hover shows full text)
   - Checkboxes are uniform size (18px × 18px)

---

## Tablet Landscape - Assessment Entry

**Screen Size:** ~1024px width

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ◄ Back    Assessment Entry: Grade 5                                     │
│ Grade: [Grade 5 ▼]    Skill: [Run ▼]    ⌛ 3 of 28 Complete             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ ┌──────────────────┬────────────────────┬───────────────────┬────────┐  │
│ │ Student Name     │ Arm Action         │ Leg Action        │ Stance │  │
│ ├──────────────────┼────────────────────┼───────────────────┼────────┤  │
│ │ Alice Johnson    │ □ Bent elbows      │ □ Knee lift       │ □ Up&F │  │
│ │                  │ □ Opposite         │ □ Trailing        │        │  │
│ ├──────────────────┼────────────────────┼───────────────────┼────────┤  │
│ │ Bob Smith        │ □ Bent elbows      │ □ Knee lift       │ □ Up&F │  │
│ │                  │ □ Opposite         │ □ Trailing        │        │  │
│ ├──────────────────┼────────────────────┼───────────────────┼────────┤  │
│ │ Carol Davis      │ ☑ Bent elbows      │ ☑ Knee lift       │ ☑ Up&F │  │
│ │                  │ □ Opposite         │ □ Trailing        │        │  │
│ ├──────────────────┼────────────────────┼───────────────────┼────────┤  │
│ │ Diana Martinez   │ □ Bent elbows      │ □ Knee lift       │ □ Up&F │  │
│ │                  │ □ Opposite         │ □ Trailing        │        │  │
│ │                                      [Scroll for more →]            │  │
│ └──────────────────┴────────────────────┴───────────────────┴────────┘  │
│                                                     [Save & Continue]    │
└─────────────────────────────────────────────────────────────────────────┘
```

**Changes from Desktop:**
- Skill selection simplified to dropdown (no categorized grouping)
- Fewer students visible (3-4 instead of 5-7)
- Component label text abbreviated
- Horizontal scroll available if skill has many components

---

## Tablet Portrait - Assessment Entry

**Screen Size:** ~600px width

**Card-Based View for Density:**

```
┌──────────────────────────────────────────────┐
│ ◄ Back    Assessment Entry              [☰]  │
├──────────────────────────────────────────────┤
│ Grade: [Grade 5 ▼]  Skill: [Run ▼]  ⌛ 3/28  │
├──────────────────────────────────────────────┤
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ Alice Johnson               [✓ Done]    │  │
│ ├────────────────────────────────────────┤  │
│ │ ☑ Arm Action                           │  │
│ │   □ Bent elbows, pumping               │  │
│ │   □ Opposite to foot                   │  │
│ ├────────────────────────────────────────┤  │
│ │ ☑ Leg Action                           │  │
│ │   □ Knee lift, forward                 │  │
│ │   □ Trailing leg extended              │  │
│ ├────────────────────────────────────────┤  │
│ │ ☑ Stance                               │  │
│ │   □ Up & Forward                       │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ Bob Smith                               │  │
│ ├────────────────────────────────────────┤  │
│ │ ☐ Arm Action                           │  │
│ │   □ Bent elbows, pumping               │  │
│ │   □ Opposite to foot                   │  │
│ ├────────────────────────────────────────┤  │
│ │ ☐ Leg Action                           │  │
│ │   □ Knee lift, forward                 │  │
│ │   □ Trailing leg extended              │  │
│ ├────────────────────────────────────────┤  │
│ │ ☐ Stance                               │  │
│ │   □ Up & Forward                       │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ [Scroll for more students ↓]                 │
├──────────────────────────────────────────────┤
│ [Save & Continue] [Save & Exit]              │
└──────────────────────────────────────────────┘
```

**Card Layout Details:**
- One student card per screen
- Component sections collapsed/expandable (☐/☑ expander)
- Status badge shows [✓ Done] if all components assessed
- Vertical scroll through student cards
- Dense component checkboxes within each card

---

## Mobile - Assessment Entry

**Screen Size:** ~375px width

```
┌──────────────────────────────┐
│ ◄  Assessment Entry      [☰] │
├──────────────────────────────┤
│ Grade: [Grade 5 ▼]           │
│ Skill: [Select ▼]            │
│ ⌛ 3 of 28 Complete           │
├──────────────────────────────┤
│                              │
│ ┌──────────────────────────┐ │
│ │ Alice Johnson   [✓ Done] │ │
│ ├──────────────────────────┤ │
│ │ ☑ Arm Action             │ │
│ │ ☑ Leg Action             │ │
│ │ ☑ Stance                 │ │
│ │ [► Expand Details]       │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ Bob Smith                │ │
│ ├──────────────────────────┤ │
│ │ ☐ Arm Action             │ │
│ │ ☐ Leg Action             │ │
│ │ ☐ Stance                 │ │
│ │ [► Expand Details]       │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ Carol Davis   [✓ Done]   │ │
│ ├──────────────────────────┤ │
│ │ ☑ Arm Action             │ │
│ │ ☑ Leg Action             │ │
│ │ ☑ Stance                 │ │
│ │ [► Expand Details]       │ │
│ └──────────────────────────┘ │
│                              │
│ [Scroll for more ↓]          │
├──────────────────────────────┤
│ [Save & Done]  [Save & More] │
└──────────────────────────────┘
```

**Component Expansion Detail:**
When user taps [► Expand Details] for "Alice Johnson":

```
┌──────────────────────────────┐
│ ◄  Alice Johnson        [✓]  │
├──────────────────────────────┤
│ Run Assessment               │
├──────────────────────────────┤
│ Arm Action                   │
│ ☑ Bent elbows, pumping       │
│ □ Opposite to foot           │
│                              │
│ Leg Action                   │
│ ☑ Knee lift, forward         │
│ □ Trailing leg extended      │
│                              │
│ Stance                       │
│ ☑ Up & Forward               │
│                              │
│ [◄ Back to List]             │
├──────────────────────────────┤
│ [Save] [Next Student]        │
└──────────────────────────────┘
```

---

## Save & Navigation Behavior

### Save Options

**Desktop/Tablet:**
- **[Save & Continue]** - Saves current assessment, stays on page for next skill
- **[Save & Exit]** - Saves and returns to Class Dashboard
- **Auto-save** - Every 10 seconds (indicated by subtle UI message)

**Mobile:**
- **[Save & Done]** - Saves, returns to Class Dashboard
- **[Save & More]** - Saves, stays on page to assess another skill
- **Auto-save** - Every 15 seconds

### Completion Workflow

1. Grade selected (pre-filled from class context)
2. Skill selected from dropdown
3. Components appear dynamically
4. Teacher checks components for visible students
5. Scrolls down to assess additional students
6. Saves when done with skill
7. Optionally selects new skill or exits to dashboard

---

## Accessibility & Keyboard Navigation

**Keyboard Shortcuts:**
- `Tab` - Move between checkboxes
- `Space` - Toggle checkbox
- `Enter` - Submit current assessment
- `Escape` - Cancel (with confirmation)

**Mobile Considerations:**
- Large touch targets (44×44px minimum for checkboxes)
- Sufficient spacing to prevent accidental taps
- Clear visual feedback on selection
- Auto-expand component on first tap (not just visibility toggle)

---

## Component Specification Schema

Each skill has a defined component structure stored in database:

```json
{
  "skillId": "run",
  "skillName": "Run",
  "frameworkId": "vic-fms",
  "assessmentType": "component-based",
  "components": [
    {
      "componentId": "bent-elbows",
      "componentName": "Bent elbows, pumping",
      "ageExpectancy": "6y.o",
      "description": "Arms bent at elbows with pumping motion during running",
      "order": 1,
      "allowMultiple": true
    },
    {
      "componentId": "opposite-foot",
      "componentName": "Opposite to foot",
      "ageExpectancy": "6y.o",
      "description": "Opposite arm to foot action (right arm forward with left leg)",
      "order": 2,
      "allowMultiple": true
    },
    {
      "componentId": "knee-lift",
      "componentName": "Knee lift, forward",
      "ageExpectancy": "6y.o",
      "description": "Knees lifted forward during running stride",
      "order": 3,
      "allowMultiple": true
    },
    {
      "componentId": "trailing-leg",
      "componentName": "Trailing leg extended",
      "ageExpectancy": "6y.o",
      "description": "Trailing leg extends behind body at push-off",
      "order": 4,
      "allowMultiple": true
    },
    {
      "componentId": "up-forward",
      "componentName": "Up & Forward",
      "ageExpectancy": "5y.o",
      "description": "Body posture is upright and forward-leaning",
      "order": 5,
      "allowMultiple": true
    }
  ]
}
```

---

## Interaction Details

### Checkbox Behavior

**Component-Based Skills (Run, Catch, etc.):**
- Multiple checkboxes per component allowed
- Unchecking is reversible
- No auto-save of individual checkbox (saves on [Save] button)

**Routine Assessment:**
- Only ONE checkbox per component column (exclusive selection)
- Radio button behavior
- Selecting one automatically deselects others in that column

**Rock to Stand:**
- Single checkbox toggle
- Completion = checked; Incomplete = unchecked

**ASTS (Time-Based):**
- Text input for time (numeric only)
- Real-time normative calculation
- No checkbox interaction

### Visual Feedback

- **Unchecked:** Empty box ☐ (gray background, light)
- **Checked:** Filled box ☑ (dark background, green checkmark)
- **Assessed Component Category:** Darker background/highlight to show completion of that category
- **Routine Selected:** Green highlight on selected rubric level
- **ASTS Time Entry:** Blue border on active input field
- **Student Row with All Components Done:** Light green background on student name

---

## Data Persistence

### On Save
- All component selections for visible students stored in database
- Timestamp recorded for each student assessment
- Assessment date = today's date (auto-set, not editable)
- No confirmation dialog (quick workflow)

### If Network Lost (PWA Offline)
- Checkboxes store in IndexedDB (local browser storage)
- Sync indicator shows offline status
- Auto-syncs when connection returns
- Notification: "Assessment saved offline - synced to server"

---

## Wireframe Integration

**Links To/From:**
- **From:** Dashboard [Start Assessment], Class Dashboard [+ Assessment]
- **To:** Class Dashboard (after save), Dashboard (cancel)
- **Future:** Quick link to Student Profile (hover name → quick view)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-30 | Initial specification - skill selection, component-based assessment grid, high-density multi-student layout, responsive designs for desktop/tablet/mobile |
