# PE Movement Assessment Platform - Technical Design Document

**Version:** 1.1  
**Date:** December 31, 2025  
**Status:** Wireframes Complete - Ready for Production Planning

---

## Executive Summary

This document outlines the migration of two Excel-based PE assessment applications into a unified, modern web application built with Next.js and React. The new platform will address critical limitations in the current system while maintaining all existing functionality and enabling new capabilities.

**Current State:** Two separate Excel workbooks (PE Movement Assessment Tracker 2.0 and PE MAT Whole School Tracker)  
**Target State:** Single, unified Next.js web application with offline capability and multi-user support

---

## 1. Problem Statement

### Current System Limitations

#### 1.1 Technical Constraints
- **Binary Format Dependency:** Excel files cannot be version controlled, diffed, or merged
- **Macro Security Issues:** VBA macros trigger security warnings, hindering adoption by customers
- **Limited IDE Support:** Difficult to maintain/update code due to Excel's poor development environment
- **Single User Limitation:** Only one user can edit at a time; concurrent access causes conflicts
- **Poor Mobile/Tablet Support:** Not designed for touch interfaces or mobile devices
- **Offline Functionality:** Unclear offline capability; data sync issues between instances
- **No Real-time Collaboration:** Teachers cannot work simultaneously on shared data

#### 1.2 User Experience Issues
- **Clunky Data Entry:** Must type "1" or "0" instead of clicking buttons/checkboxes
- **Navigation Friction:** Multiple steps required for common tasks (import/export workflows)
- **Poor Information Architecture:** Swapping between separate applications; unclear button/macro layout
- **Scrolling/Responsiveness:** Difficult to navigate large spreadsheets; no responsive design
- **Confusing UX:** Tutorial/instructions are scattered; workflows not intuitive
- **Limited Visualization:** Basic charts; hard to derive meaningful insights quickly
- **No Context Switching:** Cannot click on a student to see macro-level progress without manual lookup

#### 1.3 Scalability & Maintenance Challenges
- **Hard to Add Assessments:** Adding new movement skills (SEPEP, PMP) requires manual Excel work
- **Data Integrity Issues:** Easy to accidentally overwrite data; no audit trail
- **Manual Export/Import:** Tedious data movement between 2.0 tracker and whole school tracker
- **Formula Duplication:** Normative score logic duplicated across sheets; hard to update
- **No Data Validation:** Limited validation rules; garbage in, garbage out
- **Performance Degradation:** Large datasets (1000+ students) slow down workbook significantly

---

## 2. Intended Solution

### 2.1 Vision
A **modern, intuitive web application** that streamlines PE assessment workflow, enables real-time data entry and analysis, supports collaboration, and allows educators to make data-driven decisions about student progress and lesson planning.

### 2.2 Key Goals
1. **Eliminate Excel dependency** - Replace with modern tech stack
2. **Improve UX significantly** - Intuitive interface optimized for data entry on desktop and tablet
3. **Enable collaboration** - Multi-user support with real-time updates
4. **Increase maintainability** - Code-based architecture allows easy addition of new assessments
5. **Enhance analytics** - Better visualizations and insights
6. **Ensure data quality** - Validation, audit trails, and version history
7. **Support offline workflow** - Work without internet; sync when available
8. **Enable integrations** - Import class lists from Compass and other systems

### 2.3 Why Web App + Next.js/React?
- **Modern Stack:** Widely supported, excellent tooling, active community
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **Real-time Capabilities:** Support for WebSockets for live updates
- **Offline Support:** Progressive Web App (PWA) capabilities with service workers
- **Easy Maintenance:** Code-based, AI-friendly, version controllable
- **Scalability:** Can handle 1000+ students without performance issues
- **Deployability:** Vercel hosting or on-premise; flexible deployment options
- **Future-Proof:** Easy to add new features, integrations, and assessments

---

## 3. Current System Architecture

### 3.1 PE Movement Assessment Tracker 2.0 - Structure

