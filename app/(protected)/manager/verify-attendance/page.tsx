import SectionTitle from '@/components/blocks/headers/SectionTitle'
import VerifyAttData from '@/components/blocks/VerifyAttData'
import React from 'react'

const page = () => {
  return (
    <div>
      <div>
        <SectionTitle title='Verify attendance' description='Please verify your employee information before proceeding.' />
      </div>

        <div className='flex flex-col gap-2'>
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
          <VerifyAttData name='saif' email='saifkhan@mfc.com' verify={true} />
        </div>
    </div>
  )
}

export default page