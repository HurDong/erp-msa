export type OverviewCard = {
  id: string
  title: string
  value: number
  prefix: string
  suffix: string
  change: string
  trend: "up" | "down"
  description: string
  gradient: string
  color: string
  chartData: number[]
  chartType: "line" | "bar" | "area" | "dual"
  icon: string
}

export type PerformancePoint = {
  month: string
  revenue: number
  trend: number
}

export type Activity = {
  id: string
  user: string
  action: string
  target: string
  time: string
  initials: string
  color: string
  type: string
  isNew: boolean
}

export type DashboardSummary = {
  overviewCards: OverviewCard[]
  performanceOverview: PerformancePoint[]
  recentActivities: Activity[]
}

