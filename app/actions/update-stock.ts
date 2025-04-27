'use server'

import { db } from "@/lib/db"
import { stockSchemaWithImg } from "@/schema"
import { z } from "zod"

export const updateStocks = async (values: z.infer<typeof stockSchemaWithImg>, id: any) =>{

    const validateData = stockSchemaWithImg.safeParse(values)

    
    if(!validateData.success) return {error: "invalid fields"}
    
    const {name, quantity, mrp, cost, cage} = validateData.data

    await db.stock.update({
        where:{id},
        data:{
                name,
                quantity,
                mrp, 
                cost, 
                cage
            }
        })
    
        return {success: "Cage porduct is Updated !"}
    

}