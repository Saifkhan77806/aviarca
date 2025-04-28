'use client'

import { AddStockBtn } from '@/components/add-stock-btn'
import ReportCard from '@/components/blocks/ReportCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useDeleteStock, useStockQuery } from '@/queries/useStockQuery'
import { Trash2 } from 'lucide-react'
import {HashLoader} from 'react-spinners'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'

const StockReport = () => {
  const { data: stocks = [], isPending } = useStockQuery()
  const { mutate: deleteStock, isPending: isDeleting } = useDeleteStock()

  const [search, setSearch] = useState('')
  const [selectedStocksIds, setSelectedStocksIds] = useState<string[]>([])

  if (isPending) return <div className='flex items-center justify-center h-full'>
    <HashLoader />
  </div>

  const filteredStocks = stocks.filter((stock: any) =>
    stock.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStockSelection = (id: string) => {
    setSelectedStocksIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const selectAll = () => {
    setSelectedStocksIds(filteredStocks.map((s: any) => s.id))
  }

  const deselectAll = () => {
    setSelectedStocksIds([])
  }

  const selectedStocks = stocks.filter((stock: any) =>
    selectedStocksIds.includes(stock.id)
  )

  return (
    <div>
      <ReportCard title="Add & View stock report" description="Manager and owner can manage stock">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search stock"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AddStockBtn />
            <Button variant="outline" onClick={selectAll}>Select All</Button>
            <Button variant="outline" onClick={deselectAll}>Deselect All</Button>
          </div>

          <div className="flex max-sm:flex-col gap-2">
            {/* List */}
            <div className="w-1/2 max-sm:w-full flex flex-col gap-2 bg-muted p-2 rounded-md">
              {filteredStocks.map((stock: any) => (
                <div
                  key={stock.id}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    selectedStocksIds.includes(stock.id) ? 'bg-green-100' : ''
                  }`}
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => toggleStockSelection(stock.id)}
                  >
                    <Checkbox checked={selectedStocksIds.includes(stock.id)} />
                    <div>
                      <div className="font-semibold">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(stock.createdAt).toLocaleDateString()} — {stock.quantity} pcs
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteStock(stock.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Graph */}
            <div className="w-1/2 max-sm:w-full bg-muted p-2 rounded-md">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedStocks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="createdAt"
                    tickFormatter={(str) => new Date(str).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const stock = payload[0].payload
                      return (
                        <div className="bg-white p-2 rounded-md shadow-md text-sm">
                          <div><strong>Stock Name:</strong> {stock.name}</div>
                          <div><strong>Quantity:</strong> {stock.quantity}</div>
                          <div><strong>Date:</strong> {new Date(stock.createdAt).toLocaleDateString()}</div>
                        </div>
                      )
                    }
                    return null
                  }} />
                  <Line
                    type="monotone"
                    dataKey="quantity"
                    stroke="#22c55e"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </ReportCard>
    </div>
  )
}

export default StockReport
