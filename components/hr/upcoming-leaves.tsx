import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function UpcomingLeaves() {
  const leaves = [
    {
      id: 1,
      employee: "김사라",
      initials: "김",
      type: "연차",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      days: 5,
      status: "pending",
    },
    {
      id: 2,
      employee: "이마이크",
      initials: "이",
      type: "병가",
      startDate: "2024-03-18",
      endDate: "2024-03-19",
      days: 2,
      status: "pending",
    },
    {
      id: 3,
      employee: "박에밀리",
      initials: "박",
      type: "개인사유",
      startDate: "2024-03-22",
      endDate: "2024-03-22",
      days: 1,
      status: "approved",
    },
    {
      id: 4,
      employee: "최데이빗",
      initials: "최",
      type: "연차",
      startDate: "2024-03-25",
      endDate: "2024-04-05",
      days: 10,
      status: "pending",
    },
  ]

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-pastel backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-pastel-text">휴가 신청 현황</h3>
        <p className="mt-1 text-sm text-pastel-text/60">승인 대기 중인 휴가 요청을 확인하세요</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-pastel-text/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-pastel-text/10 bg-white/50">
              <th className="p-4 text-left text-sm font-semibold text-pastel-text">직원</th>
              <th className="p-4 text-left text-sm font-semibold text-pastel-text">유형</th>
              <th className="p-4 text-left text-sm font-semibold text-pastel-text">시작일</th>
              <th className="p-4 text-left text-sm font-semibold text-pastel-text">종료일</th>
              <th className="p-4 text-center text-sm font-semibold text-pastel-text">일수</th>
              <th className="p-4 text-left text-sm font-semibold text-pastel-text">상태</th>
              <th className="p-4 text-right text-sm font-semibold text-pastel-text">액션</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                className="border-b border-pastel-text/5 transition-colors last:border-0 hover:bg-white/70"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-pastel-lilac to-pastel-mint text-sm text-white">
                        {leave.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-pastel-text">{leave.employee}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-pastel-text">{leave.type}</td>
                <td className="p-4 text-sm text-pastel-text">{leave.startDate}</td>
                <td className="p-4 text-sm text-pastel-text">{leave.endDate}</td>
                <td className="p-4 text-center text-sm font-medium text-pastel-text">{leave.days}</td>
                <td className="p-4">
                  <Badge
                    className={`rounded-lg ${
                      leave.status === "approved"
                        ? "bg-pastel-mint/20 text-pastel-mint"
                        : "bg-pastel-peach/20 text-pastel-peach"
                    }`}
                  >
                    {leave.status === "approved" ? "승인됨" : "대기중"}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  {leave.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        className="rounded-xl bg-pastel-mint/20 text-pastel-mint hover:bg-pastel-mint/30"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="rounded-xl bg-red-50 text-red-400 hover:bg-red-100">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
