import { deleteSale, getSale } from "@/data/sale"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



export const useSaleQuery = () =>{
    return useQuery({
        queryKey: ["sales"],
        queryFn: getSale
    })
}

export function useDeleteSale() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: deleteSale,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['sales'] })
      }
    })
  }