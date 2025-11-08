"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function RevenueChart() {
  const data = [
    { month: "1월", revenue: 420, expenses: 280 },
    { month: "2월", revenue: 385, expenses: 295 },
    { month: "3월", revenue: 445, expenses: 310 },
    { month: "4월", revenue: 398, expenses: 285 },
    { month: "5월", revenue: 472, expenses: 320 },
    { month: "6월", revenue: 485, expenses: 312 },
  ]

  return (
    <Card className="rounded-3xl bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-blue-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-100 shadow-sm">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">매출 vs 지출 추이</h3>
            <p className="text-sm text-gray-600 mt-0.5">최근 6개월간 재무 흐름을 확인하세요</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "#374151", fontWeight: 600, marginBottom: "4px" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
            <Bar dataKey="revenue" fill="#7dd3fc" name="매출" radius={[12, 12, 0, 0]} animationDuration={800} />
            <Bar dataKey="expenses" fill="#fda4af" name="지출" radius={[12, 12, 0, 0]} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
