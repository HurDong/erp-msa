"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function UserRoleDistribution() {
  const data = [
    { name: "Admin", value: 12, color: "hsl(var(--chart-1))" },
    { name: "Manager", value: 45, color: "hsl(var(--chart-2))" },
    { name: "Employee", value: 248, color: "hsl(var(--chart-3))" },
    { name: "Contractor", value: 37, color: "hsl(var(--chart-4))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
