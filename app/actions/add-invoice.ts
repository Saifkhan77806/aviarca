'use server';
import { db } from '@/lib/db';
import { billSchema } from '@/schema';
import * as z from 'zod'

type BillInput = z.infer<typeof billSchema>;

export async function saveBill(rawData: unknown) {
  try {
    // Validate first
    const billData = billSchema.parse(rawData);

    // Proceed only if validation passes
    const newBill = await db.bill.create({
      data: {
        partyName: billData.partyName,
        address: billData.address,
        billNo: billData.billNo,
        totalAmount: billData.totalAmount,
        items: {
          create: billData.items.map(item => ({
            quantity: parseInt(item.quantity, 10),
            productName: item.productName,
            hsnCode: item.hsnCode,
            gst: parseFloat(item.gst),
            rate: parseFloat(item.rate),
            gstAmount: item.gstAmount,
            total: item.total,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return { success: true, data: newBill };
  } catch (error) {
    console.error('Error saving bill:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, error: (error as Error).message };
  }
}