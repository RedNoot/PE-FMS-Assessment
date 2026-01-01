# Prisma Database Setup Guide

**Version:** 1.0  
**Date:** January 1, 2026

---

## 📋 Overview

This Prisma schema defines the complete database structure for the PE Assessment Platform, including:

- **11 core models**: User, School, Class, Student, Assessment, etc.
- **3 enums**: UserRole, Gender, AssessmentPeriodType
- **Full relationships**: Foreign keys, indexes, cascading deletes
- **Sync support**: Versioning, conflict detection, offline queue
- **Audit logging**: Complete change history

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/pe_assessment"
```

### 3. Create Database

```bash
# Option A: Using PostgreSQL CLI
createdb pe_assessment

# Option B: Using psql
psql -U postgres
CREATE DATABASE pe_assessment;
\q
```

### 4. Run Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Create tables in database
npm run prisma:migrate
# Or for development without migrations:
npm run db:push
```

### 5. Seed Database with Skills Data

```bash
npm run prisma:seed
```

This will populate the database with:
- 14 assessments (11 Vic FMS + ASTS + Routine + Rock to Stand)
- 60+ assessment elements (components)
- 100+ normative score rules (ages 5-12)

---

## 📊 Database Schema Overview

### Core Models

```
User (teachers, admins, principals)
  └─ School
       ├─ Class
       │    └─ StudentClass (join table)
       │         └─ Student
       │              └─ AssessmentRecord
       │                   ├─ Assessment
       │                   │    ├─ AssessmentElement
       │                   │    └─ NormativeScore
       │                   └─ AssessmentPeriod
       ├─ Import (CSV imports)
       └─ AuditLog (change history)
```

### Key Features

**1. Many-to-Many Relationships**
- Students can belong to multiple classes
- Classes can have multiple students
- Handled via `StudentClass` join table

**2. Soft Deletes**
- No actual deletes (except cascading foreign keys)
- `active` flags for soft deletion
- Audit log tracks all changes

**3. Versioning & Sync**
- `version` and `serverVersion` fields
- `syncStatus` tracking (synced/pending/failed)
- `SyncQueue` table for offline changes

**4. Conflict Detection**
- `conflictDetected` boolean flag
- `conflictResolutionNote` for manual overrides
- Audit log captures conflicts

**5. Normative Scoring**
- Age-based thresholds (5-12 years)
- Gender-specific rules (for ASTS)
- JSON storage for flexible threshold types

---

## 🔧 Prisma Commands

### Development

```bash
# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Create migration (development)
npm run prisma:migrate

# Push schema without migrations (faster for prototyping)
npm run db:push

# Seed database with initial data
npm run prisma:seed

# Open Prisma Studio (GUI for database)
npm run prisma:studio
```