**Primary Purpose:** Classroom-level assessment of individual students in PE movement skills

**Key Components:**

#### Sheets:
1. **Class List (Dashboard)** - Summary view
   - Lists all students with color-coded status (Beginning, Progressing, Achieving, Excelling)
   - Shows overall normative scores per student
   - Color-coded feedback by assessment category
   - Navigation buttons to individual skill assessment sheets
   - Import/Export functionality

2. **Assessment Skill Sheets** (Run, Vertical Jump, Leap, Dodge, Catch, Overhand Throw, Kick, Punt, Bounce, Two-Handed Strike, Forehand Strike, Gymnastics, ASTS 2+3, Rock to Stand,)
   - Each sheet contains:
     - Skill name and instructions/rubric
     - Rows for each student
     - 4-8 columns representing skill elements/criteria
     - Manual entry cells (1 = achieved, 0 = not achieved)
     - Total score sum calculation
     - Normative score mapping (color-coded)
     - Class analysis charts (bar/stacked charts by skill criteria and normative score)

#### Data Elements:
- **Student Info:** Name, Gender, Year Level, Age
- **Assessment Data:** 1 (achieved) or 0 (not achieved) per element
- **Calculated Fields:**
  - Sum of elements per student
  - Normative score based on year level (Beginning, Progressing, Achieving, Excelling)
  - Class-level aggregates

#### Normative Score Logic:
Based on year level (F-6, K-12 equivalent), specific thresholds determine achievement level:
- **Beginning:** Lowest threshold
- **Progressing:** Mid-low threshold
- **Achieving:** Mid-high threshold
- **Excelling:** Highest threshold

(Exact thresholds visible in screenshots - appear to be hardcoded by year level and different per skill sheet)

---

### 3.2 PE MAT Whole School Tracker - Structure

**Primary Purpose:** School-wide longitudinal tracking of student progress across multiple assessment periods

**Key Components:**

#### Main Sheet:
- **Student Progress Over Time Chart**
  - X-axis: Years/Semesters (e.g., 2005, 2006, 2007, 2008)
  - Y-axis: Normative score (numeric)
  - Multiple student lines with distinct colors
  - Shows progression trajectories for individual students
  - Legend identifies each student

#### Data Organization:
- **Temporal Structure:** Semesters/years as columns
- **Student Rows:** One row per student
- **Normative Scores:** Aggregated from 2.0 tracker
- **Filtering:** Can filter by student or cohort

#### Key Characteristics:
- Much larger dataset (potentially 1000+ students × 6+ years)
- Aggregates data exported from the 2.0 tracker
- Focus on trend analysis and long-term progress
- Used for reporting to principals and stakeholders

---

### 3.3 Data Flow Between Systems

```
Classroom Teaching (Year)
    ↓
PE Assessment Tracker 2.0
(Individual assessments per student)
    ↓
Class List Dashboard
(Summary and color-coded status)
    ↓
Export Data (twice per year)
    ↓
PE MAT Whole School Tracker
(Longitudinal tracking across years)
    ↓
Principal Reports & Stakeholder Communication
```

---

## 4. Proposed Solution Architecture

### 4.1 Technology Stack

**Frontend:**
- **Framework:** Next.js 14+ (React 18+)
- **UI Components:** Shadcn/ui or Material-UI
- **State Management:** TanStack Query (React Query) + Zustand
- **Forms:** React Hook Form + Zod (validation)
- **Charts:** Recharts or Chart.js
- **Offline:** TanStack Query + Service Workers (PWA)
- **Styling:** Tailwind CSS

**Backend:**
- **Runtime:** Next.js API Routes or Node.js (Express)
- **Database:** PostgreSQL (primary); SQLite for offline sync
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **File Processing:** csv-parse (for Compass imports)

**Deployment:**
- **Hosting:** Vercel (default) or self-hosted (Docker)
- **Database:** Managed PostgreSQL (e.g., Supabase, Railway) or self-hosted
- **Storage:** S3 or local file system for exports

