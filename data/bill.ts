'use server';

import { db } from "@/lib/db"


export const getRmBill = async () =>{
 const rm = await db.bill.findMany({
        include: { items: true },
      });
      return rm;
}

export const getBillById = async (id: string | null) => {
  if (!id) return null;

  const bill = await db.bill.findUnique({
    where: { id },
    include: { items: true },
  });

  return bill;
};





export const updateBill = async (id: string | null, updatedBill: any) => {
  if (!id) throw new Error('ID is required for updating');

  const { partyName, address, billNo, items, totalAmount } = updatedBill;

  const updated = await db.bill.update({
    where: { id },
    data: {
      partyName,
      address,
      billNo,
      totalAmount,
      items: {
        deleteMany: {}, // Delete all previous items
        create: items,   // Create new ones
      },
    },
  });

  return updated;
};
