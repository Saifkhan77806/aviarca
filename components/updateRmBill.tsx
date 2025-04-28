// /app/update-rawmaterial-bill/UpdateRawMaterialBill.tsx

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';

export default function UpdateRawMaterialBill({ initialBill }: { initialBill: any }) {
//   const router = useRouter();
  const queryClient = useQueryClient();
  const id = initialBill.id;

  const [partyName, setPartyName] = useState(initialBill.partyName);
  const [address, setAddress] = useState(initialBill.address);
  const [billNo, setBillNo] = useState(initialBill.billNo);
  const [items, setItems] = useState(initialBill.items || []);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    quantity: '',
    productName: '',
    hsnCode: '',
    gst: '',
    rate: ''
  });

  const inputRefs = useRef<any[]>([]);

  const updateMutation = useMutation({
    mutationFn: async (updatedBill: any) => {
        
      await db.bill.update({
        where: { id: String(id) },
        data: updatedBill,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterialBills'] });
    //   router.push('/view-rawmaterial-bill');
    },
  });

  const calculateTotal = (quantity: string, rate: string, gst: string) => {
    const subtotal = parseFloat(quantity) * parseFloat(rate);
    const gstAmount = subtotal * (parseFloat(gst) / 100);
    return { total: subtotal + gstAmount, gstAmount };
  };

  const addItem = () => {
    const { quantity, productName, hsnCode, gst, rate } = formData;
    if (!quantity || !productName || !hsnCode || !gst || !rate) return;
    const { total, gstAmount } = calculateTotal(quantity, rate, gst);
    setItems([...items, { quantity, productName, hsnCode, gst, rate, gstAmount, total }]);
    clearForm();
  };

  const updateItem = () => {
    const updatedItems = [...items];
    const { quantity, productName, hsnCode, gst, rate } = formData;
    const { total, gstAmount } = calculateTotal(quantity, rate, gst);
    updatedItems[selectedIndex!] = { quantity, productName, hsnCode, gst, rate, gstAmount, total };
    setItems(updatedItems);
    clearForm();
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_ : any, i : any) => i !== index);
    setItems(updatedItems);
    if (selectedIndex === index) {
      clearForm();
    }
  };

  const clearForm = () => {
    setFormData({ quantity: '', productName: '', hsnCode: '', gst: '', rate: '' });
    setSelectedIndex(null);
    inputRefs.current[0]?.focus();
  };

  const handleRowClick = (index: number) => {
    if (selectedIndex === index) {
      clearForm();
    } else {
      const item = items[index];
      setFormData({
        quantity: item.quantity,
        productName: item.productName,
        hsnCode: item.hsnCode,
        gst: item.gst,
        rate: item.rate
      });
      setSelectedIndex(index);
      inputRefs.current[0]?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowUp') {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      selectedIndex !== null ? updateItem() : addItem();
    }
  };

  const totalAmount = useMemo(() => {
    return items.reduce((acc: any, item: any) => acc + item.total, 0);
  }, [items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      partyName,
      address,
      billNo,
      items,
      totalAmount
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Raw Material Bill</h1>

      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Party Name"
        value={partyName}
        disabled={updateMutation.isPending}
        onChange={(e) => setPartyName(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Address"
        value={address}
        disabled={updateMutation.isPending}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="Bill No."
        value={billNo}
        disabled={updateMutation.isPending}
        onChange={(e) => setBillNo(e.target.value)}
      />

      {/* Table */}
      <table className="w-full border mb-4">
        <thead>
          <tr>
            {['Quantity', 'Product Name', 'HSN Code', 'GST (%)', 'Rate', 'GST Amt', 'Total', 'Actions'].map((title) => (
              <th key={title} className="border p-2">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, index : any) => (
            <tr
              key={index}
              className={`cursor-pointer ${selectedIndex === index ? 'bg-green-200' : ''}`}
              onClick={() => handleRowClick(index)}
            >
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">{item.productName}</td>
              <td className="border p-2">{item.hsnCode}</td>
              <td className="border p-2">{item.gst}</td>
              <td className="border p-2">{item.rate}</td>
              <td className="border p-2">{item.gstAmount.toFixed(2)}</td>
              <td className="border p-2">{item.total.toFixed(2)}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input Form */}
      <div className="flex gap-2 flex-wrap mb-4">
        {['quantity', 'productName', 'hsnCode', 'gst', 'rate'].map((field, index) => (
          <input
            key={field}
            ref={(el) => (inputRefs.current[index] = el)}
            type={field === 'productName' ? 'text' : 'number'}
            name={field}
            disabled={updateMutation.isPending}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="border p-2"
            value={(formData as any)[field]}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
        <Button
          className="border p-2 text-white"
          onClick={selectedIndex !== null ? updateItem : addItem}
        >
          {selectedIndex !== null ? 'Update' : 'Add'}
        </Button>
      </div>

      <div className="text-right font-bold text-lg mb-4">Total: ₹{totalAmount.toFixed(2)}</div>

      <Button className="border p-2  text-white w-full" onClick={handleSubmit}>
        Update
      </Button>
    </div>
  );
}
