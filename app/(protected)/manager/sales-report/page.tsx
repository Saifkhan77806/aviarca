import ReportCard from '@/components/blocks/ReportCard'
import VerifyAttData from '@/components/blocks/VerifyAttData'
import { Input } from '@/components/ui/input'
import React from 'react'

const salesReport = () => {
  return (
    <div>
      <ReportCard title='Sales Report' description='Manager can see sales report graphically and download it. '>
        <div className='flex flex-col gap-2'>
          <div>
            <Input placeholder='Search your employee' />
          </div>

          <div className='flex max-sm:flex-col gap-2'>
            {/* data */}
            <div className='w-1/2 flex flex-col gap-2 bg-muted p-2 rounded-md max-sm:w-full'>
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
              <VerifyAttData name='Raw Material' email='Wire Steel rod' />
              <VerifyAttData name='cage' email='Rabbit stainless cage' />
            </div>

            {/* graphically */}
            <div className='w-1/2 bg-muted p-2 rounded-md max-sm:w-full'>
              <h1>Graph</h1>
            </div>

          </div>
        </div>
      </ReportCard>

    </div>
  )
}

export default salesReport