---

### 4.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│  (Next.js Frontend - React Components + Tailwind CSS)        │
└─────────────────────────────────────────────────────────────┘
         ↑                           ↑                  ↑
         │                           │                  │
    HTTP/REST              WebSocket (Real-time)  Local Storage
    /GraphQL               Updates               (Offline)
         │                           │                  │
┌─────────────────────────────────────────────────────────────┐
│                  Next.js API Layer                           │
│  (Authentication, Business Logic, Data Validation)           │
└─────────────────────────────────────────────────────────────┘
         │                           │
    Prisma ORM              Service Worker
         │                   (PWA/Sync)
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
│  (PostgreSQL - Primary | SQLite - Offline Cache)             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.3 Core Data Model

#### Tables/Collections:

**users**
- id, email, password_hash, name, role, school_id, created_at, updated_at

**schools**
- id, name, location, created_at, updated_at

**classes**
- id, school_id, year_level, teacher_id, name, term, year, created_at, updated_at

**students**
- id, school_id, name, date_of_birth, gender, year_level, class_ids[], created_at, updated_at

**assessments** (Assessment Framework)
- id, name, description, framework (e.g., "Vic FMS", "ASFC", "SEPEP"), active, version, created_at

**assessment_elements** (Criteria/Components within each assessment)
- id, assessment_id, name, description, order, created_at

**assessment_records** (Individual assessment data)
- id, student_id, class_id, assessment_id, assessment_period_id, element_scores[], total_score, normative_level, created_at, created_by, updated_at, updated_by

**assessment_periods** (Semester/Year tracking)
- id, school_id, name, start_date, end_date, type (semester/year), year, created_at

**normative_score_rules** (Age-based thresholds)
- id, assessment_id, year_level, beginning_threshold, progressing_threshold, achieving_threshold, excelling_threshold

**imports** (Compass/CSV imports)
- id, school_id, import_date, file_name, record_count, status, created_by

**audit_log** (Version history)
- id, table_name, record_id, action (create/update/delete), old_values, new_values, user_id, timestamp

---

## 5. Feature Specifications

### 5.1 Core Features (MVP - Phase 1)

#### Authentication & Setup
- [ ] Teacher login/registration
- [ ] School/Organization setup
- [ ] User role management (Teacher, Administrator, Principal)
What happens when multiple users are on at once?

#### Class Management
- [ ] Create/edit classes
- [ ] Import class lists from CSV (Compass format)
- [ ] Add/remove students manually
- [ ] Manage class roster

#### Assessment Data Entry
- [ ] Select class and assessment to begin
- [ ] Display assessment instructions/rubric
- [ ] Checkbox/toggle interface for skill elements (no typing "1" or "0")
- [ ] Student-by-student data entry view (scrollable like excel, not 1 student per page)
- [ ] Real-time validation
- [ ] Save progress automatically
- [ ] View individual student progress modal (click student name)

#### Dashboard & Analysis
- [ ] Class-level dashboard
  - [ ] Student summary with color-coded normative levels
  - [ ] Class-level aggregates (% in each normative category)
  - [ ] Visualizations: stacked bar chart (skill criteria), distribution chart (normative scores)
  - [ ] Identify skill gaps and strengths
- [ ] Individual student progress view
  - [ ] Show all assessments for a student across time
  - [ ] Historical progress data
  - [ ] Parent-friendly report view

#### Reporting
- [ ] Generate class assessment reports (exportable to PDF)
- [ ] Whole-school summaries (for principals)
- [ ] Semester/year-level aggregates

#### Data Export/Import
- [ ] Export class data to CSV/Excel
- [ ] Export whole-school data for longitudinal analysis
- [ ] Import from Compass (CSV)

### 5.2 Extended Features (Phase 2)

#### Multi-Assessment Framework Support
- [ ] Add new assessment frameworks (SEPEP, PMP, etc.) without code changes
- [ ] Dynamic assessment sheet configuration
- [ ] Framework versioning

