import { Briefcase, Calendar, DollarSign, Users, TrendingUp } from "lucide-react"

export function HROverview() {
  const stats = [
    {
      title: "전체 직원",
      value: "248",
      icon: Users,
      description: "이번 달 +12명",
      trend: "+5.1%",
      color: "pastel-sky",
    },
    {
      title: "운영 부서",
      value: "8",
      icon: Briefcase,
      description: "활발히 운영 중",
      trend: "안정",
      color: "pastel-mint",
    },
    {
      title: "오늘 휴가",
      value: "12",
      icon: Calendar,
      description: "승인 대기 5건",
      trend: "보통",
      color: "pastel-lilac",
    },
    {
      title: "이번 달 급여",
      value: "$285K",
      icon: DollarSign,
      description: "정상 지급 완료",
      trend: "완료",
      color: "pastel-peach",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          >
            <div className="absolute right-0 top-0 h-32 w-32 opacity-5">
              <div
                className={`h-full w-full rounded-full bg-gradient-to-br from-${stat.color} to-${stat.color}/50 blur-2xl`}
              />
            </div>

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`rounded-[18px] bg-${stat.color}/20 p-3 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-pastel-text/50">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-pastel-text/60">{stat.title}</p>
                <p className="text-3xl font-bold text-pastel-text">{stat.value}</p>
                <p className="text-xs text-pastel-text/50">{stat.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
