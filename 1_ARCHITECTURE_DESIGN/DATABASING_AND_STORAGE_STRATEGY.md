# PE Assessment Platform - Databasing & Storage Strategy

**Version:** 1.0  
**Date:** January 1, 2026  
**Status:** Architecture Definition - Foundation for All Phases

---

## Executive Summary

This document specifies the complete data storage, synchronization, and persistence architecture for the PE Assessment Platform. It defines how data flows between client and server, how offline mode works, when/how autosave happens, and how conflicts are resolved. **This architecture must be built into Phase 1 MVP.**

---

## 1. Storage Architecture Overview

### 1.1 Multi-Layer Data Storage Model

```
┌─────────────────────────────────────────────────────────────┐
│  USER BROWSER (Client)                                      │
│  ┌────────────────┐       ┌──────────────────────┐         │
│  │ React State    │       │ IndexedDB            │         │
│  │ (TanStack      │       │ (Offline Cache)      │         │
│  │  Query Cache)  │       │ - Full assessment DB │         │
│  │                │       │ - Sync queue         │         │
│  └────────────────┘       │ - Timestamps         │         │
│                           └──────────────────────┘         │
│                                    ↑                        │
│  Service Worker (PWA)              │                        │
│  - Sync background tasks           │                        │
│  - Periodic sync attempts          │                        │
│  - Offline detection               │                        │
└────────────────────────────────────┼─────────────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │ (WebSocket or HTTP)  │                      │
              │                      │                      │
┌─────────────▼──────────────────────▼──────────────────────┐
│  NEXT.JS API SERVER (Backend)                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ API Routes (app/api/...)                             │ │
│  │ - POST /assessments/save (create/update)             │ │
│  │ - GET /assessments/[id]                              │ │
│  │ - POST /sync (batch sync queue)                       │ │
│  │ - GET /sync/status                                   │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Business Logic & Validation                          │ │
│  │ - Permission checks                                  │ │
│  │ - Data validation                                    │ │
│  │ - Conflict resolution                                │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Prisma ORM                                           │ │
│  │ - Database abstraction                               │ │
│  │ - Migration management                               │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                          ↑
                          │ SQL Queries
                          │
┌──────────────────────────▼─────────────────────────────────┐
│  DATABASE (PostgreSQL - Primary)                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ Tables:                                              │ │
│  │ - users, schools, classes, students                 │ │
│  │ - assessments, assessment_elements                  │ │
│  │ - assessment_records (≈5,000-50,000 per school)    │ │
│  │ - sync_queue, sync_history                          │ │
│  │ - audit_log (immutable)                             │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Three Data Zones

| Zone | Location | Purpose | Online? | Offline? | Persistence |
|------|----------|---------|---------|----------|--------------|
| **Transient** | React State (TanStack Query) | Current UI state, form inputs, immediate user interaction | ✅ | ❌ | Until page refresh |
| **Cache** | IndexedDB (Browser) | Local copies of server data, pending changes, sync queue | ✅ | ✅ | Until cleared (weeks) |
| **Primary** | PostgreSQL (Server) | Single source of truth, audit logs, all historical data | ✅ | ❌ | Permanent |

---

## 2. Autosave & Real-Time Sync Strategy

### 2.1 Autosave Behavior (Core to MVP)

**Trigger Points:**
1. **Field-level autosave (3-5 second debounce)**
   - When user enters data in assessment form (checkboxes, dropdowns, time inputs)
   - Debounce to avoid excessive requests
   - Show visual indicator: "Saving..." → "✓ Saved"

2. **Row-level save (explicit save button)**
   - Save entire row of student data at once
   - Faster for bulk entry workflow
   - Button shows: "Save Row" with checkmark on success

3. **Batch save (End of Session)**
   - Save all pending changes when user closes assessment page
   - Prevents data loss if browser crashes

### 2.2 Save Flow Diagram

```
User enters data (checkbox click)
    ↓
Update React state (TanStack Query)
    ↓
Debounce timer starts (3 seconds)
    ↓
User still typing? → Reset timer
User stops typing → Proceed
    ↓
Prepare payload: { studentId, assessmentId, changes, timestamp }
    ↓
[ONLINE?] → POST /api/assessments/save
    ↓ YES
Add to IndexedDB sync queue
Send to server
    ↓
