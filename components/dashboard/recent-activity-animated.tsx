"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, Package, DollarSign, UserPlus, Receipt, LucideIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Activity } from "@/lib/types/dashboard"

type RecentActivityAnimatedProps = {
  activities: Activity[]
}

const iconMap: Record<string, LucideIcon> = {
  employee: UserPlus,
  inventory: Package,
  invoice: FileText,
  expense: DollarSign,
  payroll: Receipt,
}

export function RecentActivityAnimated({ activities }: RecentActivityAnimatedProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <Card className="overflow-hidden border-none bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-muted-foreground/40 bg-white/60 p-6 text-center text-muted-foreground">
            최근 활동 내역을 불러오지 못했습니다.
          </div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
            {activities.map((activity, index) => {
              const ActivityIcon = iconMap[activity.type] ?? FileText
              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  whileHover={{
                    x: 4,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  }}
                  className="relative flex items-start gap-4 rounded-xl border-l-4 p-4 transition-all duration-300"
                  style={{
                    borderLeftColor: activity.color,
                    background: `linear-gradient(90deg, ${activity.color}08, transparent)`,
                  }}
                >
                  <div className="relative">
                    <Avatar
                      className="relative h-12 w-12 border-2"
                      style={{
                        borderColor: activity.color,
                      }}
                    >
                      <AvatarFallback
                        className="text-sm font-bold text-white"
                        style={{
                          backgroundColor: activity.color,
                        }}
                      >
                        {activity.initials}
                      </AvatarFallback>
                    </Avatar>
                    {activity.isNew && (
                      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-400 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <p className="text-sm leading-relaxed text-foreground">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-semibold">{activity.target}</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {activity.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ActivityIcon className="h-3.5 w-3.5" style={{ color: activity.color }} />
                      </div>
                    </div>
                  </div>

                  {activity.isNew && (
                    <Badge
                      variant="secondary"
                      className="border border-red-200 bg-red-50 text-xs font-semibold text-red-600"
                    >
                      New
                    </Badge>
                  )}

                  {index < activities.length - 1 && (
                    <div
                      className="absolute bottom-0 left-4 right-4 h-[1px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${activity.color}20, transparent)`,
                      }}
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          className="mt-6 border-t pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/activity" className="group relative inline-flex items-center gap-2 text-base font-semibold">
            <span className="text-primary">모든 활동 보기</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="text-primary"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  )
}
