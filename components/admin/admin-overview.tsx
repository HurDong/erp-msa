import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, Server, Users } from "lucide-react"

export function AdminOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "342",
      icon: Users,
      description: "28 active sessions",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      icon: Server,
      description: "Last 30 days",
    },
    {
      title: "Active Modules",
      value: "5/5",
      icon: Activity,
      description: "All systems operational",
    },
    {
      title: "Security Alerts",
      value: "0",
      icon: AlertCircle,
      description: "No issues detected",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
