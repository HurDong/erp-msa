"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

export function DashboardConfetti() {
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    // Check if all metrics are positive (all trends are up)
    const allPositive = true // In real app, calculate from actual data

    if (allPositive) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!showConfetti) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      colors={["#3b82f6", "#8b5cf6", "#f472b6", "#f59e0b", "#10b981"]}
      gravity={0.3}
    />
  )
}
