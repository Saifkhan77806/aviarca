// app/attendance/page.tsx
'use client'

import { monthArr } from '@/data/month'
import React from 'react'

type Attendance = {
  id: string
  userId: string
  year: number
  month: number // 1-12
  day: number // 1-31
  status: 'PRESENT' | 'ABSENT' | null
}

const attendanceData: Attendance[] = [
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 1,
    day: 1,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 1,
    day: 2,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 2,
    day: 28,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 7,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 8,
    day: 21,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 9,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 22,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 10,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 12,
    day: 25,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7fwac0001sploo2ey1bd7',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 26,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7ibmy0000sp5k8lex0z7u',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 25,
    status: 'PRESENT',
  },
  {
    id: 'cm9x7nuvh0001sp5kbdakrkff',
    userId: 'cm9w1aui40000spu8coioj316',
    year: 2025,
    month: 3,
    day: 24,
    status: 'ABSENT',
  },
]

export default function AttendanceGrid({attendace}: {attendace: Attendance[]}) {
  // Create a lookup map
  const statusMap = new Map<string, 'PRESENT' | 'ABSENT' | null>()
  attendace?.forEach(({ month, day, status }) => {
    statusMap.set(`${month}-${day}`, status)
  })

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Attendance Grid</h1>
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(31, 1fr)`,
          gridTemplateRows: `repeat(12, 1fr)`,
          gap: '1px',
        }}
      >
        {Array.from({ length: 12 }).map((_, rowIndex) => {
          const month = rowIndex + 1
          return Array.from({ length: 31 }).map((_, colIndex) => {
            const day = colIndex + 1
            const key = `${month}-${day}`
            const status = statusMap.get(key)

            const bgColor =
              status === 'PRESENT'
                ? 'bg-green-500'
                : status === 'ABSENT'
                ? 'bg-red-500'
                : 'bg-gray-100'

            return (
              <div
                key={key}
                className={`w-3 h-3 ${bgColor} border border-gray-200`}
                title={`Month ${monthArr[month - 1]}, Day ${day}`}
              ></div>
            )
          })
        })}
      </div>
    </div>
  )
}
