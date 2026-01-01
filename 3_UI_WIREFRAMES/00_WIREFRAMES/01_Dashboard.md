# Dashboard (Main Landing Page)

**URL Path:** `/dashboard`  
**User Role:** Teacher / Administrator / Principal  
**Primary Goal:** Quick overview of current status, quick access to classes and assessments, and awareness of what needs attention  
**Key Data:** Active classes, recent assessments, pending actions, quick stats  
**Interactions:** Navigate to class, start assessment, view reports, manage profile  

---

## Desktop Layout (1920×1080)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PE Assessment Platform                              [User: Mrs. Smith] [⚙️]   │
├──────────────────┬──────────────────────────────────────────────────────────┤
│ Navigation       │ Dashboard                                                 │
│ ═════════════    │ Good Morning, Mrs. Smith! 👋                             │
│                  │ Term 4, 2025 | Week 8 of 10                             │
│ 📊 Dashboard     │                                                           │
│ 📚 Classes       │ ┌─ MY CLASSES ─────────────────┬─ QUICK ACTION ────────┐│
│ 📋 Assessments   │ │                               │                       ││
│ 📈 Reports       │ │ Grade 3A (25 students)       │ [✓] Start Assessment  ││
│ ⚙️ Settings      │ │ Run: 8/25 ✓✓✓✓✓░░░ 32%      │                       ││
│ 👤 Profile       │ │ Catch: 4/25 ✓✓░░░░░░░ 16%   │ [→] View Classes      ││
│ 🚪 Logout        │ │ Last: Today, 2:15 PM         │                       ││
│                  │ │ Teacher: Mrs. Smith           │ [↓] View Reports      ││
│ ────────────     │ │                               │                       ││
│ 📱 Mobile App    │ ├───────────────────────────────┤                       ││
│ ❓ Help & FAQ    │ │ Grade 5B (18 students)        │                       ││
│ 📧 Contact       │ │ Bounce: 12/18 ✓✓✓✓✓✓ 67%    │                       ││
│                  │ │ Kick: 10/18 ✓✓✓✓✓░ 56%      │                       ││
│ ────────────     │ │ Last: 3 days ago             │                       ││
│ Version: 1.0.2   │ │ Teacher: Mrs. Smith           │                       ││
│                  │ └───────────────────────────────┴─────────────────────┘│
│                  │                                                           │
│                  │ ┌─ YOUR WHOLE SCHOOL STATS ────────────────────────────┐│
│                  │ │                                                       ││
│                  │ │ Total Students Assessed This Term: 156/180 (87%)    ││
│                  │ │                                                       ││
│                  │ │ Achievement Snapshot (All Classes):                  ││
│                  │ │ ┌──────┬──────┬──────┬──────┐                        ││
│                  │ │ │Begin │Prog  │Achie │Exce  │                        ││
│                  │ │ │ 14%  │ 28%  │ 45%  │ 13%  │                        ││
│                  │ │ │ 22   │ 44   │  70  │  20  │                        ││
│                  │ │ └──────┴──────┴──────┴──────┘                        ││
│                  │ │                                                       ││
│                  │ │ Most Assessed: Bounce (89%)                          ││
│                  │ │ Least Assessed: Rock to Stand (12%)                  ││
│                  │ │                                                       ││
│                  │ └───────────────────────────────────────────────────────┘│
│                  │                                                           │
│                  │ ┌─ PENDING ACTIONS ─────────────────────────────────────┐│
│                  │ │                                                       ││
│                  │ │ ⚠️  3 students in Grade 3A need catch assessment     ││
│                  │ │ ⚠️  Grade 5B: Generate end-of-term report            ││
│                  │ │ ℹ️  New assessment added: SEPEP (Framework v2.1)     ││
│                  │ │                                                       ││
│                  │ └───────────────────────────────────────────────────────┘│
│                  │                                                           │
└──────────────────┴──────────────────────────────────────────────────────────┘
│ Footer: © 2025 PE Assessment Platform | Last Login: Today 8:30 AM           │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Tablet Landscape Layout (1024×768)