#### Offline & Sync
- [ ] Service worker for offline data entry
- [ ] Automatic sync when connection restored
- [ ] Conflict resolution strategy

#### Collaboration
- [ ] Real-time multi-user updates (WebSocket)
- [ ] Audit trail / version history
- [ ] Comments/notes per assessment

#### Advanced Analytics
- [ ] Longitudinal progress charts (like Whole School Tracker)
- [ ] Cohort analysis
- [ ] Year-on-year comparisons
- [ ] Predictive analytics (trends)

#### Mobile/Tablet Optimization
- [ ] Responsive design for iPad/tablets
- [ ] Touch-optimized buttons/inputs
- [ ] Simplified navigation for small screens

### 5.3 Phase 3+ Features

- Integration with school information systems (Compass, Sentral, etc.) **Critical for importing student lists and organising classes**
- Parent portal for viewing student progress
- AI-powered insights and recommendations
- Automated lesson planning suggestions
- Video annotation and evidence capture
- Benchmarking against other schools/districts

---

## 6. User Workflows

### 6.1 Teacher Assessment Workflow

```
1. Login to app
2. Dashboard: Select class to assess
3. Select skill/assessment to conduct
4. View instructions/rubric for the skill
5. Setup assessment (pre-assessment steps if needed)
6. For each student:
   - Display student name and assessment criteria
   - Observer ticks checkbox (✓) or leaves unchecked (☐)
   - Alternative: Click "Mastered" to auto-fill all criteria
7. Save assessment data (auto-saves every change)
8. View class summary dashboard
9. Identify skills to focus on next term
```

### 6.2 Reporting Workflow (Mid-Year/End-of-Year)

```
1. Login to app
2. Navigate to Reporting section
3. Select class and assessment period
4. View class dashboard:
   - Normative score distribution
   - Skill-by-skill breakdown
   - Individual student progress summary
5. Generate report (PDF export)
6. Review with principal or for parent meetings
```

### 6.3 Parent Meeting Workflow

```
1. Teacher navigates to student record
2. Displays:
   - Current normative level
   - Progress over time (graph)
   - Specific strengths and gaps
   - Historical comparisons
3. Assure parent of student progression despite current level
4. Discuss intervention strategies if needed
```

### 6.4 Principal/Stakeholder Reporting

```
1. Principal/Admin logs in
2. Navigates to School-Wide Summary
3. Views:
   - School-wide normative score distribution
   - Trends across years/semesters
   - Gaps in programming
   - Justification for future planning/funding
4. Exports summary data for stakeholder presentations
```

---

## 7. Data Migration Strategy

### 7.1 Phase 1: Extract & Map

1. **Analyze Excel Files**
   - Document all formulas and calculations
   - Identify normative score thresholds per year level
   - Map all assessment frameworks and elements
   - Document historical data in Whole School Tracker

2. **Create Migration Scripts**
   - Python/Node.js scripts to parse Excel files

### 7.2 Phase 2: Schema Design & Seeding

1. **Design PostgreSQL Schema** (see Data Model section)
2. **Create Migration Scripts**
   - Convert extracted Excel data to database format
   - Populate normative score rules
   - Preserve historical data from Whole School Tracker
3. **Validation**
   - Verify record counts
   - Spot-check calculated fields

### 7.3 Phase 3: Parallel Running

1. **Deploy initial web app** (with historical data loaded)
2. **Run side-by-side** with Excel for one assessment cycle
3. **Collect feedback** from users
4. **Make adjustments** before full cutover

### 7.4 Phase 4: Cutover

1. **Final data sync** from Excel to database
2. **Decommission Excel files** (keep as archive)
3. **Support period** for troubleshooting

---

## 8. Key Technical Decisions

### 8.1 Database Choice: PostgreSQL
- **Rationale:** Robust, open-source, excellent for relational data (students, assessments, scores)
- **Alternative Considered:** MongoDB (NoSQL) - rejected due to need for strong relationships and ACID compliance
- **Offline Strategy:** SQLite synced with PostgreSQL for offline-first capability

