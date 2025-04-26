'use server';

import { db } from '@/lib/db';

export async function updateRawMaterialBillAction(data: {
  id: string;
  partyName: string;
  address: string;
  billNo: string;
  items: any[];
  totalAmount: number;
}) {
  try {
    const updatedBill = await db.bill.update({
      where: { id: data.id },
      data: {
        partyName: data.partyName,
        address: data.address,
        billNo: data.billNo,
        items: data.items,
        totalAmount: data.totalAmount,
      },
    });

    return { success: true, data: updatedBill };
  } catch (error) {
    console.error('Error updating bill:', error);
    return { success: false, error: 'Failed to update bill' };
  }
}
