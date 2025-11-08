import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnimatedOverviewCards } from "@/components/dashboard/animated-overview-cards"
import { RecentActivityAnimated } from "@/components/dashboard/recent-activity-animated"
import { QuickActionsAnimated } from "@/components/dashboard/quick-actions-animated"
import { PerformanceOverview } from "@/components/dashboard/performance-overview"
import { DashboardSummary } from "@/lib/types/dashboard"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

async function fetchDashboardSummary(): Promise<DashboardSummary | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard summary: ${response.status}`)
    }

    return (await response.json()) as DashboardSummary
  } catch (error) {
    console.error("[dashboard] failed to load summary", error)
    return null
  }
}

export default async function DashboardPage() {
  const summary = await fetchDashboardSummary()

  return (
    <div className="relative flex min-h-screen flex-col pattern-dots">
      <DashboardHeader />

      <main className="relative z-10 flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-foreground">좋은 하루예요!</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">오늘 기록들을 차분하게 확인해봐요.</p>
          </div>

          <AnimatedOverviewCards cards={summary?.overviewCards ?? []} />

          <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#A8C5FF] via-[#AEE2D2] to-[#C9BAFF] opacity-30" />

          <PerformanceOverview data={summary?.performanceOverview ?? []} />

          <div className="grid gap-8 lg:grid-cols-2">
            <QuickActionsAnimated />
            <RecentActivityAnimated activities={summary?.recentActivities ?? []} />
          </div>
        </div>
      </main>
    </div>
  )
}
