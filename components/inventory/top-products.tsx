"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export function TopProducts() {
  const products = [
    {
      id: 1,
      name: "기계식 키보드",
      sales: 342,
      revenue: "$48,230",
      trend: "+12%",
    },
    {
      id: 2,
      name: '모니터 27"',
      sales: 289,
      revenue: "$86,700",
      trend: "+8%",
    },
    {
      id: 3,
      name: "인체공학 마우스",
      sales: 256,
      revenue: "$12,800",
      trend: "+15%",
    },
    {
      id: 4,
      name: "책상 조명",
      sales: 198,
      revenue: "$9,900",
      trend: "+5%",
    },
    {
      id: 5,
      name: "웹캠 HD",
      sales: 187,
      revenue: "$18,700",
      trend: "+10%",
    },
  ]

  const colors = ["sky", "mint", "lilac", "peach", "sky"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-mint-100 to-mint-200">
          <TrendingUp className="h-5 w-5 text-mint-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">베스트 판매 제품</h3>
          <p className="text-xs text-gray-500">가장 많이 팔린 상위 5개 제품</p>
        </div>
      </div>
      <div className="space-y-3">
        {products.map((product, index) => {
          const color = colors[index]
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-200 hover:border-mint-200 hover:bg-mint-50/30"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-${color}-100 to-${color}-200 text-lg font-bold text-${color}-700`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">{product.sales}개 판매</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{product.revenue}</div>
                <div className="text-sm font-medium text-mint-600">{product.trend}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
