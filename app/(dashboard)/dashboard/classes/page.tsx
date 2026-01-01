'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ClassSummary } from '@/types'

async function fetchClasses(): Promise<ClassSummary[]> {
  const response = await fetch('/api/classes')
  const data = await response.json()
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch classes')
  }
  
  return data.data
}

export default function ClassesPage() {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
  })

  if (isLoading) {
    return <div className="text-center py-12">Loading classes...</div>
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Error loading classes: {(error as Error).message}
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Classes</h2>
          <p className="mt-2 text-gray-600">
            Manage your classes and students
          </p>
        </div>
        <Button>Create Class</Button>
      </div>

      {classes && classes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">No classes yet</p>
            <Button>Create Your First Class</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes?.map((classItem) => (
            <Link key={classItem.id} href={`/dashboard/classes/${classItem.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{classItem.name}</CardTitle>
                  <div className="text-sm text-gray-500">
                    Year {classItem.yearLevel} • {classItem.year}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-semibold">{classItem.studentCount || 0}</span>
                  </div>
                  {classItem.term && (
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Term:</span>
                      <span className="font-semibold">{classItem.term}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
