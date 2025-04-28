'use client'

import { addNotice, getNotice } from "@/data/notice"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useNoticeData = () =>{

    return useQuery({
        queryKey: ["notice"],
        queryFn: getNotice
    })
}


export const useAddNoticeData = () =>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addNotice,
        onSuccess: (data) =>{
            console.log(data)
            queryClient.invalidateQueries({queryKey: ["notice"]})
            return data
        }
    })
  

}