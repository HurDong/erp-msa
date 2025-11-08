"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Info, Megaphone } from "lucide-react"

export function TeamNotices() {
  const notices = [
    {
      id: 1,
      type: "공지",
      icon: Megaphone,
      color: "pastel-sky",
      title: "3월 전사 타운홀 미팅 안내",
      content: "3월 25일 오후 3시, 전 직원 참석 부탁드립니다.",
      date: "2024-03-10",
      isNew: true,
    },
    {
      id: 2,
      type: "일정",
      icon: Calendar,
      color: "pastel-mint",
      title: "2024년 상반기 워크샵 일정 확정",
      content: "4월 15-16일 제주도에서 진행됩니다.",
      date: "2024-03-08",
      isNew: true,
    },
    {
      id: 3,
      type: "안내",
      icon: Info,
      color: "pastel-lilac",
      title: "신규 복지 제도 안내",
      content: "재택근무 요일 선택제가 4월부터 시행됩니다.",
      date: "2024-03-05",
      isNew: false,
    },
    {
      id: 4,
      type: "알림",
      icon: Bell,
      color: "pastel-peach",
      title: "건강검진 일정 안내",
      content: "3월 말까지 건강검진을 완료해주세요.",
      date: "2024-03-03",
      isNew: false,
    },
  ]

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-pastel backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pastel-text">팀 공지사항</h3>
        <p className="mt-1 text-sm text-pastel-text/60">최신 소식과 중요한 안내를 확인하세요</p>
      </div>

      <div className="space-y-3">
        {notices.map((notice) => {
          const Icon = notice.icon
          return (
            <div
              key={notice.id}
              className="group relative rounded-2xl border border-pastel-text/10 bg-white/50 p-4 transition-all duration-200 hover:border-pastel-sky/30 hover:bg-white/70 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-xl bg-${notice.color}/20 p-2.5`}>
                  <Icon className={`h-5 w-5 text-${notice.color}`} />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className={`rounded-lg bg-${notice.color}/20 text-${notice.color}`}>{notice.type}</Badge>
                    {notice.isNew && <Badge className="rounded-lg bg-red-100 text-red-600 shadow-sm">NEW</Badge>}
                  </div>
                  <h4 className="mb-1 font-semibold text-pastel-text">{notice.title}</h4>
                  <p className="text-sm text-pastel-text/70">{notice.content}</p>
                  <p className="mt-2 text-xs text-pastel-text/50">{notice.date}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
