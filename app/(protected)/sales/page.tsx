'use client'

import { AddSalesBtn } from '@/components/add-sale-btn'
import { AddStockBtn } from '@/components/add-stock-btn'
import ReportCard from '@/components/blocks/ReportCard'
import { Input } from '@/components/ui/input'

const AttendanceReport = () => {
  


  return (
    <div>
      <ReportCard
        title="Add & View sales report"
        description="Manager and owner can add sales "
      >
        <div className="flex flex-col gap-2">
          <div className='flex gap-2'>
            <Input
              placeholder="Search your employee"
            />
            <AddSalesBtn />
          </div>

          <div className="flex max-sm:flex-col gap-2">
            {/* List */}
            <div className="w-1/2 max-sm:w-full flex flex-col gap-2 bg-muted p-2 rounded-md">
              
            </div>

            {/* Graph */}
            <div className="w-1/2 max-sm:w-full bg-muted p-2 rounded-md">
              Graph
            </div>
          </div>
        </div>
      </ReportCard>
    </div>
  )
}

export default AttendanceReport
