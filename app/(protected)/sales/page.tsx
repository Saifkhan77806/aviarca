'use client'

import { AddSalesBtn } from '@/components/add-sale-btn'
import ReportCard from '@/components/blocks/ReportCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useDeleteSale, useSaleQuery } from '@/queries/useSalequery'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Trash2 } from 'lucide-react'
import { deleteSale } from '@/data/sale'
import { SkeletonDemo } from '@/components/blocks/Skeleton'

const AttendanceReport = () => {
  const { data: sales = [], isPending } = useSaleQuery()
  const [selectedSalesIds, setSelectedSalesIds] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  function toggleSaleSelection(id: string) {
    setSelectedSalesIds(prev =>
      prev.includes(id) ? prev.filter(saleId => saleId !== id) : [...prev, id]
    )
  }

  function toggleSelectAll(filteredSales: typeof sales) {
    const filteredIds = filteredSales.map((sale) => sale.id)
    const isAllSelected = filteredIds.every((id) => selectedSalesIds.includes(id))

    if (isAllSelected) {
      // Deselect all
      setSelectedSalesIds((prev) => prev.filter((id) => !filteredIds.includes(id)))
    } else {
      // Select all
      setSelectedSalesIds((prev) => [...new Set([...prev, ...filteredIds])])
    }
  }

  // Apply search filter
  const filteredSales = sales.filter((sale) =>
    sale.stockName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const { mutate: deleteSale, isPending: isDeleting } = useDeleteSale()


  const selectedSales = sales.filter(sale => selectedSalesIds.includes(sale.id))

  return (
    <div>
      <ReportCard
        title="Add & View sales report"
        description="Manager and owner can add sales"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search your stock"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddSalesBtn />
            <Button
              variant="secondary"
              onClick={() => toggleSelectAll(filteredSales)}
            >
              Select All
            </Button>
          </div>

          <div className="flex max-sm:flex-col gap-2">
            {/* List */}
            <div className="w-1/2 max-sm:w-full flex flex-col gap-2 p-2 rounded-md max-h-[400px] overflow-y-auto">

              {
                isPending ? (<SkeletonDemo />) : (
                  filteredSales.map((sale) => (
                    <div
                      key={sale.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedSalesIds.includes(sale.id) ? 'bg-green-100' : ''
                        }`}
                    >
                      <div
                        className="flex items-center gap-2"
                        onClick={() => toggleSaleSelection(sale.id)}
                      >
                        <Checkbox checked={selectedSalesIds.includes(sale.id)} />
                        <div>
                          <div className="font-semibold">{sale.stockName}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(sale.createdAt).toLocaleDateString()} — {sale.quantity} qty
                          </div>
                        </div>
                      </div>
    
                      {/* Delete Button */}
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteSale(sale.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )
              }

            </div>

            {/* Graph */}
            <div className="w-1/2 max-sm:w-full bg-muted p-2 rounded-md">
              {selectedSales.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  Select sales to view the graph
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedSales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="createdAt"
                      tickFormatter={(str) => new Date(str).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const sale = payload[0].payload;
                        return (
                          <div className="bg-white p-2 rounded-md shadow-md text-sm">
                            <div><strong>Stock Name:</strong> {sale.stockName}</div>
                            <div><strong>Quantity:</strong> {sale.quantity}</div>
                            <div><strong>Date:</strong> {new Date(sale.createdAt).toLocaleDateString()}</div>
                          </div>
                        )
                      }
                      return null;
                    }} />
                    <Line
                      type="monotone"
                      dataKey="quantity"
                      stroke="#22c55e"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

              )}
            </div>
          </div>
        </div>
      </ReportCard>
    </div>
  )
}

export default AttendanceReport