### Production

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed production database
npm run db:seed
```

---

## 📝 Schema Highlights

### Assessment Record (Core Data Model)

```prisma
model AssessmentRecord {
  id                 String   @id @default(uuid())
  studentId          String
  assessmentId       String
  elementScores      Json     // { "comp1": 1, "comp2": 0 }
  totalScore         Decimal?
  normativeLevel     String?  // "Beginning", "Progressing"...
  version            Int      @default(1)
  serverVersion      Int      @default(1)
  syncStatus         String   @default("synced")
  conflictDetected   Boolean  @default(false)
  // ... more fields
}
```

**Why JSON for elementScores?**
- Flexible structure for different assessment types
- Vic FMS: `{ "comp1": 1, "comp2": 0, ... }` (5 components)
- ASTS: `{ "time": 23.5 }`
- Routine: `{ "seq": 3, "creativity": 4, "execution": 3, "variety": 4 }`
- Rock to Stand: `{ "achieved": 1 }`

### Normative Score (Thresholds)

```prisma
model NormativeScore {
  id                     String  @id @default(uuid())
  assessmentId           String
  yearLevel              String
  ageYears               Int?
  gender                 Gender? // For ASTS (gender-specific)
  
  beginningThreshold     Json    // [0, 0] or [0, 65] (ranges)
  progressingThreshold   Json
  achievingThreshold     Json
  excellingThreshold     Json
}
```

**Why JSON for thresholds?**
- Component scores: `[0, 2]` (range)
- Motor quotient: `[0, 65]` (percentage)
- Rubric total: `[0, 5]` (sum range)

---

## 🗃️ Seeded Data Structure

After running `npm run prisma:seed`, you'll have:

### Assessments (14 total)

**Vic FMS (11 skills):**
1. Run (5 components)
2. Vertical Jump (5 components)
3. Leap (5 components)
4. Dodge (5 components)
5. Catch (5 components)
6. Overhand Throw (5 components)
7. Kick (5 components)
8. Punt (5 components)
9. Bounce (5 components)
10. Two-Handed Strike (5 components)
11. Forehand Strike (5 components)

**Special Assessments:**
12. ASTS - Age-Appropriate Sprint Time (time-based, gender-specific)
13. Routine - Gymnastics (4-component rubric)
14. Rock to Stand (binary: achieved/not achieved)

### Normative Scores

- **Ages 5-12**: 8 age groups
- **Per Skill**: 8 normative rules (one per age)
- **ASTS**: 16 rules (8 ages × 2 genders)
- **Total**: ~100+ normative score records

---

## 🔍 Querying Examples

### Get Student with All Assessments

```typescript
const student = await prisma.student.findUnique({
  where: { id: studentId },
  include: {
    assessmentRecords: {
      include: {
        assessment: true,
        assessmentPeriod: true,
      },
    },
    classes: {
      include: {
        class: true,
      },
    },
  },
});
```

### Get Class Assessment Matrix

```typescript
const classData = await prisma.class.findUnique({
  where: { id: classId },
  include: {
    students: {
      include: {
        student: {
          include: {
            assessmentRecords: {
              where: {
                assessmentPeriodId: currentPeriodId,
              },
              include: {
                assessment: true,
              },
            },
          },
        },
      },
    },
  },
});
```

### Get Normative Thresholds for Age & Skill

```typescript
const thresholds = await prisma.normativeScore.findFirst({
  where: {
    assessmentId: assessmentId,
    ageYears: studentAge,
    gender: studentGender, // null for gender-neutral
  },
});
```

---

## 🔐 Security Considerations

### Row-Level Security (Future Enhancement)

Currently handled in application logic. For production, consider:
- Prisma middleware for tenant isolation
- PostgreSQL RLS policies
- API-level permission checks

### Sensitive Data

- Passwords: Hashed with bcrypt (not stored in Prisma schema)
- Audit logs: Store complete change history (GDPR compliance)
- Personal data: Student names, dates of birth (PII - handle carefully)

---

## 📈 Performance Optimization

### Indexes Created

```prisma
@@index([schoolId])         // Fast school lookups
@@index([studentId, assessmentId])  // Fast student progress queries
@@index([classId, assessmentPeriodId])  // Fast class dashboards
@@index([updatedAt])        // Fast recent changes queries
@@index([syncStatus])       // Fast offline sync queries
```

### Query Optimization Tips

1. **Use `select` to limit fields**
   ```typescript
   const students = await prisma.student.findMany({
     select: { id: true, name: true },
   });
   ```

2. **Use `include` strategically**
   ```typescript
   // Good: Only include what you need
   include: { assessmentRecords: { where: { classId } } }
   
   // Bad: Fetching all relations
   include: { assessmentRecords: true } // Could be 1000+ records
   ```

3. **Use pagination for large datasets**
   ```typescript
   const students = await prisma.student.findMany({
     take: 50,
     skip: (page - 1) * 50,
   });
   ```

---

## 🧪 Testing Database

### Reset Database (Development Only)

```bash
# WARNING: This deletes all data!
npx prisma migrate reset

# Seed again
npm run prisma:seed
```

### Create Test Data

```bash
# Create test script (example)
npx tsx scripts/create-test-data.ts
```

---

## 🚨 Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Check PostgreSQL is running: `pg_ctl status`
- Verify DATABASE_URL in .env
- Test connection: `psql $DATABASE_URL`

### Error: "Unique constraint failed"

**Solution:**
- Seed script creates duplicate data
- Reset database: `npx prisma migrate reset`
- Re-run seed: `npm run prisma:seed`

### Error: "Type 'Json' is not assignable"

**Solution:**
- Regenerate Prisma Client: `npm run prisma:generate`
- Restart TypeScript server in VS Code

### Slow Queries

**Solution:**
- Check missing indexes: `EXPLAIN ANALYZE` in PostgreSQL
- Add indexes to schema.prisma
- Use `select` to limit fields returned

---

## 📚 Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Prisma Schema Reference**: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- **Project Design Docs**: `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md`

---

## ✅ Next Steps After Setup

1. **Verify seed data**: Open Prisma Studio (`npm run prisma:studio`)
2. **Test queries**: Create test script to verify relationships
3. **Setup Next.js**: Initialize Next.js app structure
4. **Create API routes**: Reference `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md`
5. **Build UI components**: Reference `3_UI_WIREFRAMES/`

---

**Schema Version:** 1.0  
**Last Updated:** January 1, 2026  
**Status:** ✅ Ready for Development
