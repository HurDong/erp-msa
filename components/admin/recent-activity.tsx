import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      initials: "SJ",
      action: "Created new user account",
      target: "john.doe@company.com",
      type: "user",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      user: "Mike Chen",
      initials: "MC",
      action: "Modified system settings",
      target: "Email Notifications",
      type: "system",
      timestamp: "15 minutes ago",
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      initials: "ER",
      action: "Updated user permissions",
      target: "david.kim@company.com",
      type: "security",
      timestamp: "1 hour ago",
    },
    {
      id: 4,
      user: "David Kim",
      initials: "DK",
      action: "Generated system report",
      target: "Monthly Analytics",
      type: "report",
      timestamp: "2 hours ago",
    },
    {
      id: 5,
      user: "Lisa Wang",
      initials: "LW",
      action: "Deleted user account",
      target: "inactive.user@company.com",
      type: "user",
      timestamp: "3 hours ago",
    },
    {
      id: 6,
      user: "James Wilson",
      initials: "JW",
      action: "Updated database backup settings",
      target: "Backup Schedule",
      type: "system",
      timestamp: "5 hours ago",
    },
  ]

  const getTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      user: "default",
      system: "secondary",
      security: "destructive",
      report: "outline",
    }
    return variants[type] || "default"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Admin Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                        {activity.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{activity.user}</span>
                  </div>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="font-medium">{activity.target}</TableCell>
                <TableCell>
                  <Badge variant={getTypeBadge(activity.type)}>{activity.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.timestamp}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
