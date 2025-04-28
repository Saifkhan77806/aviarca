'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { subDays, isAfter } from "date-fns"
import { useSaleQuery } from "@/queries/useSalequery"

// You would pass this as props normally


export const ChartAreaInteractive = () => {
  const [filter, setFilter] = useState<"3m" | "30d" | "7d">("3m")

  const {data: salesData = [] , isPending} = useSaleQuery()

  const filterDate = (date: Date) => {
    const now = new Date()
    if (filter === "3m") {
      return isAfter(date, subDays(now, 90))
    }
    if (filter === "30d") {
      return isAfter(date, subDays(now, 30))
    }
    if (filter === "7d") {
      return isAfter(date, subDays(now, 7))
    }
    return true
  }

  const filteredSales = salesData.filter((sale) => filterDate(sale.createdAt))

  const chartData = (filteredSales.length > 0 ? filteredSales : salesData).map((sale) => ({
    ...sale,
    profit: (sale.mrp - sale.cost) * sale.quantity,
    createdAtFormatted: sale.createdAt.toLocaleDateString(),
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
          <p className="text-muted-foreground text-sm">Total for the selected range</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "3m" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("3m")}
          >
            Last 3 months
          </Button>
          <Button
            variant={filter === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("30d")}
          >
            Last 30 days
          </Button>
          <Button
            variant={filter === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("7d")}
          >
            Last 7 days
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAtFormatted" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-2 rounded-md shadow-md text-sm">
                        <div><strong>Stock Name:</strong> {data.stockName}</div>
                        <div><strong>Quantity:</strong> {data.quantity}</div>
                        <div><strong>Profit:</strong> ₹{data.profit}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                fillOpacity={0.3}
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
