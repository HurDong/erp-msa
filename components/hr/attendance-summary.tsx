import { CheckCircle2, Clock, XCircle, Calendar } from "lucide-react"

export function AttendanceSummary() {
  const today = new Date().toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const stats = [
    {
      label: "출근",
      value: 236,
      icon: CheckCircle2,
      color: "text-pastel-mint",
      bgColor: "bg-pastel-mint/10",
      borderColor: "border-pastel-mint/20",
    },
    {
      label: "지각",
      value: 8,
      icon: Clock,
      color: "text-pastel-peach",
      bgColor: "bg-pastel-peach/10",
      borderColor: "border-pastel-peach/20",
    },
    {
      label: "결근",
      value: 4,
      icon: XCircle,
      color: "text-red-400",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
  ]

  return (
    <div className="group rounded-[24px] bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-[16px] bg-pastel-sky/20 p-2">
            <Calendar className="h-5 w-5 text-pastel-sky" />
          </div>
          <h3 className="text-lg font-semibold text-pastel-text">오늘의 근태 현황</h3>
        </div>
        <p className="text-sm text-pastel-text/60">{today}</p>
        <p className="mt-1 text-xs text-pastel-text/50">실시간으로 업데이트되는 근태 정보예요</p>
      </div>
      <div className="space-y-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex items-center justify-between rounded-[18px] border ${stat.borderColor} ${stat.bgColor} p-4 transition-all duration-200 hover:scale-[1.02] hover:border-opacity-40 hover:bg-opacity-20 hover:shadow-md`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-[14px] ${stat.bgColor} p-2.5 transition-transform duration-200 hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="font-medium text-pastel-text">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-pastel-text">{stat.value}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-6 rounded-[18px] bg-gradient-to-r from-pastel-mint/10 to-pastel-sky/10 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-pastel-text">전체 출근율</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/50">
              <div className="h-full w-[95.2%] rounded-full bg-gradient-to-r from-pastel-mint to-pastel-sky" />
            </div>
            <span className="font-bold text-pastel-mint">95.2%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
