'use client'

import { getStocks } from "@/data/cage"
import { useQuery } from "@tanstack/react-query"


export const useStockQuery = () =>{
    return useQuery({
        queryKey: ["stocks"],
        queryFn: getStocks
    })
}
