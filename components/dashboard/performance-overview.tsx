"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, Line } from "recharts"
import { motion } from "framer-motion"
import { PerformancePoint } from "@/lib/types/dashboard"

type PerformanceOverviewProps = {
  data: PerformancePoint[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-white p-3 shadow-lg">
        <p className="font-semibold text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name}: ${entry.value}K
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function PerformanceOverview({ data }: PerformanceOverviewProps) {
  if (!data.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="overflow-hidden border-dashed border-muted-foreground/40 bg-white/60 p-6 text-center text-muted-foreground">
          최신 재무 데이터를 아직 불러오지 못했습니다. 잠시 후 다시 확인해주세요.
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="overflow-hidden border-none bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">차분한 재무 관리</CardTitle>
          <p className="text-sm text-muted-foreground">월별 매출 및 트렌드 분석</p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A8C5FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#A8C5FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9BAFF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#C9BAFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" stroke="#6b6b6b" style={{ fontSize: "12px", fontWeight: "500" }} />
                <YAxis stroke="#6b6b6b" style={{ fontSize: "12px", fontWeight: "500" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#A8C5FF"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  animationDuration={2000}
                  animationBegin={800}
                  name="매출"
                  dot={{ fill: "#A8C5FF", r: 5, strokeWidth: 2, stroke: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="#C9BAFF"
                  strokeWidth={3}
                  dot={{ fill: "#C9BAFF", r: 5, strokeWidth: 2, stroke: "#fff" }}
                  animationDuration={2000}
                  animationBegin={1000}
                  name="트렌드"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
