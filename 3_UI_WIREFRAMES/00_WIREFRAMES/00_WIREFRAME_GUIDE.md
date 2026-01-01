# UI Wireframe Design Guide

**Version:** 1.0  
**Date:** December 30, 2025  
**Purpose:** Establish consistency and standards for all wireframes in the PE Assessment Platform

---

## Table of Contents
1. [Design Principles](#design-principles)
2. [Wireframe Structure](#wireframe-structure)
3. [Device Specifications](#device-specifications)
4. [Component Standards](#component-standards)
5. [Interaction & Navigation](#interaction--navigation)
6. [Cross-Device Layouts](#cross-device-layouts)
7. [Wireframe Template](#wireframe-template)

---

## Design Principles

### Core Philosophy: "Information First, Clicks Last"

Every wireframe must be designed with the following priorities (in order):

1. **Maximum Information Density** - Show all critical data at a glance
2. **Minimal User Actions** - Reduce clicks/taps to accomplish a task (target: 1-3 clicks)
3. **Clear Hierarchy** - Most important information is most prominent
4. **Contextual Navigation** - Users can navigate naturally via linked elements
5. **Responsive Design** - Content adapts intelligently across devices
6. **Accessibility** - All interactive elements are large enough, properly labeled

### Information Prioritization

**High Priority (Always Visible):**
- Current student/class being assessed
- Assessment progress/completion status
- Individual student achievement data
- Normative score levels (color-coded)

**Medium Priority (Easily Accessible):**
- Historical data and trends
- Detailed assessment criteria
- Instructions and rubrics
- Administrative settings
- Reporting options
- Class-level aggregates and summaries

**Low Priority (Collapsed/Hidden):**
- Metadata (created dates, user info)
- Advanced filters
- Bulk actions
- Archive data

### Click Reduction Targets

| Task | Target Clicks | Current (Excel) |
|------|---------------|-----------------|
| Start assessing a class | 2 | 5-7 |
| View student profile | 1 | 3-4 |
| Complete assessment (5 students) | 10 | 20-30 |
| View class dashboard | 1 | 3 |
| View whole-school trends | 2 | Manual export + chart review |
| Export data | 2 | 4-6 |
| Import class list | 2 | 5+ |

---

## Wireframe Structure

Each page wireframe document must include:

### 1. Page Metadata
```
# [Page Name]

**URL Path:** `/path/to/page`  
**User Role:** Teacher / Admin / Principal  
**Primary Goal:** [What user accomplishes here]  
**Key Data Displayed:** [List of main data elements]  
**Interactions:** [Main actions available]  
```

### 2. Device Layouts
- **Desktop** (1920×1080, default)
- **Tablet** (1024×768, landscape)
- **Tablet** (768×1024, portrait)
- **Mobile** (375×812, portrait)

For each device:
- ASCII art or text-based wireframe
- Proportions roughly accurate
- All major elements labeled
- Annotations explaining behavior

### 3. Component Breakdown
Detailed description of each major section:
- What data is displayed
- How is it formatted
- What interactions are available
- Links to related pages

### 4. Navigation Map
Show all possible navigation paths FROM this page:
```
[Current Page] 
├── Student Name (link) → Student Profile
├── Class Name (link) → Class Dashboard
├── Assessment Button → Assessment Data Entry
├── Report Button → Generate Report
├── Dashboard Button → Main Dashboard
└── Settings Button → Settings Page
```

### 5. Data Displayed
Detailed table showing every data field visible on the page:
| Element | Source | Format | Priority | Sortable | Filterable |
|---------|--------|--------|----------|----------|------------|
| Student Name | Database | Text | High | Yes | Yes |
| Normative Level | Calculated | Badge (color) | High | Yes | Yes |

### 6. Notes & Considerations
- Responsive behavior explanations
- Why information is presented this way
- Performance considerations
- Accessibility notes
- Future enhancements

---

## Device Specifications

### Desktop (Primary Layout)
- **Viewport:** 1920×1080
- **Grid:** 12-column layout
- **Sidebar Width:** 250px (fixed or collapsible)
- **Main Content:** Full remaining width
- **Padding:** 20px standard margins
- **Assumptions:** Mouse + keyboard input, large screen, stationary position

**Key Characteristics:**
- Multi-panel layouts possible
- Side-by-side information display
- Large tables and charts
- Hover states for interactions

### Tablet Landscape (Optimized)
- **Viewport:** 1024×768
- **Grid:** 12-column layout (same as desktop)
- **Sidebar Width:** 200px (collapsible recommended)
- **Main Content:** Full remaining width
- **Padding:** 15px margins
- **Assumptions:** Touch input, landscape orientation typical

**Key Characteristics:**
- Can display side-by-side panels if simplified
- Reduced sidebar width to preserve content space
- Touch targets: 44×44px minimum
- Some panels may stack

### Tablet Portrait (Accommodated)
- **Viewport:** 768×1024
- **Grid:** 6-column layout (simplified)
- **Sidebar:** Hidden or bottom navigation
- **Main Content:** Full width
- **Padding:** 12px margins
- **Assumptions:** Touch input, portrait orientation

**Key Characteristics:**
- Stacked layouts (vertical)
- Bottom navigation or hamburger menu
- Single column for tables (scroll horizontally or convert to card layout)
- Larger touch targets (44×44px minimum)

### Mobile Portrait (Supported)
- **Viewport:** 375×812
- **Grid:** 2-column or single-column
- **Navigation:** Bottom or hamburger menu
- **Main Content:** Full width minus padding
- **Padding:** 10px margins
- **Assumptions:** Touch input, portrait only, on-the-go usage

**Key Characteristics:**
- Single column layout
- Stacked cards/panels
- Large buttons and inputs
- Simplified data views (may need expandable details)
- Progressive disclosure (more details on tap)

---

## Component Standards

### Color Coding (Normative Levels)
- **Beginning:** Red (#EF4444)
- **Progressing:** Yellow/Orange (#FBBF24)
- **Achieving:** Light Green (#86EFAC)
- **Excelling:** Dark Green (#22C55E)

Use these colors consistently across all wireframes for status badges, bars, and highlights.

### Data Display Formats

#### Student Achievement Status
```
┌─────────────────────────┐
│ Student Name            │
│ Normative Level: [BADGE]│
│ Overall Score: X/5      │
│ Progress: ████░ 80%     │
└─────────────────────────┘
```

#### Assessment Record
```
Assessment: Run
Score: 4/5 | Level: Achieving | Date: 2025-12-15
```

#### Class Summary
```
Total Students: 25
Beginning: 5 (20%)  [RED BAR]
Progressing: 8 (32%) [YELLOW BAR]
Achieving: 10 (40%) [GREEN BAR]
Excelling: 2 (8%)   [DARK GREEN BAR]
```

### Button Styles
- **Primary (CTA):** Full width or prominent (e.g., "Start Assessment")
- **Secondary:** Standard width (e.g., "Cancel", "Settings")
- **Danger:** Red accent (e.g., "Delete", "Reset Data")
- **Link/Text:** Minimal styling (e.g., "View Details", student names)

### Input Fields
- **Text Inputs:** Full width on mobile, reasonable width on desktop
- **Checkboxes/Toggle:** Large touch targets (44×44px)
- **Dropdowns:** Full width on mobile, 200-300px on desktop
- **Date Pickers:** Calendar widget or text input (MM/DD/YYYY)

### Tables
- **Desktop:** Standard table format
- **Tablet:** Horizontal scroll or abbreviated columns
- **Mobile:** Convert to card/list format or horizontal scroll with sticky first column

### Charts
- **Desktop:** Full-size charts (400×300px or larger)
- **Tablet:** Medium charts (300×250px)
- **Mobile:** Small charts (280×200px) or simplified bar charts

---

## Interaction & Navigation

### Navigation Principles

1. **Linked Data Elements** - Clicking on entities navigates to their detail page
   - Student name → Student Profile
   - Class name → Class Dashboard
   - Assessment name → Assessment Detail/History
   - Date/Period → Period Summary

2. **Breadcrumb Navigation** - Show current page in context
   ```
   Home > Classes > Grade 3 > Run Assessment > Class Results
   ```

3. **Secondary Navigation** - Consistent sidebar or tab bar
   - Always accessible (sticky on desktop)
   - Collapsible on mobile
   - Shows current section highlighted

4. **Action Buttons** - Clear, prominent CTAs
   - "Start Assessment" - Primary
   - "View Class Dashboard" - Primary
   - "Generate Report" - Secondary
   - "Edit" / "Delete" - Secondary or Danger

### Common Interactions

#### Clicking a Student Row
```
User clicks on "Alice Johnson" in class list
→ Opens Student Profile in modal or new page
→ Shows all assessments, scores, progress
→ Can navigate to edit assessment for this student
```

#### Clicking an Assessment
```
User clicks "Run" assessment
→ Shows assessment detail page or modal
→ Displays rubric, criteria, class overview
→ Can start new assessment or view results
```

#### Clicking a Class
```
User clicks "Grade 3A"
→ Opens Class Dashboard
→ Shows all students, summary data, charts
→ Can select specific assessment to assess or review
```

### Navigation Linking Map

**From Class List Page:**
- Class name → Class Dashboard
- Import button → Import Wizard
- Settings button → Settings

**From Class Dashboard:**
- Student name → Student Profile
- Assessment tab → Assessment Results
- Reports button → Report Generator
- Back/Home → Main Dashboard

**From Assessment Data Entry:**
- Student name (modal) → Student Detail / History
- Instructions link → Expanded Rubric
- Back button → Class Dashboard

**From Student Profile:**
- Back button → Class Dashboard or Class List
- Assessment score (link) → Assessment Detail
- Progress chart (link) → Historical Trend Detail

---

## Cross-Device Layouts

### Layout Patterns

#### Pattern 1: Full-Width Single Column (Mobile/Tablet Portrait)
```
┌─────────────────────────┐
│ Header                  │
├─────────────────────────┤
│                         │
│  Main Content           │
│  (Full Width)           │
│                         │
├─────────────────────────┤
│ Footer/Actions          │
└─────────────────────────┘
```

#### Pattern 2: Sidebar + Content (Desktop/Tablet Landscape)
```
┌────────────┬─────────────────────┐
│ Navigation │ Header              │
│            ├─────────────────────┤
│ Sidebar    │                     │
│            │  Main Content       │
│            │  (Full remaining)   │
│            │                     │
├────────────┼─────────────────────┤
│            │ Footer              │
└────────────┴─────────────────────┘
```

#### Pattern 3: Hidden Sidebar + Bottom Nav (Mobile)
```
┌─────────────────────────┐
│ Header (w/ Menu Icon)   │
├─────────────────────────┤
│                         │
│  Main Content           │
│  (Full Width)           │
│                         │
├─────────────────────────┤
│ Bottom Navigation Bar   │
│ [Icon] [Icon] [Icon]    │
└─────────────────────────┘
```

### Breakpoints

| Device | Breakpoint | Sidebar | Navigation | Layout |
|--------|-----------|---------|------------|--------|
| Desktop | ≥1600px | Fixed | Sidebar | 2-column+ |
| Desktop | 1200-1599px | Fixed | Sidebar | 2-column |
| Tablet Landscape | 768-1199px | Collapsible | Sidebar/Hamburger | 2-column (simplified) |
| Tablet Portrait | 600-767px | Hidden | Bottom/Hamburger | Single column |
| Mobile | <600px | Hidden | Bottom Nav | Single column |

### Data Presentation Adjustments

**Desktop:** Full tables, side-by-side panels, detailed information  
**Tablet:** Simplified tables, accordion sections, abbreviated text  
**Mobile:** Card layouts, progressive disclosure, single-column flow

---

## Wireframe Template

Copy this template for each new page wireframe:

```markdown
# [Page Name]

**URL Path:** `/[path]`  
**User Role:** [Primary User] / [Secondary User]  
**Primary Goal:** [What user accomplishes]  
**Key Data:** [Data elements shown]  
**Interactions:** [Main actions]  

---

## Desktop Layout (1920×1080)

\`\`\`
┌──────────────────────────────────────────────────────────┐
│ Header / Top Navigation                                   │
├──────────┬───────────────────────────────────────────────┤
│ Sidebar  │ Main Content Area                              │
│          │                                                │
│ • Item   │ ┌─────────────────────────────────────────┐   │
│ • Item   │ │ Title / Heading                         │   │
│ • Item   │ ├─────────────────────────────────────────┤   │
│          │ │ Data / Content                          │   │
│          │ │                                         │   │
│          │ ├─────────────────────────────────────────┤   │
│          │ │ [Button] [Button] [Link]                │   │
│          │ └─────────────────────────────────────────┘   │
│          │                                                │
└──────────┴───────────────────────────────────────────────┘
│ Footer                                                     │
└──────────────────────────────────────────────────────────┘
\`\`\`

---

## Tablet Landscape Layout (1024×768)

\`\`\`
┌──────────────────────────────────────────────────┐
│ Header / Top Navigation                           │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │ Main Content                          │
│ (Collapse│ ┌──────────────────────────────────┐ │
│ d)       │ │ Title / Heading                  │ │
│          │ ├──────────────────────────────────┤ │
│          │ │ Data / Content (Abbreviated)    │ │
│          │ ├──────────────────────────────────┤ │
│          │ │ [Button] [Button]                │ │
│          │ └──────────────────────────────────┘ │
│          │                                       │
└──────────┴──────────────────────────────────────┘
│ Footer                                            │
└──────────────────────────────────────────────────┘
\`\`\`

---

## Mobile Layout (375×812)

\`\`\`
┌─────────────────────────┐
│ Header [☰]              │
├─────────────────────────┤
│ Title / Heading         │
├─────────────────────────┤
│                         │
│ Data / Content          │
│ (Single Column)         │
│                         │
│ [Card] [Card] [Card]    │
│                         │
├─────────────────────────┤
│ [Button - Full Width]   │
├─────────────────────────┤
│ [Icon] [Icon] [Icon]    │
│ Bottom Navigation       │
└─────────────────────────┘
\`\`\`

---

## Component Breakdown

### Header
- **Content:** Title, breadcrumbs, user menu
- **Behavior:** Sticky on scroll, responsive
- **Links:** Home, Settings, Logout

### Main Content Area
**[Describe each major section]**

### Sidebar / Navigation
**[Describe navigation structure]**

### Buttons / Actions
- [Button name] - [Action]
- [Button name] - [Action]

---

## Navigation Paths

From this page, users can navigate to:
- **Student Name** → Student Profile
- **Class Name** → Class Dashboard
- **[Button]** → [Destination Page]
- **[Link]** → [Destination Page]

---

## Data Elements

| Element | Data Type | Format | Priority | Source |
|---------|-----------|--------|----------|--------|
| [Name] | Text | Plain text | High | Database |
| [Status] | Enum | Color badge | High | Calculated |
| [Score] | Number | X/5 | High | Database |

---

## Responsive Behavior

**Desktop (>1200px):**
- [Describe layout]

**Tablet Landscape (768-1199px):**
- [Describe layout]

**Mobile (<768px):**
- [Describe layout]

---

## Notes & Considerations

- **Performance:** [Any considerations]
- **Accessibility:** [WCAG compliance notes]
- **Future Enhancement:** [Possible future features]
- **Design Rationale:** [Why this layout/design]

---

## Linked Wireframes

- [01_Dashboard.md](01_Dashboard.md) - Main dashboard
- [02_Class_List.md](02_Class_List.md) - Class management
- [03_Assessment_Entry.md](03_Assessment_Entry.md) - Assessment data entry
```

---

## File Naming Convention

Follow this naming pattern for consistency:

```
[Number]_[Page_Name].md

Examples:
01_Dashboard.md
02_Class_List.md
03_Assessment_Entry.md
04_Student_Profile.md
05_Class_Dashboard.md
06_Reports.md
07_Import_Wizard.md
08_Settings.md
```

Numbers should reflect the general workflow/priority:
- **01-05:** Core user-facing pages (assessment workflow)
- **06-08:** Administrative/support pages
- **09+:** Advanced features, modals, alternate views

---

## Consistency Checklist

Before finalizing a wireframe, verify:

- [ ] All three device layouts included
- [ ] Navigation paths clearly documented
- [ ] Data display format matches other wireframes
- [ ] Color coding (if applicable) follows standards
- [ ] Click targets appropriately sized for each device
- [ ] All interactions explicitly labeled
- [ ] Links to other pages specified
- [ ] Component breakdown detailed
- [ ] Responsive behavior explained
- [ ] Accessibility notes included
- [ ] Performance considerations noted
- [ ] File follows naming convention

---

## Information Density Examples

### ❌ LOW Density (Avoid)
```
┌─────────────────────────┐
│ Class Dashboard         │
├─────────────────────────┤
│                         │
│                         │
│     [View Results]      │
│                         │
│                         │
└─────────────────────────┘
```

### ✅ HIGH Density (Target)
```
┌────────────────────────────────────┐
│ Class Dashboard: Grade 3A          │
│ Teacher: Mrs. Smith | Term 4, 2025 │
├────────────────────────────────────┤
│ Status: 8/25 students assessed     │
│                                     │
│ Beginning: 3 | Progressing: 7      │
│ Achieving: 12 | Excelling: 3       │
│                                     │
│ Last Updated: 15 minutes ago       │
│ [View Full Results] [Start Assess] │
└────────────────────────────────────┘
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-30 | Initial guide creation |

---

## Questions or Clarifications?

When creating wireframes:
1. **Ask:** Can I show this information more concisely?
2. **Ask:** Is there a more direct path to accomplish this goal?
3. **Ask:** Have I eliminated unnecessary steps?
4. **Ask:** Is every element on the page earning its space?
5. **Ask:** Can a user accomplish their goal in 1-3 clicks?

Remember: **Good design is invisible. Users shouldn't need instructions to use the app.**
