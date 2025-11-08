"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserPlus, Sparkles } from "lucide-react"

export function NewEmployeeOnboarding() {
  const onboardingList = [
    {
      id: 1,
      name: "김민지",
      initials: "김",
      department: "개발팀",
      startDate: "2024-03-20",
      progress: 75,
      tasks: {
        completed: 6,
        total: 8,
      },
      status: "진행중",
    },
    {
      id: 2,
      name: "이준호",
      initials: "이",
      department: "마케팅팀",
      startDate: "2024-03-18",
      progress: 50,
      tasks: {
        completed: 4,
        total: 8,
      },
      status: "진행중",
    },
    {
      id: 3,
      name: "박서연",
      initials: "박",
      department: "영업팀",
      startDate: "2024-03-15",
      progress: 100,
      tasks: {
        completed: 8,
        total: 8,
      },
      status: "완료",
    },
  ]

  return (
    <div className="group rounded-[24px] bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-[16px] bg-pastel-lilac/20 p-2">
              <Sparkles className="h-5 w-5 text-pastel-lilac" />
            </div>
            <h3 className="text-lg font-semibold text-pastel-text">신규 직원 온보딩</h3>
          </div>
          <p className="text-sm text-pastel-text/60">환영합니다! 온보딩 진행 상황을 확인하세요 🎉</p>
        </div>
        <Button className="rounded-[16px] bg-gradient-to-r from-pastel-sky/30 to-pastel-mint/30 text-pastel-text shadow-sm transition-all duration-200 hover:scale-105 hover:from-pastel-sky/40 hover:to-pastel-mint/40 hover:shadow-md">
          <UserPlus className="mr-2 h-4 w-4" />
          신규 등록
        </Button>
      </div>

      <div className="space-y-4">
        {onboardingList.map((employee) => (
          <div
            key={employee.id}
            className="group/item rounded-[20px] border border-pastel-text/10 bg-white/50 p-4 transition-all duration-200 hover:border-pastel-sky/30 hover:bg-white/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-white/50 ring-offset-2 transition-transform duration-200 group-hover/item:scale-110">
                  <AvatarFallback className="bg-gradient-to-br from-pastel-lilac to-pastel-sky text-lg font-semibold text-white">
                    {employee.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-pastel-text">{employee.name}</p>
                    <Badge
                      className={`rounded-[10px] border ${
                        employee.status === "완료"
                          ? "border-pastel-mint/30 bg-pastel-mint/20 text-pastel-mint"
                          : "border-pastel-peach/30 bg-pastel-peach/20 text-pastel-peach"
                      }`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-pastel-text/60">
                    {employee.department} · 입사일: {employee.startDate}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-pastel-text">
                  {employee.tasks.completed}/{employee.tasks.total} 완료
                </p>
                <p className="text-xs text-pastel-text/50">{employee.progress}%</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2.5 overflow-hidden rounded-full bg-pastel-text/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pastel-sky via-pastel-mint to-pastel-lilac transition-all duration-500 ease-out"
                  style={{ width: `${employee.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
