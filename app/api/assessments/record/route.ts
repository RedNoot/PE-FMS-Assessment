import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { calculateTotalScore, calculateNormativeLevel } from '@/lib/assessment-utils'

const saveRecordSchema = z.object({
  studentId: z.string(),
  classId: z.string(),
  assessmentId: z.string(),
  assessmentPeriodId: z.string(),
  elementScores: z.record(z.union([z.number(), z.boolean()])),
  notes: z.string().optional(),
})

// POST /api/assessments/record - Save assessment record
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = saveRecordSchema.parse(body)

    // Calculate total score
    const totalScore = calculateTotalScore(data.elementScores)

    // TODO: Fetch normative thresholds and calculate level
    // For now, we'll use a simple calculation
    const normativeLevel = 'progressing' // Placeholder

    // Check if record exists
    const existingRecord = await prisma.assessmentRecord.findFirst({
      where: {
        studentId: data.studentId,
        assessmentId: data.assessmentId,
        assessmentPeriodId: data.assessmentPeriodId,
      },
    })

    let record

    if (existingRecord) {
      // Update existing record
      record = await prisma.assessmentRecord.update({
        where: { id: existingRecord.id },
        data: {
          elementScores: data.elementScores,
          totalScore,
          normativeLevel,
          notes: data.notes,
          updatedBy: session.user.id,
          version: { increment: 1 },
        },
      })
    } else {
      // Create new record
      record = await prisma.assessmentRecord.create({
        data: {
          ...data,
          totalScore,
          normativeLevel,
          createdBy: session.user.id,
          updatedBy: session.user.id,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: record,
      message: 'Assessment saved successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error saving assessment:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
