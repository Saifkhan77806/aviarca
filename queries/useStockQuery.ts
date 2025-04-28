'use client'

import { deleteStock } from "@/app/actions/delete-stock"
import { getStocks } from "@/data/cage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useStockQuery = () =>{
    return useQuery({
        queryKey: ["stocks"],
        queryFn: getStocks
    })
}


export function useDeleteStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stocks'] })
    }
  })
}