Server validates (permission, data integrity)
    ↓
Server saves to PostgreSQL
    ↓
Server returns: { recordId, savedAt, hash }
    ↓
Update React state with server response
    ↓
Show "✓ Saved at 14:23"
    ↓
[OFFLINE?]
    ↓ YES
Add to IndexedDB sync queue
Show "⏳ Pending (Offline)"
    ↓
Connection restored?
    ↓ YES
Retry POST /api/assessments/save (with queue)
    ↓
Sync complete → Show "✓ Synced"
```

### 2.3 Autosave Configuration (Built-in from Phase 1)

```typescript
// app/config/autosave.ts
export const AUTOSAVE_CONFIG = {
  // Debounce settings
  fieldDebounceMs: 3000,        // 3 second delay before saving single field
  rowDebounceMs: 5000,           // 5 second delay for row save
  
  // Retry settings
  maxRetries: 3,
  retryDelayMs: 2000,            // Start at 2 seconds
  retryBackoffFactor: 2,         // Exponential backoff: 2s, 4s, 8s
  
  // Batch settings
  syncBatchSize: 50,             // Sync max 50 changes per request
  syncIntervalMs: 10000,         // Check for pending changes every 10 seconds
  
  // Timeouts
  requestTimeoutMs: 30000,       // 30 second timeout per request
  
  // UI feedback
  showSavingIndicator: true,
  showSyncStatus: true,
  showOfflineIndicator: true,
};
```

---

## 3. Offline-First Architecture

### 3.1 Offline Data Storage (IndexedDB)

**Why IndexedDB (not localStorage)?**
- localStorage: 5-10 MB limit, synchronous, slow
- IndexedDB: 100+ MB limit, asynchronous, fast, supports complex queries

**IndexedDB Schema (mirrors PostgreSQL):**

```javascript
// Database name: "PEAssessmentApp"
// Version: 1

const DB_SCHEMA = {
  stores: {
    // Read-only master data
    skills: { keyPath: "id", indexes: ["name"] },
    students: { keyPath: "id", indexes: ["classId", "schoolId"] },
    classes: { keyPath: "id", indexes: ["schoolId"] },
    assessments: { keyPath: "id", indexes: ["framework"] },
    
    // Mutable assessment data
    assessmentRecords: { 
      keyPath: "id", 
      indexes: ["studentId", "classId", "assessmentId", "createdAt"],
      metadata: { 
        lastSyncedAt: null,
        syncStatus: "synced" | "pending" | "failed",
        conflictResolution: "server" | "client"
      }
    },
    
    // Sync queue (critical for offline)
    syncQueue: { 
      keyPath: "id",
      indexes: ["status", "createdAt", "recordId"],
      fields: {
        id: string,              // Auto-generated
        recordId: string,        // assessment_record id
        action: "create" | "update" | "delete",
        payload: object,         // Changes to sync
        timestamp: number,       // When queued
        retries: number,         // Retry count
        status: "pending" | "syncing" | "failed",
        error?: string,          // Last error message
      }
    },
    
    // Offline metadata
    metadata: {
      keyPath: "key",
      fields: {
        lastFullSyncAt: number,
        isOnline: boolean,
        pendingCount: number,
      }
    }
  }
};
```

### 3.2 Offline Detection & Sync Strategy

```typescript
// hooks/useOnlineStatus.ts
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

// lib/offlineSync.ts
export class OfflineSync {
  async queueChange(recordId: string, changes: object) {
    const isOnline = navigator.onLine;
    
    if (isOnline) {
      // Attempt immediate sync
      return this.syncToServer(recordId, changes);
    } else {
      // Queue for later
      return this.addToSyncQueue(recordId, changes);
    }
  }
  
  async syncPendingChanges() {
    const db = await openDB("PEAssessmentApp");
    const queue = await db.getAll("syncQueue");
    
    for (const item of queue) {
      if (item.status === "pending") {
        try {
          await this.syncToServer(item.recordId, item.payload);
          await db.delete("syncQueue", item.id);
        } catch (error) {
          item.retries++;
          if (item.retries > 3) {
            item.status = "failed";
            item.error = error.message;
          }
          await db.put("syncQueue", item);
        }
      }
    }
  }
}