### 8.2 Frontend Framework: Next.js + React
- **Rationale:** Unified full-stack framework, excellent for this use case, matches your familiarity
- **Key Libraries:**
  - TanStack Query: Efficient server state management
  - Zustand: Lightweight client state (offline queue, UI state)
  - React Hook Form: Efficient form handling
  - Zod: Runtime schema validation

### 8.3 Offline Strategy: PWA + Service Workers
- **Rationale:** Teachers may need to assess in areas without internet (outdoor PE)
- **Implementation:**
  - Service worker caches app shell and recent data
  - IndexedDB/SQLite stores assessment data locally
  - When online: automatic sync via TanStack Query
  - Conflict resolution: Last-write-wins with user notification

### 8.4 Normative Score Calculation
- **Strategy:** Database-driven lookup (not hardcoded)
- **Benefit:** Easy to update thresholds without code changes
- **Query:** Calculate at read-time or cache in assessment_records

### 8.5 Assessment Framework Extensibility
- **Strategy:** Assessment definitions stored in database, not code
- **Benefit:** Add new frameworks (SEPEP, PMP) without code deployment
- **Implementation:** Admin UI to define assessments, elements, and normative rules

---

## 9. Implementation Roadmap

### Phase 1: MVP (Months 1-2)
- Core authentication and user management
- Class and student management
- Basic assessment data entry for one framework (e.g., Vic FMS)
- Class dashboard with basic charts
- CSV import capability

**Deliverables:** Functional web app for single assessment framework

### Phase 2: Expansion & Polish (Months 3-4)
- Multi-framework support (add ASFC, etc.)
- Offline capability (service workers, sync)
- Enhanced reporting (PDF export)
- Historical data integration (Whole School Tracker)
- Tablet/mobile optimization

**Deliverables:** Feature-complete app ready for pilot

### Phase 3: Pilot & Feedback (Month 5)
- Deploy to select schools
- Gather user feedback
- Performance optimization
- Bug fixes and refinements

**Deliverables:** Production-ready v1.0

### Phase 4: Scale & Integration (Months 6+)
- Multi-tenant support (multiple schools)
- Compass integration
- Advanced analytics
- Parent portal
- Real-time collaboration features

---

## 10. Success Metrics

1. **User Adoption:** 100% of pilot school teachers using app for assessments within 2 weeks of training
2. **Data Quality:** 95%+ data entry accuracy (compared to Excel)
3. **Performance:** Assessment data entry < 30 seconds per student
4. **Satisfaction:** 4/5 average user satisfaction score
5. **Offline Reliability:** 99% sync success rate after reconnection
6. **Scalability:** Handle 1000+ students without performance degradation
7. **Maintenance:** Reduce assessment framework update time from days (Excel) to minutes (web app)

---

## 11. Risk Assessment & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| User resistance to change | High | Medium | Early training, iterative feedback, phased rollout |
| Data loss during migration | Critical | Low | Parallel running, backups, validation checks |
| Offline sync conflicts | Medium | Medium | Clear conflict resolution UI, thorough testing |
| Performance with large datasets | Medium | Medium | Database indexing, query optimization, caching |
| Internet connectivity in outdoor settings | Medium | High | Robust offline mode, local-first architecture |
| Framework updates (new assessments) | Medium | High | Database-driven design reduces code changes |

---

## 12. Appendix: Detailed Feature Breakdown

### Assessment Data Entry Interface

**Desktop View:**
- Left sidebar: List of students in class
- Center: Current student card with skill criteria
- Checkboxes for each criterion (not text input)
- Visual feedback on completion
- "Mastered" button to auto-fill (future feature)
- Auto-save indicator

**Tablet View:**
- Full-width single student view
- Large touch targets for checkboxes
- Swipe to next/previous student
- Minimized sidebar or bottom navigation

### Class Dashboard

**Components:**
1. **Class Summary Card**
   - Total students
   - Breakdown by normative level (% in each category)
   - Color-coded visual (e.g., pie/donut chart)

