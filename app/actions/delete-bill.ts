'use server';

import { db } from "@/lib/db";

export const deleteBill = async (id: string) => {
      await db.bill.delete({ where: { id } });
    }