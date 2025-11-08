import { Users } from "lucide-react"
import { DepartmentStat } from "@/lib/types/hr"

type EmployeeStatsProps = {
  stats: DepartmentStat[]
}

const departmentMeta: Record<
  string,
  {
    color: string
    icon: string
  }
> = {
  개발팀: { color: "bg-pastel-sky", icon: "💻" },
  영업팀: { color: "bg-pastel-mint", icon: "📊" },
  마케팅팀: { color: "bg-pastel-lilac", icon: "📱" },
  운영팀: { color: "bg-pastel-peach", icon: "⚙️" },
  재무팀: { color: "bg-pastel-sky/70", icon: "💰" },
  인사팀: { color: "bg-pastel-mint/70", icon: "👥" },
  법무팀: { color: "bg-pastel-lilac/70", icon: "⚖️" },
  기타: { color: "bg-pastel-peach/70", icon: "📋" },
}

export function EmployeeStats({ stats }: EmployeeStatsProps) {
  const total = stats.reduce((sum, dept) => sum + dept.count, 0)
  const statsWithMeta = stats.map((dept) => ({
    ...dept,
    ...departmentMeta[dept.department],
  }))

  return (
    <div className="group rounded-[24px] bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded-[16px] bg-pastel-mint/20 p-2">
              <Users className="h-5 w-5 text-pastel-mint" />
            </div>
            <h3 className="text-lg font-semibold text-pastel-text">부서별 인원 분포</h3>
          </div>
          <p className="text-sm text-pastel-text/60">각 부서의 팀원을 확인해보세요</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-pastel-text">{total}</p>
          <p className="text-xs text-pastel-text/50">전체 인원</p>
        </div>
      </div>

      <div className="space-y-4">
        {statsWithMeta.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-pastel-text/20 p-4 text-center text-sm text-pastel-text/60">
            부서 통계를 불러오지 못했습니다.
          </div>
        ) : (
          statsWithMeta.map((dept) => (
            <div key={dept.department} className="space-y-2 rounded-[16px] p-2 transition-all duration-200 hover:bg-white/60">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{dept.icon ?? "👥"}</span>
                  <span className="font-medium text-pastel-text">{dept.department}</span>
                </div>
                <span className="text-pastel-text/60">
                  {dept.count}명{" "}
                  <span className="text-xs">
                    ({total === 0 ? 0 : Math.round((dept.count / total) * 100)}%)
                  </span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-pastel-text/10">
                <div
                  className={`h-full rounded-full ${dept.color ?? "bg-pastel-sky/60"} transition-all duration-500 ease-out`}
                  style={{ width: `${total === 0 ? 0 : (dept.count / total) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