// Service Worker: Listen for online event and trigger sync
self.addEventListener('online', async () => {
  console.log('Connection restored - syncing pending changes');
  const sync = new OfflineSync();
  await sync.syncPendingChanges();
});
```

### 3.3 Offline UI Behavior

| Scenario | UI Feedback | Behavior |
|----------|-------------|----------|
| **User enters data (Online)** | "Saving..." → "✓ Saved" | Immediate server save |
| **User enters data (Offline)** | "⏳ Pending (offline)" | Queued in IndexedDB |
| **Connection drops mid-save** | "⚠ Failed to save" + Retry btn | Queued, will retry on reconnect |
| **User tries to leave page (Offline)** | "You have unsaved changes" | Prevent navigation, show queue |
| **Connection restored** | "Syncing pending changes..." → "✓ All changes synced" | Background sync attempt |
| **Sync fails 3x** | "⚠ Sync failed - Check connection" | Manual retry button |

---

## 4. Conflict Resolution Strategy

### 4.1 Conflict Detection

**Scenario:** Teacher A and B both edit same student's assessment simultaneously

```
Time  Teacher A              Teacher B              Server State
────  ─────────────────────  ─────────────────────  ────────────
T0    Fetch assessment       Fetch assessment       { version: 1 }
      (version: 1)           (version: 1)

T5    Edit: Run (5 comps)    (still editing)
      POST save (v1→v2)      
                             Save succeeds
                             Server state: v2

T8                           Edit: Run (different)
                             POST save (v1→v2)      ← CONFLICT!
                             Expected v1, got v2
```

### 4.2 Conflict Resolution Rules

**Strategy: Last-Write-Wins with Field-Level Merge**

```typescript
// server/lib/conflictResolution.ts
export async function resolveConflict(
  incomingChange: AssessmentRecord,
  serverRecord: AssessmentRecord,
  clientVersion: number,
  serverVersion: number
) {
  if (clientVersion === serverVersion) {
    // No conflict - apply change
    return { status: "applied", record: incomingChange };
  }
  
  // Conflict detected - merge at field level
  const merged = {
    ...serverRecord,
    // Take only the fields that were actually changed in the incoming request
    ...incomingChange,
    // Always use server's timestamp for ordering
    updatedAt: new Date(),
    version: serverVersion + 1,
    conflictResolution: {
      detectedAt: new Date(),
      incomingVersion: clientVersion,
      serverVersion: serverVersion,
      strategy: "field-level-merge"
    }
  };
  
  // Log conflict for audit trail
  await auditLog.create({
    type: "conflict_detected",
    recordId: incomingChange.id,
    incomingVersion: clientVersion,
    serverVersion: serverVersion,
    resolution: "field-level-merge"
  });
  
  return { status: "merged", record: merged, conflict: true };
}
```

**Result:** Users are notified of the merge, can review changes, accept or override

### 4.3 Conflict UI Display

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  Conflict: Another user edited this assessment      │
├─────────────────────────────────────────────────────────┤
│ Field              Your Change      Server Value        │
├─────────────────────────────────────────────────────────┤
│ Run (Components)   ☑☑☑☐☐           ☑☐☐☐☐             │
│ ASTS (Time)        23.5 seconds      24.0 seconds      │
│                                                         │
│ ┌────────────────┐ ┌────────────────┐ ┌─────────────┐  │
│ │ Accept Yours   │ │ Accept Server  │ │ Manual Edit │  │
│ └────────────────┘ └────────────────┘ └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Database Schema (PostgreSQL)

### 5.1 Core Tables

**assessments** (Immutable once created)
```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  framework VARCHAR(50) NOT NULL,  -- "Vic FMS", "ASTS", "Routine", "Rock to Stand"
  active BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(name, framework)
);
```

**assessment_records** (Mutable, tracked)
```sql
CREATE TABLE assessment_records (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id),
  class_id UUID NOT NULL REFERENCES classes(id),
  assessment_id UUID NOT NULL REFERENCES assessments(id),
  assessment_period_id UUID NOT NULL REFERENCES assessment_periods(id),
  
  -- Data fields
  element_scores JSONB NOT NULL,  -- { "comp1": 1, "comp2": 0, ... }
  total_score DECIMAL,
  normative_level VARCHAR(50),    -- "Beginning", "Progressing", etc.
  notes TEXT,
  
  -- Sync & versioning
  version INTEGER DEFAULT 1,
  server_version INTEGER DEFAULT 1,
  last_synced_at TIMESTAMP,
  sync_status VARCHAR(50) DEFAULT 'synced',  -- 'synced', 'pending', 'failed'
  
  -- Audit
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID NOT NULL REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Conflict tracking
  conflict_detected BOOLEAN DEFAULT false,
  conflict_resolution_note TEXT,
  
  INDEX idx_student_assessment (student_id, assessment_id),
  INDEX idx_class_period (class_id, assessment_period_id),
  INDEX idx_updated_at (updated_at)
);
```

**sync_queue** (Server-side tracking)
```sql
CREATE TABLE sync_queue (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  record_id UUID NOT NULL REFERENCES assessment_records(id),
  action VARCHAR(50) NOT NULL,  -- 'create', 'update', 'delete'
  payload JSONB NOT NULL,
  client_version INTEGER,
  
  status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'synced', 'failed'
  retry_count INTEGER DEFAULT 0,
  last_error TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  synced_at TIMESTAMP,
  
  INDEX idx_status_user (status, user_id),
  INDEX idx_record (record_id)
);
```

**audit_log** (Immutable, append-only)
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(255) NOT NULL,
  record_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  conflict_detected BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  
  INDEX idx_record_audit (table_name, record_id),
  INDEX idx_created_at (created_at)
);
```

