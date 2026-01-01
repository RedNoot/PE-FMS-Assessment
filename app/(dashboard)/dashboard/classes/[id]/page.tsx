'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AssessmentGrid from '@/components/assessment/assessment-grid'

async function fetchClass(id: string) {
  const response = await fetch(`/api/classes/${id}`)
  const data = await response.json()
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch class')
  }
  
  return data.data
}

export default function ClassDetailPage() {
  const params = useParams()
  const classId = params.id as string

  const { data: classData, isLoading, error } = useQuery({
    queryKey: ['class', classId],
    queryFn: () => fetchClass(classId),
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading class...</div>
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading class: {(error as Error).message}
      </div>
    )
  }

  const students = classData?.students?.map((sc: any) => sc.student) || []

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <Link href="/dashboard/classes">
          <Button variant="ghost" size="sm">← Back to Classes</Button>
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          {classData?.name}
        </h2>
        <p className="mt-2 text-gray-600">
          Year {classData?.yearLevel} • {classData?.year}
          {classData?.term && ` • ${classData.term}`}
        </p>
      </div>

      {/* Student List Summary */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Students ({students.length})</CardTitle>
            <Button variant="outline" size="sm">
              Import Students
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No students in this class yet
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {students.map((student: any) => (
                <div
                  key={student.id}
                  className="p-2 bg-gray-50 rounded text-sm"
                >
                  {student.name}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment Entry Grid */}
      {students.length > 0 && (
        <AssessmentGrid classId={classId} students={students} />
      )}
    </div>
  )
}
