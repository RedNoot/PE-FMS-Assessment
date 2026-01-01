'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Assessment, Student } from '@/types'

interface AssessmentGridProps {
  classId: string
  students: Student[]
}

async function fetchAssessments(): Promise<Assessment[]> {
  const response = await fetch('/api/assessments')
  const data = await response.json()
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch assessments')
  }
  
  return data.data
}

export default function AssessmentGrid({ classId, students }: AssessmentGridProps) {
  const [selectedAssessment, setSelectedAssessment] = useState<string>('')
  const [elementScores, setElementScores] = useState<Record<string, Record<string, boolean>>>({})
  const [saving, setSaving] = useState(false)

  const { data: assessments, isLoading } = useQuery({
    queryKey: ['assessments'],
    queryFn: fetchAssessments,
  })

  const selectedAssessmentData = assessments?.find(a => a.id === selectedAssessment)

  const handleCheckboxChange = (studentId: string, elementId: string, checked: boolean) => {
    setElementScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [elementId]: checked,
      },
    }))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    
    try {
      // Save each student's assessment
      for (const studentId of Object.keys(elementScores)) {
        const response = await fetch('/api/assessments/record', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId,
            classId,
            assessmentId: selectedAssessment,
            assessmentPeriodId: 'temp-period-id', // TODO: Add period selector
            elementScores: elementScores[studentId],
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to save assessment')
        }
      }

      alert('Assessment saved successfully!')
    } catch (error) {
      alert('Error saving assessment: ' + (error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading assessments...</div>
  }

  return (
    <div className="space-y-6">
      {/* Assessment Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedAssessment}
            onChange={(e) => setSelectedAssessment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose a skill...</option>
            {assessments?.map((assessment) => (
              <option key={assessment.id} value={assessment.id}>
                {assessment.name} ({assessment.framework})
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Assessment Grid */}
      {selectedAssessmentData && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedAssessmentData.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedAssessmentData.description}
                </p>
              </div>
              <Button onClick={handleSaveAll} disabled={saving}>
                {saving ? 'Saving...' : 'Save All'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-sm border">
                      Student Name
                    </th>
                    {selectedAssessmentData.elements?.map((element) => (
                      <th
                        key={element.id}
                        className="px-4 py-3 text-center font-semibold text-sm border"
                      >
                        {element.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border font-medium">
                        {student.name}
                      </td>
                      {selectedAssessmentData.elements?.map((element) => (
                        <td key={element.id} className="px-4 py-3 border text-center">
                          <input
                            type="checkbox"
                            checked={elementScores[student.id]?.[element.id] || false}
                            onChange={(e) =>
                              handleCheckboxChange(
                                student.id,
                                element.id,
                                e.target.checked
                              )
                            }
                            className="w-5 h-5 cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