```
┌──────────────────────────────────────────────────────────────┐
│ PE Assessment Platform                        [User] [⚙️]     │
├──────────┬──────────────────────────────────────────────────┤
│ [☰] Nav  │ Dashboard                                        │
│ Collapsed│ Good Morning, Mrs. Smith!                        │
│          │ Term 4 | Week 8/10                              │
│          │                                                  │
│          │ ┌─ MY CLASSES ──────────────────────────────┐  │
│          │ │ Grade 3A (25 students)                   │  │
│          │ │ Run: 8/25 (32%) | Catch: 4/25 (16%)     │  │
│          │ │ [→ Assess] [→ View]                      │  │
│          │ │                                           │  │
│          │ │ Grade 5B (18 students)                   │  │
│          │ │ Bounce: 12/18 (67%) | Kick: 10/18 (56%) │  │
│          │ │ [→ Assess] [→ View]                      │  │
│          │ └──────────────────────────────────────────┘  │
│          │                                                  │
│          │ ┌─ SCHOOL STATS ────────────────────────────┐  │
│          │ │ Total: 156/180 (87%)                     │  │
│          │ │ Begin 14% | Prog 28% | Achie 45% | Ex 13%│  │
│          │ └──────────────────────────────────────────┘  │
│          │                                                  │
│          │ ┌─ PENDING ACTIONS ──────────────────────────┐  │
│          │ │ ⚠️  3 students need catch assessment     │  │
│          │ │ ⚠️  Generate end-of-term report          │  │
│          │ └──────────────────────────────────────────┘  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
│ © 2025 PE Assessment Platform                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Tablet Portrait Layout (768×1024)

```
┌──────────────────────────────────┐
│ PE Assessment Platform [⚙️]       │
├──────────────────────────────────┤
│ [☰] Dashboard                    │
│ Good Morning, Mrs. Smith! 👋      │
│ Term 4, Week 8/10                │
│                                  │
│ ┌─ MY CLASSES ──────────────────┐│
│ │ Grade 3A (25 students)        ││
│ │ Run: 8/25 (32%)               ││
│ │ Catch: 4/25 (16%)             ││
│ │ Last: Today, 2:15 PM          ││
│ │ [Start Assessment]            ││
│ │ [View Details]                ││
│ ├───────────────────────────────┤│
│ │ Grade 5B (18 students)        ││
│ │ Bounce: 12/18 (67%)           ││
│ │ Kick: 10/18 (56%)             ││
│ │ Last: 3 days ago              ││
│ │ [Start Assessment]            ││
│ │ [View Details]                ││
│ └───────────────────────────────┘│
│                                  │
│ ┌─ SCHOOL STATS ────────────────┐│
│ │ Total: 156/180 (87%)          ││
│ │ ┌──────┬──────┬──────┬──────┐││
│ │ │ 14%  │ 28%  │ 45%  │ 13% │││
│ │ │Begin │Prog  │Achie │Exce │││
│ │ └──────┴──────┴──────┴──────┘││
│ │                               ││
│ │ Most: Bounce (89%)            ││
│ │ Least: Rock to Stand (12%)    ││
│ └───────────────────────────────┘│
│                                  │
│ ┌─ PENDING ACTIONS ─────────────┐│
│ │ ⚠️  3 students need catch     ││
│ │ ⚠️  Generate end-of-term      ││
│ │ ℹ️  New: SEPEP (v2.1)          ││
│ └───────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│
│ │ [View All Classes]           ││
│ │ [View Reports]               ││
│ │ [Settings]                   ││
│ └──────────────────────────────┘│
│                                  │
└──────────────────────────────────┘
│ © 2025 PE Assessment Platform    │
└──────────────────────────────────┘
```

---

## Mobile Layout (375×812)

```
┌─────────────────────────────┐
│ PE Assessment [☰] [⚙️]      │
├─────────────────────────────┤
│                             │
│ Good Morning,               │
│ Mrs. Smith! 👋              │
│                             │
│ Term 4, Week 8/10           │
│                             │
│ ┌─────────────────────────┐ │
│ │ Grade 3A                │ │
│ │ 25 students             │ │
│ │ Run: 32%                │ │
│ │ Catch: 16%              │ │
│ │ [→ Assess]              │ │
│ │ [→ View]                │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Grade 5B                │ │
│ │ 18 students             │ │
│ │ Bounce: 67%             │ │
│ │ Kick: 56%               │ │
│ │ [→ Assess]              │ │
│ │ [→ View]                │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ SCHOOL STATS            │ │
│ │ 156/180 (87%) Assessed  │ │
│ │ ┌─────┬─────┬─────┬──┐ │ │
│ │ │ 14% │ 28% │ 45% │13%│ │
│ │ │Beg  │Prog │Achi │Ex │ │
│ │ └─────┴─────┴─────┴──┘ │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ PENDING                 │ │
│ │ ⚠️  3 need catch        │ │
│ │ ⚠️  Gen report          │ │
│ │ ℹ️  New: SEPEP          │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ [View All Classes]          │
├─────────────────────────────┤
│ [View Reports]              │
├─────────────────────────────┤
│ [Settings]                  │
├─────────────────────────────┤
│ [📊] [📚] [📋] [📈]         │
│ Dashboard Classes Assessments│
└─────────────────────────────┘
```

---

## Component Breakdown

### Header
- **Content:** App logo/name, current user name with avatar, settings icon
- **Behavior:** Sticky, visible at all times
- **Responsive:** 
  - Desktop: Full logo text
  - Tablet: Logo text + user name
  - Mobile: Logo icon only, user name in menu
- **Links:** Settings (gear icon)

### Left Sidebar Navigation
- **Desktop:** Always visible, fixed width ~200px
- **Tablet/Mobile:** Collapsible hamburger menu (hidden by default)
- **Navigation Items:**
  - 📊 Dashboard (current page)
  - 📚 Classes
  - 📋 Assessments
  - 📈 Reports
  - ⚙️ Settings
  - 👤 Profile
  - 🚪 Logout
- **Secondary items:** Help & FAQ, Mobile App, Version info

### Main Content: Dashboard Title Section
- **Content:** "Good Morning, [User Name]! 👋"
- **Greeting animation:** Changes based on time (Morning/Afternoon/Evening)
- **Subtext:** Current term and week (e.g., "Term 4, 2025 | Week 8 of 10")
- **Responsive:** Larger on desktop, stacked on mobile

### Class Selection Dropdown
- **Dropdown:** Displays all classes the user teaches
- **Content per class (in dropdown):**
  - Class name (e.g., "Grade 3A - 25 students")
  - Indicator of recent activity
- **Default Selection:** Most recently accessed class, or first class alphabetically
- **Display on Selection:**
  - Class name (clickable → Class Dashboard)
  - Student count
  - Top 3-5 assessed skills with completion % (e.g., "Run: 8/25 ✓ 32%")
  - Last assessment date/time
- **Actions:**
  - [Start Assessment] button → Assessment selection modal
  - [View Class Details] link → Class Dashboard
- **Organization:**
  - Desktop: Dropdown + summary (side-by-side with Quick Actions)
  - Tablet: Dropdown + summary (stacked)
  - Mobile: Dropdown + summary (stacked, full width)

### Quick Action Panel (Desktop Only)
- **Position:** Right sidebar or top-right above classes
- **Content:**
  - [✓] Start Assessment → Opens assessment selector
  - [→] View Classes → Navigates to Classes page
  - [↓] View Reports → Navigates to Reports page
- **Purpose:** Quick shortcuts for common tasks

### School-Wide Statistics Section
- **Data Displayed:**
  - Total students assessed this term: X/Y (percentage)
  - **Achievement Distribution Bar Chart:**
    - Horizontal stacked bar showing % in each level
    - Color-coded: Beginning (red), Progressing (yellow), Achieving (light green), Excelling (dark green)
    - Show counts: "22 Beginning | 44 Progressing | 70 Achieving | 20 Excelling"
  - **Most/Least Assessed Skills:** "Most: Bounce (89%) | Least: Rock to Stand (12%)"
- **Purpose:** High-level awareness of school-wide progress
- **Responsive:**
  - Desktop: Large chart, detailed stats
  - Tablet: Medium chart, simplified text
  - Mobile: Collapsed or card format

### Pending Actions / Alerts Section
- **Content:** List of 3-5 action items
- **Types of alerts:**
  - ⚠️ Yellow: Students needing assessment ("3 students in Grade 3A need catch assessment")
  - ⚠️ Yellow: Overdue reports ("Grade 5B: Generate end-of-term report")
  - ℹ️ Blue: New frameworks available ("New assessment added: SEPEP (Framework v2.1)")
- **Design:** 
  - Each alert is a small card/list item
  - Truncated to 3-5 items with option to "View All Alerts"
  - Alerts are clickable → Navigate to relevant page
- **Responsive:**
  - Desktop: Full text, 5 items visible
  - Tablet: Abbreviated text, 3 items visible
  - Mobile: Very abbreviated, 2 items visible

### Footer
- **Content:** Copyright, version number, last login time
- **Responsive:** Minimal on all devices
- **Position:** Sticky to bottom on mobile

---

## Navigation Paths

From Dashboard, users can navigate to:

```
Dashboard
├── [Class Card] → Class Dashboard
├── [Start Assessment] → Assessment Selector Modal
├── [View Classes] → 02_Class_List.md
├── [View Reports] → 06_Reports.md
├── [Settings] → 08_Settings.md
├── [Profile] → User Profile (modal or page)
├── [Help] → Help & FAQ (external or modal)
├── [Alert Item] → Relevant page (e.g., Assessment, Reports)
├── Navigation Sidebar:
│   ├── 📚 Classes → 02_Class_List.md
│   ├── 📋 Assessments → Assessment Library (future)
│   ├── 📈 Reports → 06_Reports.md
│   ├── ⚙️ Settings → 08_Settings.md
│   └── 🚪 Logout → Login page
└── Header:
    ├── Logo → Dashboard (refresh)
    ├── [⚙️] → 08_Settings.md
    └── [User Menu] → Profile, Logout
