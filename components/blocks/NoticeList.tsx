'use client'

import NoticeData from "@/components/blocks/NoticeData"
import { useNoticeData } from "@/queries/useNoticeQuery"
import {HashLoader} from 'react-spinners'


const NoticeList = () => {

  
  const { data, isPending } = useNoticeData()

  if (isPending) return <div className='flex items-center justify-center h-full'>
      <HashLoader />
    </div>


  return (
    <div className="flex flex-col gap-2">

      {
        data?.map((e,key)=>{
          return(
            <NoticeData key={key} date={e.createdAt} subject={e.subject} description={e.description}  role={e.role} />
          )
        })
      }
    
   


    </div>
  )
}

export default NoticeList
