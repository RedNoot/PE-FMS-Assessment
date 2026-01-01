import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/classes - List all classes for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const classes = await prisma.class.findMany({
      where: {
        teacherId: session.user.id,
      },
      include: {
        _count: {
          select: { students: true },
        },
      },
      orderBy: {
        year: 'desc',
      },
    })

    const classesWithCount = classes.map((c) => ({
      ...c,
      studentCount: c._count.students,
    }))

    return NextResponse.json({
      success: true,
      data: classesWithCount,
    })
  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const createClassSchema = z.object({
  name: z.string().min(1),
  yearLevel: z.string(),
  term: z.string().optional(),
  year: z.number(),
  schoolId: z.string(),
})

// POST /api/classes - Create a new class
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
    const data = createClassSchema.parse(body)

    const newClass = await prisma.class.create({
      data: {
        ...data,
        teacherId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      data: newClass,
      message: 'Class created successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating class:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