---

## 6. API Endpoints (Built-in Phase 1)

### 6.1 Assessment Save Endpoint

```typescript
// app/api/assessments/save/route.ts
POST /api/assessments/save

Request:
{
  recordId: string,
  studentId: string,
  assessmentId: string,
  classId: string,
  elementScores: { [key: string]: number },
  clientVersion: number,
  clientTimestamp: number,
}

Response (Success):
{
  status: "success",
  recordId: string,
  serverVersion: number,
  savedAt: ISO8601,
  hash: string,  // For integrity verification
}

Response (Conflict):
{
  status: "conflict",
  recordId: string,
  serverVersion: number,
  serverRecord: { ... },
  resolutionStrategy: "field-level-merge",
}

Response (Error):
{
  status: "error",
  code: "validation_error" | "permission_denied" | "conflict",
  message: string,
}
```

### 6.2 Batch Sync Endpoint

```typescript
// app/api/sync/batch/route.ts
POST /api/sync/batch

Request:
{
  changes: [
    { recordId: string, action: "update", payload: {...}, version: number },
    { recordId: string, action: "create", payload: {...} },
  ],
  lastSyncAt: ISO8601,
}

Response:
{
  status: "success",
  synced: number,
  failed: number,
  conflicts: Array<ConflictInfo>,
  results: [
    { recordId: string, status: "synced" | "failed" | "conflict", ... },
  ],
  serverTime: ISO8601,
}
```

### 6.3 Get Pending Changes Endpoint

```typescript
// app/api/sync/pending/route.ts
GET /api/sync/pending

Response:
{
  pending: [
    { recordId: string, action: "update", payload: {...}, queuedAt: ISO8601 },
  ],
  count: number,
  oldestChangeAge: number,  // ms
}
```

---

## 7. Client-Side Implementation Details

### 7.1 TanStack Query Setup (Caching)

```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      
      // Retry failed requests with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations 2 times
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

### 7.2 Autosave Hook

```typescript
// hooks/useAutosave.ts
export function useAutosave(recordId: string, data: any, debounceMs: number = 3000) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await fetch('/api/assessments/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        // Handle conflict
        const error = await response.json();
        if (error.status === 'conflict') {
          // Show conflict UI
          throw new ConflictError(error);
        }
        throw new Error(error.message);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setSaveStatus('saved');
      setLastSavedAt(new Date());
      // Clear "saved" status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    },
    onError: (error) => {
      setSaveStatus('error');
      // Log to offline sync queue
      if (!navigator.onLine) {
        offlineSync.addToQueue(recordId, data);
      }
    },
  });
  
  // Debounced save
  const triggerSave = useCallback((newData: any) => {
    clearTimeout(timeoutRef.current);
    setSaveStatus('saving');
    
    timeoutRef.current = setTimeout(() => {
      mutation.mutate({
        recordId,
        ...newData,
        clientVersion: 1,  // In real app, track version
        clientTimestamp: Date.now(),
      });
    }, debounceMs);
  }, [recordId, mutation]);
  
  return { triggerSave, saveStatus, lastSavedAt, error: mutation.error };
}
```

### 7.3 Service Worker Registration

```typescript
// app/layout.tsx
'use client';

