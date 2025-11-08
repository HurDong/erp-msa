import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, Package, DollarSign, UserPlus, Receipt } from "lucide-react"
import Link from "next/link"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "added new employee",
      target: "John Doe",
      time: "2 hours ago",
      initials: "SJ",
      avatarColor: "#3b82f6",
      type: "employee",
      icon: UserPlus,
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "updated inventory",
      target: "Product SKU-1234",
      time: "4 hours ago",
      initials: "MC",
      avatarColor: "#10b981",
      type: "inventory",
      icon: Package,
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      action: "created invoice",
      target: "INV-2024-001",
      time: "6 hours ago",
      initials: "ER",
      avatarColor: "#8b5cf6",
      type: "invoice",
      icon: FileText,
    },
    {
      id: 4,
      user: "David Kim",
      action: "approved expense",
      target: "$1,250.00",
      time: "8 hours ago",
      initials: "DK",
      avatarColor: "#f59e0b",
      type: "expense",
      icon: DollarSign,
    },
    {
      id: 5,
      user: "Lisa Wang",
      action: "updated payroll",
      target: "March 2024",
      time: "10 hours ago",
      initials: "LW",
      avatarColor: "#06b6d4",
      type: "payroll",
      icon: Receipt,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activities.map((activity) => {
            const ActivityIcon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-accent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs text-white" style={{ backgroundColor: activity.avatarColor }}>
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-none">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <ActivityIcon className="h-3 w-3" style={{ color: activity.avatarColor }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Link
            href="/activity"
            className="text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/80 hover:underline"
          >
            View All Activity →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
