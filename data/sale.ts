'use server'

import { db } from "@/lib/db"



export const getSale = async () =>{

    const sale = await db.sales.findMany()


    return sale

}


export async function deleteSale(id: string) {
    try {
      await db.sales.delete({
        where: { id }
      })  // or wherever your page is
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, message: "Failed to delete sale" }
    }
  }