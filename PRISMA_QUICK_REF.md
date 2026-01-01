# Prisma Quick Reference Card

## 🚀 Setup Commands (Run Once)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
Copy-Item .env.example .env
# Edit .env with your DATABASE_URL

# 3. Create PostgreSQL database
createdb pe_assessment

# 4. Create tables
npm run db:push

# 5. Seed with skills data
npm run prisma:seed

# 6. View data
npm run prisma:studio
```

---

## 📝 Daily Development Commands

```bash
# After schema changes
npm run prisma:generate

# View database in browser
npm run prisma:studio

# Reset & reseed (DELETES ALL DATA!)
npx prisma migrate reset
npm run prisma:seed
```

---

## 🗄️ Database Models (11)

```
User → School → Class → StudentClass → Student → AssessmentRecord
                  ↓                                      ↓
            AssessmentPeriod                        Assessment
                                                         ↓
                                              AssessmentElement
                                              NormativeScore

Support: SyncQueue, Import, AuditLog
```

---

## 🔍 Common Queries

### Get Student with Assessments
```typescript
const student = await prisma.student.findUnique({
  where: { id: studentId },
  include: { assessmentRecords: { include: { assessment: true } } }
});
```

### Get Class Dashboard Data
```typescript
const classData = await prisma.class.findUnique({
  where: { id: classId },
  include: {
    students: {
      include: {
        student: {
          include: { assessmentRecords: true }
        }
      }
    }
  }
});
```

### Get Normative Thresholds
```typescript
const thresholds = await prisma.normativeScore.findFirst({
  where: {
    assessmentId: assessmentId,
    ageYears: studentAge
  }
});
```

---

## 📦 What's Seeded

- **14 Assessments**: 11 Vic FMS + ASTS + Routine + Rock to Stand
- **60+ Components**: 5 per Vic FMS skill + 4 for Routine
- **100+ Thresholds**: Ages 5-12, gender variants for ASTS

---

## 🔗 Quick Links

- **Setup Guide**: `prisma/README.md`
- **Full Schema**: `prisma/schema.prisma`
- **Seed Script**: `prisma/seed.ts`
- **Skills Data**: `2_DATA_DEFINITIONS/skills.json`

---

**Need help?** See `prisma/README.md` for detailed documentation
