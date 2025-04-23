import React from 'react'
import { Input } from '@/components/ui/input'
import SalaryData from '@/components/blocks/SalaryData'

const SalaryContent = () => {
  return (
    <div>
        <div>
            <Input placeholder='Search your employee' />
        </div>

        <div className='mt-5'>

            {/* employe salary */}
            <div className='flex flex-col gap-2'>
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
                <SalaryData name="Employe name" email="Employee email" position="position" salaryPaid={2300} salaryLeft={500} />
            </div>

        </div>

    </div>
  )
}

export default SalaryContent