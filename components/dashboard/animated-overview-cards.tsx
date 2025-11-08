"use client"

import { motion } from "framer-motion"
import { DollarSign, Package, TrendingDown, TrendingUp, Users, ArrowUp, ArrowDown, LucideIcon } from "lucide-react"
import { useState, useRef } from "react"
import CountUp from "react-countup"
import { MiniChart } from "./mini-chart"
import { OverviewCard } from "@/lib/types/dashboard"

type AnimatedOverviewCardsProps = {
  cards: OverviewCard[]
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  package: Package,
  "dollar-sign": DollarSign,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
}

export function AnimatedOverviewCards({ cards }: AnimatedOverviewCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  if (!cards.length) {
    return (
      <div className="rounded-3xl border border-dashed border-muted-foreground/40 bg-white/60 p-8 text-center text-muted-foreground">
        대시보드 요약 데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </div>
    )
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

  const cardVariants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4`}
    >
      {cards.map((card, index) => {
        const Icon = iconMap[card.icon] ?? Users
        const decimals = card.suffix === "M" || card.value % 1 !== 0 ? 1 : 0

        return (
          <motion.div
            key={card.id}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white p-8 transition-all duration-300"
            style={{
              boxShadow:
                hoveredCard === index
                  ? `0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 3px ${card.color}20`
                  : "0 12px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

            <div
              className="absolute left-0 top-0 h-full w-1.5 rounded-r-full transition-all duration-300"
              style={{
                background: card.color,
                opacity: hoveredCard === index ? 1 : 0.6,
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{card.title}</p>
                  <p className="text-xs text-muted-foreground/80">{card.description}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
                  style={{
                    background: card.color,
                    opacity: 0.15,
                  }}
                >
                  <Icon className="h-7 w-7" style={{ color: card.color }} />
                </motion.div>
              </div>

              {/* Value */}
              <div className="space-y-3">
                <motion.div
                  className="text-5xl font-bold tracking-tight text-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  {card.prefix}
                  <CountUp end={card.value} duration={2} delay={0.2 + index * 0.1} decimals={decimals} />
                  {card.suffix}
                </motion.div>

                <div className="flex items-center gap-2">
                  {card.trend === "up" ? (
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">{card.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5">
                      <ArrowDown className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-semibold text-red-700">{card.change}</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">지난달 대비</span>
                </div>
              </div>

              {/* Mini chart */}
              <div className="hidden h-16 md:block">
                <MiniChart data={card.chartData} type={card.chartType} index={index} color={card.color} />
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
