import SectionTitle from '@/components/blocks/headers/SectionTitle'
import NoticeList from '@/components/blocks/NoticeList'
import { AddNotice } from '@/components/ui/NoticeAdd'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SidebarInset } from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const managerNotice = () => {
  return (

    <SidebarInset>
      <SectionTitle title="Manager Notices" description='manager can send notices to employees ' />
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between">
          <Select defaultValue="outline">
          <SelectTrigger
            className="flex justify-between w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
      <Tabs>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Employee</TabsTrigger>
          <TabsTrigger value="focus-documents">Manager</TabsTrigger>
        </TabsList>
        </Tabs>

        <AddNotice />
     
          </div>

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