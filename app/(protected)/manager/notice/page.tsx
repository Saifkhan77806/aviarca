import SectionTitle from '@/components/blocks/headers/SectionTitle'
import NoticeList from '@/components/blocks/NoticeList'
import { AddNotice } from '@/components/ui/NoticeAdd'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'

const managerNotice = () => {
  return (

    <SidebarInset>
      <SectionTitle title="Manager Notices" description='manager can send notices to employees ' />
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between"><AddNotice /></div>

          <div>
            <NoticeList />
          </div>

          
        </div>
      </div>
    </div>
  </SidebarInset>
  )
}

export default managerNotice