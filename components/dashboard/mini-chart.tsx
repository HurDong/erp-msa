"use client"

import { AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer } from "recharts"

interface MiniChartProps {
  data: number[]
  type: "line" | "bar" | "area" | "dual"
  index: number
  color: string
}

export function MiniChart({ data, type, index, color }: MiniChartProps) {
  const chartData = data.map((value, i) => ({ value, index: i }))

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            animationDuration={1500}
            animationBegin={500 + index * 100}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationBegin={500 + index * 100}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#gradient-${index})`}
            animationDuration={1500}
            animationBegin={500 + index * 100}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (type === "dual") {
    const previousData = data.map((val) => val * 1.05)
    const dualData = data.map((value, i) => ({
      current: value,
      previous: previousData[i],
      index: i,
    }))

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dualData}>
          <Line
            type="monotone"
            dataKey="previous"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            opacity={0.4}
            strokeDasharray="3 3"
            animationDuration={1500}
            animationBegin={500 + index * 100}
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            animationDuration={1500}
            animationBegin={700 + index * 100}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return null
}
