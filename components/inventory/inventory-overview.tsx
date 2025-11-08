"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Archive, Package, TrendingUp } from "lucide-react"

export function InventoryOverview() {
  const stats = [
    {
      title: "전체 제품",
      value: "1,248",
      icon: Package,
      description: "이번 달 85개 추가",
      gradient: "from-sky-100 to-sky-200",
      iconColor: "text-sky-600",
      glowColor: "shadow-sky-200/50",
    },
    {
      title: "총 재고 가치",
      value: "$1.2M",
      icon: TrendingUp,
      description: "지난 달 대비 +8%",
      gradient: "from-mint-100 to-mint-200",
      iconColor: "text-mint-600",
      glowColor: "shadow-mint-200/50",
    },
    {
      title: "재고 부족",
      value: "23",
      icon: AlertTriangle,
      description: "주문이 필요해요",
      gradient: "from-peach-100 to-peach-200",
      iconColor: "text-peach-600",
      glowColor: "shadow-peach-200/50",
    },
    {
      title: "품절 제품",
      value: "8",
      icon: Archive,
      description: "재발주 필요",
      gradient: "from-lilac-100 to-lilac-200",
      iconColor: "text-lilac-600",
      glowColor: "shadow-lilac-200/50",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.gradient} p-6 shadow-lg ${stat.glowColor} transition-all duration-200 hover:shadow-xl`}
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`rounded-2xl bg-white/60 p-3 ${stat.iconColor} backdrop-blur-sm`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-gray-600">{stat.description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </motion.div>
        )
      })}
    </div>
  )
}
