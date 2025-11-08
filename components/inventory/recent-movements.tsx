"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Package } from "lucide-react"

export function RecentMovements() {
  const movements = [
    {
      id: 1,
      product: "무선 마우스",
      sku: "SKU-1234",
      type: "in",
      quantity: 50,
      location: "창고 A",
      date: "2024년 3월 12일",
      time: "오전 10:30",
    },
    {
      id: 2,
      product: "사무용 의자",
      sku: "SKU-2345",
      type: "out",
      quantity: 12,
      location: "매장 #1",
      date: "2024년 3월 12일",
      time: "오전 09:15",
    },
    {
      id: 3,
      product: "노트북 거치대",
      sku: "SKU-3456",
      type: "in",
      quantity: 30,
      location: "창고 B",
      date: "2024년 3월 11일",
      time: "오후 04:45",
    },
    {
      id: 4,
      product: "USB-C 케이블",
      sku: "SKU-4567",
      type: "out",
      quantity: 75,
      location: "매장 #2",
      date: "2024년 3월 11일",
      time: "오후 02:20",
    },
    {
      id: 5,
      product: '모니터 27"',
      sku: "SKU-5678",
      type: "in",
      quantity: 15,
      location: "창고 A",
      date: "2024년 3월 11일",
      time: "오전 11:00",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-200 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-lilac-100 to-lilac-200">
          <Package className="h-5 w-5 text-lilac-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">최근 입출고 내역</h3>
          <p className="text-xs text-gray-500">가장 최근 재고 이동 기록이에요</p>
        </div>
      </div>
      <div className="space-y-3">
        {movements.map((movement, index) => (
          <motion.div
            key={movement.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-200 hover:border-lilac-200 hover:bg-lilac-50/30"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                movement.type === "in"
                  ? "bg-gradient-to-br from-mint-100 to-mint-200 text-mint-600"
                  : "bg-gradient-to-br from-peach-100 to-peach-200 text-peach-600"
              }`}
            >
              {movement.type === "in" ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{movement.product}</div>
              <div className="text-sm text-gray-500">{movement.sku}</div>
            </div>
            <div className="text-center">
              <Badge
                className={`rounded-full ${
                  movement.type === "in"
                    ? "bg-mint-100 text-mint-700 hover:bg-mint-200"
                    : "bg-peach-100 text-peach-700 hover:bg-peach-200"
                }`}
              >
                {movement.type === "in" ? "입고" : "출고"} {movement.quantity}개
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{movement.location}</div>
              <div className="text-xs text-gray-500">
                {movement.date} • {movement.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
