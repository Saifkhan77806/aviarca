'use client'

import ReportCard from '@/components/blocks/ReportCard'
import VerifyAttData from '@/components/blocks/VerifyAttData'
import AttendanceGrid from '@/components/testGrapAtt'
import { Input } from '@/components/ui/input'
import { getUserWithAtt } from '@/data/user'
import { useQuery } from '@tanstack/react-query'
import React, { useState, useMemo } from 'react'
import { SkeletonDemo } from '../blocks/Skeleton'

const AttendanceSection = () => {
  const { data, isPending } = useQuery({
    queryKey: ['getUserWithAtt'],
    queryFn: getUserWithAtt,
  })


  const [search, setSearch] = useState('')
  const [selectedData, setSelectedData] = useState<Attendance[] | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)


  type Attendance = {
    id: string
    userId: string
    year: number
    month: number
    day: number
    status: 'PRESENT' | 'ABSENT' | null
  }

  const selectData = (attendance: Attendance[],  userId: string) => {
    setSelectedData(attendance)
    setSelectedUserId(userId)
  }

  // 🔍 Filter logic using useMemo for performance
  const filteredData = useMemo(() => {
    if (!data) return []
    return data.filter((user) => {
      const query = search.toLowerCase()
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      )
    })
  }, [data, search])

  return (
    <div>
      <ReportCard
        title="Attendance Report"
        description="Manager can see attendance of the employee graphically"
      >
        <div className="flex flex-col gap-2">
          <div>
            <Input
              placeholder="Search your employee"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex max-sm:flex-col gap-2">
            {/* List */}
            <div className="w-1/2 max-sm:w-full flex flex-col gap-2  p-2 rounded-md">
              {isPending ? (
                <SkeletonDemo />
              ) : (
                filteredData.map((el, key) => {
                  const isSelected = selectedUserId === el.id
                  return (
                    <div
                      key={key}
                      onClick={() => selectData(el.attendance, el.id)}
                      className={`flex w-full items-center gap-2 p-2 rounded-md cursor-pointer ${
                        isSelected ? 'bg-green-100' : ''
                      }`}
                    >
                      {/* ✅ green tick */}
                      {isSelected && <span className="text-green-600">✅</span>}
                
                      {/* User data */}
                      <VerifyAttData
                        name={el.name as string}
                        email={el.email as string}
                      />
                    </div>
                  )
                })
                
              )}
            </div>

            {/* Graph */}
            <div className="w-1/2 max-sm:w-full bg-muted p-2 rounded-md">
              {selectedData && <AttendanceGrid attendace={selectedData} />}
            </div>
          </div>
        </div>
      </ReportCard>
    </div>
  )
}

export default AttendanceSection
