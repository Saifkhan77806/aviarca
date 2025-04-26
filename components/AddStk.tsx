'use client'
import { saveBill } from '@/app/actions/add-invoice';
import { useState, useRef, useMemo } from 'react';

export default function InvoiceBuilder() {
  const [partyName, setPartyName] = useState('');
  const [address, setAddress] = useState('');
  const [billNo, setBillNo] = useState('');
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    quantity: '',
    productName: '',
    hsnCode: '',
    gst: '',
    rate: ''
  });

  const inputRefs = useRef([]);

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

    setFormData({ quantity: '', productName: '', hsnCode: '', gst: '', rate: '' });
    inputRefs.current[0]?.focus();
  };

  const updateItem = () => {
    const updatedItems = [...items];
    const { quantity, productName, hsnCode, gst, rate } = formData;
    const { total, gstAmount } = calculateTotal(quantity, rate, gst);
    updatedItems[selectedIndex!] = { quantity, productName, hsnCode, gst, rate, gstAmount, total };
    setItems(updatedItems);
    setFormData({ quantity: '', productName: '', hsnCode: '', gst: '', rate: '' });
    setSelectedIndex(null);
    inputRefs.current[0]?.focus();
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setFormData({ quantity: '', productName: '', hsnCode: '', gst: '', rate: '' });
    }
  };

  const handleRowClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setFormData({ quantity: '', productName: '', hsnCode: '', gst: '', rate: '' });
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

  const totalAmount = useMemo(() => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    console.log('Total Amount:', total);
    return total;
  }, [items]);

  const handleSubmit = () => {
    const invoiceData = {
      partyName,
      address,
      billNo,
      items,
      totalAmount
    };
    // console.log(JSON.stringify(invoiceData, null, 2));
    if(invoiceData.partyName == "" || invoiceData.address== "" || invoiceData.billNo == "" ) alert("Please all the fields")
    console.log(invoiceData);

    saveBill(invoiceData).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })

  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Party Name"
        value={partyName}
        required
        onChange={(e) => setPartyName(e.target.value)}
      />
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Address"
        value={address}
        required
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="Bill No."
        value={billNo}
        required
        onChange={(e) => setBillNo(e.target.value)}
      />

      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">HSN Code</th>
            <th className="border p-2">GST (%)</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">GST Amt</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
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

      <div className="flex gap-2 flex-wrap mb-4">
        {['quantity', 'productName', 'hsnCode', 'gst', 'rate'].map((field, index) => (
          <input
            key={field}
            ref={(el) => (inputRefs.current[index] = el)}
            type={field === 'productName' ? 'text' : 'number'}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="border p-2"
            value={(formData as any)[field]}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
        <button className="border p-2 bg-blue-500 text-white" onClick={selectedIndex !== null ? updateItem : addItem}>
          {selectedIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="text-right font-bold text-lg mb-4">Total: ₹{totalAmount.toFixed(2)}</div>

      <button className="border p-2 bg-green-600 text-white w-full" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
