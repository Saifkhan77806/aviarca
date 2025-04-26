'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/db';
import Link from 'next/link';
import { getRmBill } from '@/data/bill';

export default function ViewRawMaterialBill() {
  const queryClient = useQueryClient();

  const { data: bills = [], isLoading } = useQuery({
    queryKey: ['rawMaterialBills'],
    queryFn: getRmBill
    ,
  });


  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await db.bill.delete({ where: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterialBills'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleUpdateNavigation = (id: string) => {
    console.log("updated bill")
    // update coded for rm bill
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Raw Material Bills</h1>
      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="border p-2">Party Name</th>
            <th className="border p-2">Bill No</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill: any) => (
            <tr key={bill.id}>
              <td className="border p-2">{bill.partyName}</td>
              <td className="border p-2">{bill.billNo}</td>
              <td className="border p-2">₹{bill.totalAmount}</td>
              <td className="border p-2 flex gap-2">
                <Link href={`/manager/update-rm-bill?id=${bill.id}`}><button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleUpdateNavigation(bill.id)}
                >
                  Update
                </button>
                </Link>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(bill.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optionally you can also display Items for each Bill here */}
    </div>
  );
}
