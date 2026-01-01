// Core type definitions from skills.json and database schema

export type UserRole = 'TEACHER' | 'ADMINISTRATOR' | 'PRINCIPAL'
export type Gender = 'MALE' | 'FEMALE' | 'OTHER'
export type AssessmentPeriodType = 'SEMESTER' | 'TERM' | 'YEAR' | 'QUARTER'
export type NormativeLevel = 'beginning' | 'progressing' | 'achieving' | 'excelling'
export type SyncStatus = 'synced' | 'pending' | 'failed'

// User types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  schoolId?: string
  createdAt: Date
  updatedAt: Date
}

// School types
export interface School {
  id: string
  name: string
  location?: string
  createdAt: Date
  updatedAt: Date
}

// Class types
export interface Class {
  id: string
  schoolId: string
  yearLevel: string
  teacherId: string
  name: string
  term?: string
  year: number
  createdAt: Date
  updatedAt: Date
  studentCount?: number
}

// Student types
export interface Student {
  id: string
  schoolId: string
  name: string
  dateOfBirth: Date
  gender: Gender
  yearLevel: string
  createdAt: Date
  updatedAt: Date
}

// Assessment Framework types
export interface Assessment {
  id: string
  name: string
  description?: string
  framework: string // 'Vic FMS', 'ASTS', 'Routine', 'Rock to Stand'
  active: boolean
  version: number
  createdAt: Date
  updatedAt: Date
  elements?: AssessmentElement[]
}

export interface AssessmentElement {
  id: string
  assessmentId: string
  name: string
  description?: string
  order: number
  createdAt: Date
}

export interface AssessmentPeriod {
  id: string
  schoolId: string
  name: string
  startDate: Date
  endDate: Date
  type: AssessmentPeriodType
  year: number
  createdAt: Date
}

// Assessment Record types
export interface ElementScores {
  [elementId: string]: number | boolean
}

export interface AssessmentRecord {
  id: string
  studentId: string
  classId: string
  assessmentId: string
  assessmentPeriodId: string
  elementScores: ElementScores
  totalScore?: number
  normativeLevel?: NormativeLevel
  notes?: string
  version: number
  serverVersion: number
  lastSyncedAt?: Date
  syncStatus: SyncStatus
  conflictDetected: boolean
  conflictResolutionNote?: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

// Normative Score types
export interface NormativeThreshold {
  beginning: [number, number]
  progressing: [number, number]
  achieving: [number, number]
  excelling: [number, number]
}

export interface NormativeScore {
  id: string
  assessmentId: string
  yearLevel: string
  ageYears?: number
  gender?: Gender
  beginningThreshold: any
  progressingThreshold: any
  achievingThreshold: any
  excellingThreshold: any
}

// Skill Component from skills.json
export interface SkillComponent {
  name: string
  ageExpectancy: string
}

// Skill Definition from skills.json
export interface SkillDefinition {
  id: string
  name: string
  category: string
  type: 'component' | 'time' | 'rubric' | 'binary'
  components?: SkillComponent[]
  normativeThresholds?: {
    [age: string]: NormativeThreshold
  }
  rubric?: {
    levels: {
      score: number
      label: string
      description: string
    }[]
  }
}

// Skills JSON structure
export interface SkillsData {
  version: string
  generated: string
  skillCount: number
  skills: SkillDefinition[]
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form types for assessment entry
export interface AssessmentEntryFormData {
  classId: string
  assessmentId: string
  assessmentPeriodId: string
  studentRecords: {
    studentId: string
    elementScores: ElementScores
    notes?: string
  }[]
}

// Dashboard types
export interface ClassSummary extends Class {
  studentCount: number
  assessmentCount: number
  lastAssessmentDate?: Date
}

export interface StudentAssessmentSummary {
  studentId: string
  studentName: string
  assessments: {
    assessmentId: string
    assessmentName: string
    normativeLevel?: NormativeLevel
    totalScore?: number
    completedAt?: Date
  }[]
}
