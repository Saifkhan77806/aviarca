'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteStock(id: string) {
  try {
    await db.stock.delete({
      where: { id }
    })
    revalidatePath('/dashboard/stocks')  // your page path
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to delete stock" }
  }
}
