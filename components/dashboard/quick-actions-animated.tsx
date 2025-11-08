"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, Package, UserPlus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function QuickActionsAnimated() {
  const actions = [
    {
      title: "새로운 동료 맞이하기",
      icon: UserPlus,
      href: "/hr/employees/new",
      description: "직원 온보딩",
      color: "#A8C5FF",
      bgGradient: "from-[#A8C5FF]/10 to-[#A8C5FF]/5",
    },
    {
      title: "인보이스 생성하기",
      icon: FileText,
      href: "/accounting/invoices/new",
      description: "새로운 청구서",
      color: "#C9BAFF",
      bgGradient: "from-[#C9BAFF]/10 to-[#C9BAFF]/5",
    },
    {
      title: "재고 추가하기",
      icon: Package,
      href: "/inventory/add",
      description: "재고 수준 업데이트",
      color: "#AEE2D2",
      bgGradient: "from-[#AEE2D2]/10 to-[#AEE2D2]/5",
    },
    {
      title: "지출 기록하기",
      icon: DollarSign,
      href: "/accounting/expenses/new",
      description: "비즈니스 지출 로그",
      color: "#FFD3B4",
      bgGradient: "from-[#FFD3B4]/10 to-[#FFD3B4]/5",
    },
  ]

  const handleActionClick = (title: string) => {
    toast.success(`${title} 페이지로 이동합니다...`, {
      duration: 2000,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <Card className="overflow-hidden border-none bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">오늘 할 일</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2"
        >
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={action.href} onClick={() => handleActionClick(action.title)}>
                  <Button
                    variant="outline"
                    className="group relative h-auto w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border-none p-6 transition-all duration-300 bg-transparent"
                    style={{
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient}`} />

                    <div className="relative z-10 flex w-full items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300"
                        style={{
                          backgroundColor: action.color,
                          opacity: 0.15,
                        }}
                      >
                        <Icon className="h-7 w-7" style={{ color: action.color }} />
                      </motion.div>

                      <div className="flex-1 text-left">
                        <span className="text-base font-semibold text-foreground">{action.title}</span>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>

                      <motion.div
                        className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <span className="text-xl font-bold" style={{ color: action.color }}>
                          →
                        </span>
                      </motion.div>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </CardContent>
    </Card>
  )
}