useEffect(() => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service Worker registered');
      
      // Check for updates every hour
      setInterval(() => reg.update(), 60 * 60 * 1000);
    });
  }
}, []);
```

---

## 8. Data Flow Examples

### 8.1 Scenario: Online Assessment Entry (Happy Path)

```
1. Teacher opens Assessment Entry page
   ↓
2. Selects Grade 3, Run skill
   ↓
3. IndexedDB fetches: Students for this class + Run assessment definition
   ↓
4. TanStack Query caches: [grade3_students], [run_assessment]
   ↓
5. Teacher clicks checkbox: "Run - Component 1" for Student A
   ↓
6. React state updates immediately (optimistic UI)
   ↓
7. useAutosave debounce timer starts (3 seconds)
   ↓
8. Teacher still editing other students...
   ↓
9. Timer expires → POST /api/assessments/save
   ↓
10. Server validates (user permission, data format, student exists)
    ↓
11. Server saves to PostgreSQL
    ↓
12. Server returns: { status: "success", serverVersion: 2 }
    ↓
13. Client receives response
    ↓
14. TanStack Query updates cache
    ↓
15. UI shows: "✓ Saved at 14:23"
    ↓
16. Audit log recorded: user_id, action: "update", old_values, new_values
```

### 8.2 Scenario: Connection Lost Mid-Entry

```
1. Teacher editing (online) → Server saves successfully ✓
   ↓
2. Teacher checks another checkbox
   ↓
3. Browser detects connection loss (503 error on POST)
   ↓
4. useAutosave catches error, checks navigator.onLine
   ↓
5. Adds to IndexedDB sync_queue:
   {
     id: uuid(),
     action: "update",
     recordId: "student-A-run",
     payload: { elementScores: {...}, timestamp: now },
     status: "pending"
   }
   ↓
6. UI shows: "⏳ Pending (offline)" on that field
   ↓
7. Service Worker detects "online" event
   ↓
8. Service Worker triggers background sync:
   GET /api/sync/pending → Returns queued changes
   ↓
9. POST /api/sync/batch with all pending changes
   ↓
10. Server saves all, returns successful IDs
    ↓
11. Service Worker clears sync_queue entries
    ↓
12. UI updates: "✓ All changes synced"
```

### 8.3 Scenario: Conflict Resolution

```
1. Teacher A & B both fetch Student X's assessment (version 1)
   ↓
2. Teacher A saves first: checkboxes 1,2,3
   → Server version becomes 2
   ↓
3. Teacher B saves: checkboxes 2,3,4 (expected version 1)
   ↓
4. Server detects mismatch: clientVersion=1, serverVersion=2
   ↓
5. Server runs conflict resolution:
   - Merge: Take server's run components, replace with B's specific changes
   ↓
6. Server responds with:
   {
     status: "conflict",
     serverRecord: { ...merged data },
     resolutionStrategy: "field-level-merge"
   }
   ↓
7. Client receives conflict response
   ↓
8. ConflictModal appears:
   "Another user edited this. Here's what changed..."
   [Accept Yours] [Accept Server] [Manual Edit]
   ↓
9. Teacher B reviews and clicks "Accept Server"
   ↓
10. Client accepts merged version, audit log records conflict
```

---

## 9. Deployment & Hosting Considerations

### 9.1 Recommended Setup

**Option A: Vercel (Recommended for MVP)**
- Automatic Next.js optimization
- Built-in serverless PostgreSQL support (Vercel Postgres)
- CDN for static assets
- Automatic SSL
- Cost: $0-50/month for MVP scale

**Option B: Self-Hosted (AWS/GCP)**
- More control, custom infrastructure
- AWS RDS for PostgreSQL
- EC2 or App Runner for Next.js backend
- CloudFront CDN
- Cost: $100-200/month

**Option C: Hybrid (Recommended for Production)**
- Vercel for Next.js frontend
- Separate database server (AWS RDS PostgreSQL)
- Better control, cost optimization
- Cost: $50-150/month

### 9.2 Environment Variables (Phase 1)

```env
# .env.local
DATABASE_URL=postgresql://user:password@host:5432/pe_assessment
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=http://localhost:3000 (dev) or https://pe-app.school.edu (prod)

