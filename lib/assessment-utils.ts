import type { NormativeLevel, NormativeThreshold } from '@/types'

/**
 * Calculate normative level based on total score and thresholds
 * Based on skills.json normative threshold structure
 */
export function calculateNormativeLevel(
  score: number,
  thresholds: NormativeThreshold
): NormativeLevel {
  const { beginning, progressing, achieving, excelling } = thresholds

  // Excelling check (highest)
  if (score >= excelling[0] && score <= excelling[1]) {
    return 'excelling'
  }

  // Achieving check
  if (score >= achieving[0] && score <= achieving[1]) {
    return 'achieving'
  }

  // Progressing check
  if (score >= progressing[0] && score <= progressing[1]) {
    return 'progressing'
  }

  // Beginning (default/lowest)
  return 'beginning'
}

/**
 * Get normative level color class for Tailwind
 */
export function getNormativeLevelColor(level?: NormativeLevel): string {
  switch (level) {
    case 'excelling':
      return 'bg-excelling text-white'
    case 'achieving':
      return 'bg-achieving text-white'
    case 'progressing':
      return 'bg-progressing text-white'
    case 'beginning':
      return 'bg-beginning text-white'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}

/**
 * Get normative level display text
 */
export function getNormativeLevelText(level?: NormativeLevel): string {
  if (!level) return 'Not Assessed'
  return level.charAt(0).toUpperCase() + level.slice(1)
}

/**
 * Calculate total score from element scores
 */
export function calculateTotalScore(elementScores: Record<string, number | boolean>): number {
  return Object.values(elementScores).reduce<number>((sum, score) => {
    if (typeof score === 'boolean') {
      return sum + (score ? 1 : 0)
    }
    return sum + (score || 0)
  }, 0)
}

/**
 * Get age from date of birth
 */
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Get year level from age (Australian system)
 */
export function getYearLevelFromAge(age: number): string {
  if (age <= 5) return 'Foundation'
  if (age >= 6 && age <= 12) return `Year ${age - 5}`
  return 'Unknown'
}