2. **Skill Performance Matrix**
   - Rows: Skills assessed
   - Columns: Criteria within each skill
   - Cells: % of class achieving each criterion
   - Color intensity: 0-100%

3. **Normative Distribution Chart**
   - Stacked bar chart showing counts in each level
   - Filterable by assessment period

4. **Student List with Status**
   - Name, current normative level (color-coded)
   - Click to view detailed student profile
   - Quick filters (show only "Beginning", etc.)

### Historical Tracking

**Student Profile (Longitudinal View):**
- Line chart: Student's normative scores over time
- Table: All assessments and scores
- Progress indicators: On track / Needs support / Excelling
- Notes/goals from teacher

---

## 13. Wireframes Complete - Files Reference

See `/UI_Wireframes/` directory for detailed specifications:
- **00_WIREFRAME_GUIDE.md** - Design standards and conventions
- **01_Dashboard.md** - Main landing page with class selector and quick actions
- **02_Class_List.md** - Class management with 3-step Compass CSV import wizard
- **03_Assessment_Entry.md** - High-density multi-framework data entry interface
- **04_Student_Profile.md** - Student progress tracking and export functionality
- **05_Class_Dashboard.md** - Class-level assessment matrix with multi-framework display
- **STUDENT_ASSESSMENT_MATRIX_DATASET.md** - Data structure and TypeScript interfaces

---

## 14. Production Planning - Required Before Development

### A. Skill Component Definitions (BLOCKER)
**Status:** Pending user definition  
**Needed By:** Week 1 of development  
**Deliverable Format:** JSON or CSV with exact criteria for each skill:
- Skill name (Run, Catch, Vertical Jump, etc.)
- Component names (Bent elbows, High knees, etc.)
- Age expectancy in years (6y.o, 7y.o, etc.)
- Rubric details for Routine (descriptions for 1-4 scale)
- ASTS time thresholds by age/grade
- Rock to Stand rubric (if multi-criteria)

### B. Database Schema Definition
**Status:** Ready to create (based on tech design section 5)  
**Needed By:** Week 1  
**Deliverable:** Prisma schema file with 9+ tables, relationships, constraints

### C. API Specification
**Status:** Ready to create (based on wireframes)  
**Needed By:** Week 2  
**Deliverable:** OpenAPI/Swagger spec with all endpoints, request/response schemas

### D. Authentication & Authorization
**Status:** Needs definition  
**Needed By:** Week 2  
**Deliverable:** User roles, permission matrix, school/class scoping rules

### E. Phased MVP Scope Confirmation
**Phase 1 (Weeks 1-2):**
- Authentication (teacher login)
- Class management (create, import via Compass CSV)
- Student roster management
- Assessment data entry for Vic FMS (all 11 skills) + ASTS + Routine + Rock to Stand
- Class dashboard (assessment matrix)
- Responsive design (desktop optimized, tablet/mobile basic)

**Phase 2 (Weeks 3-4):**
- Student profile with progress tracking
- CSV/PDF export functionality
- Historical data import from Excel
- Offline capability (service workers)
- Enhanced tablet/mobile optimization

**Phase 3 (Week 5+):**
- Advanced reporting (school-wide analytics)
- Real-time collaboration (if multi-teacher usage needed)
- Admin framework management UI
- Performance optimization and scaling

---

## 15. Next Steps

1. **Define Skill Components:** User provides exact criteria for each skill (Run, Catch, etc.) in JSON format
2. **Create Prisma Schema:** Based on tech design section 5 and skill definitions
3. **Document API Spec:** All endpoints needed by wireframes (create class, import students, save assessment, etc.)
4. **Setup Next.js Project:** Initialize repo with selected libraries (TanStack Query, Zustand, React Hook Form, Zod, Recharts)
5. **Database Preparation:** Set up PostgreSQL instance and migration strategy
6. **Begin Phase 1 Development:** Start with authentication and class management
