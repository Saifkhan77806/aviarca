'use server'

import { db } from "@/lib/db"

export async function deleteStock(id: string) {
  try {
    await db.stock.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to delete stock" }
  }
}
