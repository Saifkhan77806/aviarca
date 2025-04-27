'use server'

import { db } from "@/lib/db"


export const getStockByName = async (name: string) =>{

   const cage =  await db.stock.findMany({
        where:{
            name
        }
    })

    return cage

}