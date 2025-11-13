"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { HROverview } from "@/components/hr/hr-overview"
import { EmployeeStats } from "@/components/hr/employee-stats"
import { AttendanceSummary } from "@/components/hr/attendance-summary"
import { UpcomingLeaves } from "@/components/hr/upcoming-leaves"
import { NewEmployeeOnboarding } from "@/components/hr/new-employee-onboarding"
import { TeamNotices } from "@/components/hr/team-notices"
import { DepartmentStat } from "@/lib/types/hr"
import { apiGet } from "@/lib/api/client"

export default function HRPage() {
  const [departmentStats, setDepartmentStats] = useState<DepartmentStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDepartmentStats() {
      try {
        setLoading(true)
        const data = await apiGet<DepartmentStat[]>("/api/hr/departments/stats")
        setDepartmentStats(data)
      } catch (error) {
        console.error("[hr] failed to load department stats", error)
        setDepartmentStats([])
      } finally {
        setLoading(false)
      }
    }

    fetchDepartmentStats()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    )
  }

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
