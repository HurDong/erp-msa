"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, FileText, ArrowUp, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export function AccountingOverview() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      title: "총 매출",
      value: 485000,
      displayValue: "₩485,000",
      change: "+23%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "이번 달 기준",
      gradient: "from-sky-400/20 to-sky-500/20",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      borderColor: "border-l-sky-400",
    },
    {
      title: "총 지출",
      value: 312000,
      displayValue: "₩312,000",
      change: "-5%",
      trend: "down" as const,
      icon: TrendingDown,
      description: "이번 달 기준",
      gradient: "from-rose-400/20 to-rose-500/20",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      borderColor: "border-l-rose-400",
    },
    {
      title: "순이익",
      value: 173000,
      displayValue: "₩173,000",
      change: "+15%",
      trend: "up" as const,
      icon: DollarSign,
      description: "이번 달 기준",
      gradient: "from-emerald-400/20 to-emerald-500/20",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      borderColor: "border-l-emerald-400",
    },
    {
      title: "미결제 송장",
      value: 24,
      displayValue: "24건",
      change: "+8건",
      trend: "up" as const,
      icon: FileText,
      description: "결제 대기중",
      gradient: "from-amber-400/20 to-amber-500/20",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      borderColor: "border-l-amber-400",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className={`relative overflow-hidden border-l-4 ${stat.borderColor} bg-gradient-to-br ${stat.gradient} backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-3xl`}
            style={{
              animationDelay: `${index * 100}ms`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-sm`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-800">{mounted ? stat.displayValue : "0"}</div>

                <div className="flex items-center gap-1.5">
                  {stat.trend === "up" ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ArrowUp className="h-3.5 w-3.5" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-rose-600">
                      <ArrowDown className="h-3.5 w-3.5" />
                      <span className="text-sm font-semibold">{stat.change}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-500">지난 달 대비</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
