'use client'

import NoticeList from "@/components/blocks/NoticeList"
import { SidebarInset } from "@/components/ui/sidebar"
import { AddNotice } from '@/components/ui/NoticeAdd'
const page = () => {

  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex justify-between"><AddNotice /></div>

            <div><NoticeList /></div>


          </div>
        </div>
      </div>
    </SidebarInset>
  )
}

export default page
