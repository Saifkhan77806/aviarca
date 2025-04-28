import NoticeData from "@/components/blocks/NoticeData"
import { useNoticeData } from "@/queries/useNoticeQuery"


const NoticeList = () => {

  
  const { data, isPending } = useNoticeData()


  return (
    <div className="flex flex-col gap-2">

      {
        data?.map((e,key)=>{
          return(
            <NoticeData date="12-4-2025" key={key} subject={e.subject} description={e.description}  role={e.role} />
          )
        })
      }
    
   


    </div>
  )
}

export default NoticeList
