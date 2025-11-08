import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HROverview } from "@/components/hr/hr-overview"
import { EmployeeStats } from "@/components/hr/employee-stats"
import { AttendanceSummary } from "@/components/hr/attendance-summary"
import { UpcomingLeaves } from "@/components/hr/upcoming-leaves"
import { NewEmployeeOnboarding } from "@/components/hr/new-employee-onboarding"
import { TeamNotices } from "@/components/hr/team-notices"
import { DepartmentStat } from "@/lib/types/hr"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

async function fetchDepartmentStats(): Promise<DepartmentStat[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hr/departments/stats`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch department stats: ${response.status}`)
    }

    return (await response.json()) as DepartmentStat[]
  } catch (error) {
    console.error("[hr] failed to load department stats", error)
    return []
  }
}

export default async function HRPage() {
  const departmentStats = await fetchDepartmentStats()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <h1 className="bg-gradient-to-r from-pastel-sky to-pastel-mint bg-clip-text text-3xl font-bold tracking-tight text-transparent">
              오늘의 팀 상황
            </h1>
            <p className="mt-2 text-pastel-text/70">직원 관리, 근태 현황, 휴가 신청을 한 눈에 확인하세요</p>
          </div>

          <HROverview />

          <div className="grid gap-6 lg:grid-cols-2">
            <EmployeeStats stats={departmentStats} />
            <AttendanceSummary />
          </div>

          <NewEmployeeOnboarding />

          <UpcomingLeaves />

          <TeamNotices />
        </div>
      </main>
    </div>
  )
}
