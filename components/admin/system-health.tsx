import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

export function SystemHealth() {
  const metrics = [
    {
      name: "CPU Usage",
      value: 45,
      status: "healthy",
    },
    {
      name: "Memory Usage",
      value: 62,
      status: "healthy",
    },
    {
      name: "Disk Usage",
      value: 38,
      status: "healthy",
    },
    {
      name: "Network Traffic",
      value: 28,
      status: "healthy",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{metric.name}</span>
                <span className="text-muted-foreground">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg bg-success/10 p-4">
          <p className="text-sm font-medium text-success">All systems operating normally</p>
          <p className="mt-1 text-xs text-muted-foreground">Last checked: 2 minutes ago</p>
        </div>
      </CardContent>
    </Card>
  )
}
