# PE Assessment Platform - Getting Started

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database

**Option A: Use Local PostgreSQL**
```bash
# Update .env with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/pe_assessment?schema=public"
```

**Option B: Use Docker PostgreSQL (Recommended)**
```bash
docker run --name pe-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=pe_assessment -p 5432:5432 -d postgres:16
```

Then update `.env`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/pe_assessment?schema=public"
```

### 3. Initialize Database
```bash
# Create database tables
npm run prisma:migrate

# Seed with skills data (14 assessments from skills.json)
npm run prisma:seed
```

### 4. Generate NEXTAUTH_SECRET
```bash
# Generate a secret key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and update `.env`:
```
NEXTAUTH_SECRET="your-generated-secret-here"
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── dashboard/        # Main dashboard & classes
│   │   └── layout.tsx        # Dashboard layout with nav
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── classes/         # Class CRUD
│   │   ├── students/        # Student management
│   │   └── assessments/     # Assessment data
│   ├── login/               # Login page
│   └── layout.tsx           # Root layout
├── components/
│   ├── assessment/          # Assessment grid components
│   ├── ui/                  # Reusable UI components
│   └── providers.tsx        # React Query + NextAuth providers
├── lib/
│   ├── assessment-utils.ts  # Normative scoring logic
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── prisma/
│   ├── schema.prisma       # Database schema (11 tables)
│   └── seed.ts             # Database seeding script
└── 2_DATA_DEFINITIONS/
    └── skills.json         # 14 assessments with normative thresholds
```

---

## 🔐 First User Setup

Since there's no registration UI yet, create your first user directly:

### Option 1: Using Prisma Studio
```bash
npm run prisma:studio
```
1. Open http://localhost:5555
2. Click on `User` table
3. Add a new record with hashed password

### Option 2: Using API Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@school.edu",
    "password": "password123",
    "name": "Test Teacher",
    "role": "TEACHER"
  }'
```

### Option 3: Using Prisma CLI
```bash
# First, hash a password
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('password123', 10).then(console.log)"

# Then insert directly
npx prisma db execute --stdin < seed-user.sql
```

---

## 📊 What's Implemented

### ✅ Core Features
- [x] Authentication (NextAuth.js with credentials)
- [x] User roles (TEACHER, ADMINISTRATOR, PRINCIPAL)
- [x] Dashboard with class overview
- [x] Class management (list, create, view)
- [x] Assessment entry grid (high-density checkbox interface)
- [x] API routes for classes, students, assessments
- [x] Normative scoring utilities
- [x] Database schema with 11 tables
- [x] Offline sync architecture (schema ready)

### 🚧 TODO (Phase 2)
- [ ] Class creation form
- [ ] Student import from CSV (Compass format)
- [ ] Assessment period selector
- [ ] Student profile view with progress charts
- [ ] Class dashboard with analytics
- [ ] Normative level calculation (needs threshold data seeded)
- [ ] Autosave functionality
- [ ] Conflict resolution UI
- [ ] Offline mode (PWA + IndexedDB)

---

## 🎨 UI Components

Based on wireframes in `3_UI_WIREFRAMES/`:
- Dashboard (01_Dashboard.md) - ✅ Implemented
- Class List (02_Class_List.md) - ✅ Implemented  
- Assessment Entry (03_Assessment_Entry.md) - ✅ Basic grid implemented
- Student Profile (04_Student_Profile.md) - ⏳ Pending
- Class Dashboard (05_Class_Dashboard.md) - ⏳ Pending

---

## 🗄️ Database Schema

11 tables:
- `users` - Teachers, admins, principals
- `schools` - Organizations
- `classes` - Year/term groups
- `students` - Individual students
- `student_classes` - Many-to-many join table
- `assessments` - Skill definitions (Run, Jump, etc.)
- `assessment_elements` - Components within skills
- `assessment_periods` - Semester/term tracking
- `assessment_records` - Individual student assessments
- `normative_scores` - Age-based thresholds
- `sync_queue` - Offline sync tracking
- `imports` - CSV import history
- `audit_log` - Change history

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db execute --stdin <<< "SELECT 1"
```

### Prisma Client Not Generated
```bash
npx prisma generate
```

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Clear All Data and Restart
```bash
npx prisma migrate reset
npm run prisma:seed
```

---

## 📚 Documentation

- **Technical Design**: `1_ARCHITECTURE_DESIGN/TECHNICAL_DESIGN_DOCUMENT.md`
- **Database Strategy**: `1_ARCHITECTURE_DESIGN/DATABASING_AND_STORAGE_STRATEGY.md`
- **Prisma Guide**: `prisma/README.md`
- **Skills Data**: `2_DATA_DEFINITIONS/skills.json`

---

## 🚢 Next Steps

1. **Test the application**: Create a user, log in, create a class
2. **Seed test data**: Add students manually or via API
3. **Try assessment entry**: Select a skill and start assessing
4. **Build missing features**: See TODO list above
5. **Deploy**: Vercel or Docker deployment (instructions in tech doc)

**Questions?** Check the technical design document or Prisma schema comments.