# Optional for analytics
NEXT_PUBLIC_ANALYTICS_ID=<if-using-analytics>
```

---

## 10. Implementation Checklist (Phase 1)

### 10.1 Backend Setup
- [ ] Prisma schema created (use TECHNICAL_DESIGN_DOCUMENT section 5)
- [ ] Database migrations initialized
- [ ] PostgreSQL connection tested
- [ ] Prisma client generated

### 10.2 API Routes
- [ ] POST /api/assessments/save (with conflict detection)
- [ ] GET /api/sync/pending (pending changes)
- [ ] POST /api/sync/batch (batch sync)
- [ ] GET /api/assessments/[id] (fetch single assessment)
- [ ] Middleware for auth + rate limiting

### 10.3 Client-Side Storage
- [ ] IndexedDB schema created
- [ ] IndexedDB initialization module
- [ ] TanStack Query setup
- [ ] useAutosave hook
- [ ] useOnlineStatus hook
- [ ] OfflineSync service implementation

### 10.4 Service Worker
- [ ] SW.js created with offline cache strategy
- [ ] Background sync registration
- [ ] Cache versioning
- [ ] Offline page fallback

### 10.5 UI Components
- [ ] Autosave indicator (Saving... → ✓ Saved)
- [ ] Offline indicator (⚠ Offline Mode)
- [ ] Sync status badge (⏳ Syncing | ✓ Synced | ⚠ Failed)
- [ ] Conflict resolution modal
- [ ] Retry button for failed saves

### 10.6 Testing
- [ ] Unit tests for normative scoring functions
- [ ] Integration tests for API endpoints
- [ ] E2E tests for autosave scenarios
- [ ] Offline simulation tests (DevTools throttle)
- [ ] Conflict resolution tests

### 10.7 Monitoring
- [ ] Error logging (Sentry or similar)
- [ ] Database query monitoring
- [ ] Sync queue monitoring dashboard
- [ ] User-facing error messages

---

## 11. Success Criteria

### 11.1 Data Integrity
✅ **No data loss:** 100% of offline changes synced to server  
✅ **Conflict handling:** All conflicts resolved within 3 seconds  
✅ **Audit trail:** Every change logged with user + timestamp  
✅ **Validation:** All saves validated on server before persisting

### 11.2 User Experience
✅ **Autosave invisible:** User never manually clicks "Save" for individual fields  
✅ **Offline seamless:** App works without internet; user barely notices  
✅ **Fast response:** UI updates optimistically, server confirms within 5 seconds  
✅ **Clear feedback:** User always knows save status (Saving/Saved/Error)

### 11.3 Performance
✅ **Load time < 3 seconds:** Initial page load  
✅ **Autosave latency < 100ms:** Field update to visual feedback  
✅ **Sync latency < 5 seconds:** Pending changes to server confirmed  
✅ **Database queries < 100ms:** Most API responses under 500ms total

### 11.4 Reliability
✅ **99.5% uptime:** Server available except scheduled maintenance  
✅ **Zero data corruption:** All transactions ACID-compliant  
✅ **Recovery from failures:** Auto-retry with exponential backoff  
✅ **Cross-browser support:** Works on Chrome, Firefox, Safari, Edge

---

## 12. Future Enhancements (Phase 2+)

- **WebSocket real-time sync:** Replace polling with WebSocket for instant updates
- **Collaborative editing:** Multiple teachers editing same class simultaneously with live cursors
- **Advanced conflict resolution:** ML-based intelligent merging
- **Data replication:** Backup PostgreSQL to secondary server
- **Horizontal scaling:** Load balancer + multiple Next.js instances
- **GraphQL API:** Alternative to REST for complex queries

---

## References

- Prisma Docs: https://www.prisma.io/docs
- TanStack Query: https://tanstack.com/query/latest
- IndexedDB API: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- Conflict Resolution Strategies: https://en.wikipedia.org/wiki/Operational_transformation

