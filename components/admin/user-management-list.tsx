import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

export function UserManagementList() {
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      initials: "SJ",
      email: "sarah.j@company.com",
      role: "Admin",
      department: "IT",
      status: "active",
      lastActive: "2 minutes ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      initials: "MC",
      email: "mike.c@company.com",
      role: "Manager",
      department: "Sales",
      status: "active",
      lastActive: "15 minutes ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      initials: "ER",
      email: "emily.r@company.com",
      role: "Manager",
      department: "Marketing",
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: 4,
      name: "David Kim",
      initials: "DK",
      email: "david.k@company.com",
      role: "Employee",
      department: "Operations",
      status: "active",
      lastActive: "3 hours ago",
    },
    {
      id: 5,
      name: "Lisa Wang",
      initials: "LW",
      email: "lisa.w@company.com",
      role: "Employee",
      department: "Finance",
      status: "inactive",
      lastActive: "2 days ago",
    },
    {
      id: 6,
      name: "James Wilson",
      initials: "JW",
      email: "james.w@company.com",
      role: "Contractor",
      department: "Engineering",
      status: "active",
      lastActive: "30 minutes ago",
    },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive"
      case "Manager":
        return "default"
      case "Employee":
        return "secondary"
      case "Contractor":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadge(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
