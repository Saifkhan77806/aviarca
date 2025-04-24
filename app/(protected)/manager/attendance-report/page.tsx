import ReportCard from '@/components/blocks/ReportCard'
import VerifyAttData from '@/components/blocks/VerifyAttData'
import { Input } from '@/components/ui/input'
import React from 'react'

const attendanceReport = () => {
  return (
    <div>
      <ReportCard title='Attendance Report' description='Manager can see attendance of the employee graphically'>
        <div className='flex flex-col gap-2'>
          <div>
            <Input placeholder='Search your employee' />
          </div>

          <div className='flex max-sm:flex-col gap-2'>
            {/* data */}
            <div className='w-1/2 max-sm:w-full flex flex-col gap-2 bg-muted p-2 rounded-md'>

          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' />








            </div>

            {/* graphically */}
            <div className='w-1/2 max-sm:w-full bg-muted p-2 rounded-md'>
              <h1>Graph</h1>
            </div>

          </div>
        </div>
      </ReportCard>

    </div>
  )
}

export default attendanceReport