```

---

## Data Elements

| Element | Data Type | Format | Priority | Source | Sortable | Filterable |
|---------|-----------|--------|----------|--------|----------|------------|
| User Name | Text | "Mrs. Smith" | High | User DB | No | No |
| Current Term | Enum | "Term 4, 2025" | High | School Settings | No | No |
| Current Week | Number | "Week 8 of 10" | Medium | School Calendar | No | No |
| Class Name | Text | "Grade 3A" | High | Class DB | Yes | Yes |
| Student Count | Number | "25 students" | High | Student DB (count) | Yes | Yes |
| Assessment Name | Text | "Run", "Catch" | High | Assessment DB | No | No |
| Completion % | Number | "32%" | High | Assessment Records | Yes | Yes |
| Last Assessment Date | Datetime | "Today, 2:15 PM" or "3 days ago" | High | Assessment Records | Yes | No |
| Teacher Name | Text | "Mrs. Smith" | Medium | User DB | No | No |
| Total Assessed | Number | "156/180" | High | Assessment Records | No | No |
| Achievement Levels | Numeric Array | [14%, 28%, 45%, 13%] | High | Assessment Calculations | No | No |
| Level Counts | Numeric Array | [22, 44, 70, 20] | Medium | Assessment Calculations | No | No |
| Most Assessed Skill | Text | "Bounce (89%)" | Low | Assessment aggregation | No | No |
| Least Assessed Skill | Text | "Rock to Stand (12%)" | Low | Assessment aggregation | No | No |
| Alert Message | Text | "3 students in Grade 3A need catch assessment" | High | Alert rules (automation) | No | Yes |
| Alert Type | Enum | "warning" / "info" / "success" | High | Alert rules | No | Yes |

---

## Responsive Behavior

### Desktop (>1200px)
- Left sidebar always visible (200px fixed)
- Two-column layout: Sidebar | Main content
- Main content area: 3 sections stacked vertically
  1. Greeting + Quick Actions (side-by-side)
  2. My Classes (grid layout, 2-3 cards per row)
  3. School Stats (full width)
  4. Pending Actions (full width)
- Charts and tables displayed at full size
- All text fully visible
- Hover states on interactive elements

### Tablet Landscape (768-1199px)
- Sidebar collapsible (hamburger menu by default)
- When expanded: Narrower sidebar (150px)
- Main content: Full width
- My Classes: 2 cards per row
- School Stats: Simplified chart
- Pending Actions: Abbreviated text
- Quick Actions merged into main content

### Tablet Portrait (600-767px)
- Sidebar hidden (hamburger menu)
- Bottom navigation bar with 4-5 main sections
- Full-width cards for classes
- School Stats: Stacked, vertical layout
- Pending Actions: Show top 3 only

### Mobile (<600px)
- Sidebar hidden (hamburger menu in header)
- Bottom tab bar with: Dashboard, Classes, Assessments, Reports, Menu
- Single-column full-width content
- School Stats: Vertical stacked format
- Cards: Full width with padding
- Text abbreviated where possible
- Action buttons: Full width
- Touch targets: Minimum 44×44px

---

## Notes & Considerations

### Performance
- **Class Cards:** Lazy load class data if > 10 classes
- **School Stats:** Cache calculations (update once per day or on-demand refresh)
- **Alerts:** Fetch on page load, auto-refresh every 5 minutes

### Accessibility
- All interactive elements have proper ARIA labels
- Color coding is supplemented with icons (not color-only)
- Text contrast meets WCAG AA standards
- All links and buttons are keyboard accessible
- Greeting animation is not distracting (< 1 second, non-essential)

### Future Enhancements
- **Customizable Dashboard:** Users can reorder/hide sections
- **Dark Mode:** Support dark theme
- **Real-time Notifications:** WebSocket updates for alerts
- **Bookmarks:** Pin favorite classes for quick access
- **Widget Customization:** Show only relevant stats by role (teacher vs. principal)
- **Export Dashboard:** PDF/CSV export of dashboard summary
- **Mobile App Sync:** Offline dashboard caching

### Design Rationale
- **Large Class Cards:** Optimize for quick scanning and tap targets
- **Quick Actions Panel:** Reduce clicks to common tasks from 2-3 to 1
- **School-Wide Stats:** Gives context and awareness without navigating
- **Alerts Section:** Proactive design - users don't need to hunt for what needs attention
- **Color Coding:** Consistent with Excel version (user familiarity) + improves accessibility
- **Greeting:** Warm welcome, confirms user is logged in correctly, personalizes experience

### Security & Permissions
- Only show classes the current user teaches
- Only show school-wide stats if user is admin/principal
- Hide sensitive data (student IDs, detailed scores) from non-authorized users

---

## Linked Wireframes

- [02_Class_List.md](02_Class_List.md) - Manage classes and import
- [03_Assessment_Entry.md](03_Assessment_Entry.md) - Data entry for assessments
- [05_Class_Dashboard.md](05_Class_Dashboard.md) - Class-level results
- [06_Reports.md](06_Reports.md) - Generate reports
- [08_Settings.md](08_Settings.md) - App settings
- [00_WIREFRAME_GUIDE.md](00_WIREFRAME_GUIDE.md) - Design guide
