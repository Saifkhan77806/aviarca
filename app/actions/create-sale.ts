'use server';

import { db } from '@/lib/db';
import { saleSchemaFrontend } from '@/schema';
import { z } from 'zod';

export async function createSales(input: z.infer<typeof saleSchemaFrontend>) {
  try {
    // Step 1: Validate full input (stockName + quantity)
    const validatedData = saleSchemaFrontend.parse(input);

    // Step 2: Check if stockName exists
    const stock = await db.stock.findUnique({
      where: { name: validatedData.stockName },
    });

    if (!stock) {
      throw new Error('Stock item not found!');
    }

    const {cost, mrp} = stock

    // Step 3: Create the sales record
    const sale = await db.sales.create({
      data: {
        stockName: validatedData.stockName,
        quantity: validatedData.quantity,
        cost,
        mrp
      },
    });

    return { success: "Sales is added !" };
  } catch (error) {
    console.error('Error creating sales:', error);

    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Invalid input' };
    }

    return { success: false, error: (error as Error).message };
  }
}
