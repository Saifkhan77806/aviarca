'use server'

import { getStockByName } from "@/data/cage"
import { db } from "@/lib/db"
import { stockSchemaWithImg } from "@/schema"
import * as z  from "zod"


export const addStock = async (values: z.infer<typeof stockSchemaWithImg>) =>{

    const validateData = stockSchemaWithImg.safeParse(values)

    if(!validateData.success){
        return {error: "Invalid fields"}
    }

    const { name, cost, mrp, quantity, cage } = validateData.data

    const existingCage = await getStockByName(name);

    if(!existingCage){
        return {success: "Cage is already Existing"}
    }

    await db.stock.create({
        data:{
            name,
            quantity,
            mrp, 
            cost, 
            cage
        }
    })

    return {success: "Cage porduct is created !"}

}