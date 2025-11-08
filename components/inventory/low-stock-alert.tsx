"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export function LowStockAlert() {
  const lowStockItems = [
    {
      id: 1,
      name: "무선 마우스",
      sku: "SKU-1234",
      current: 15,
      minimum: 50,
      category: "전자제품",
    },
    {
      id: 2,
      name: "사무용 의자",
      sku: "SKU-2345",
      current: 8,
      minimum: 20,
      category: "가구",
    },
    {
      id: 3,
      name: "노트북 거치대",
      sku: "SKU-3456",
      current: 12,
      minimum: 30,
      category: "액세서리",
    },
    {
      id: 4,
      name: "USB-C 케이블",
      sku: "SKU-4567",
      current: 25,
      minimum: 100,
      category: "전자제품",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-100 to-peach-200">
            <AlertTriangle className="h-5 w-5 text-peach-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">재고 부족 알림</h3>
            <p className="text-xs text-gray-500">주문이 필요한 제품이에요</p>
          </div>
        </div>
        <Badge className="rounded-full bg-peach-100 text-peach-700 hover:bg-peach-200">
          {lowStockItems.length}개 제품
        </Badge>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-200 hover:border-peach-200 hover:bg-peach-50/50"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.sku} • {item.category}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-peach-600">
                  {item.current} / {item.minimum}
                </div>
                <Button
                  size="sm"
                  className="mt-2 rounded-full bg-gradient-to-r from-peach-400 to-peach-500 text-white hover:from-peach-500 hover:to-peach-600"
                >
                  재주문
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
