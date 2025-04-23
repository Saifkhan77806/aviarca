import SectionTitle from '@/components/blocks/headers/SectionTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const bonusAllocation = () => {
  return (
    <div>
      <SectionTitle title='Allocate bonus' description='Allocate bonus to the when the employee will complete their goals and do extra tasks' />
      <div>
        <Input placeholder='Search your employee' />
      </div>

      <div className='flex max-sm:flex-col-reverse gap-2 w-full my-5 '>
        <div className='bg-accent flex flex-col gap-2 rounded-md w-1/2 max-sm:w-full shadow-xs p-1'>
          <Input type='number' placeholder='Allocate bonuses' />
<Button>Add bonus</Button>

<div>
  <p className='text-center'>bonus: 234</p>
  <p className='text-center'>bonus added to the email: saifkhan@mfc.com</p>
</div>
        </div>
        

        {/* profile */}
        <div className='bg-muted rounded-md w-1/2 max-sm:w-full shadow-2xs p-1 flex flex-col items-center'>
        {/* images */}
          <div className='w-40 h-40 max-md:w-20 max-md:h-20 rounded-full bg-black'></div>

          <div className='text-center my-2 flex flex-col gap-2'>
            <p className='font-semibold'>Saif</p>
            <p>saifkhan@mfc.com</p>
            <p>bonus: 234</p>
            <p>total bonus: 500</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default bonusAllocation