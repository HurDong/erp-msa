import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee } from "@/lib/types/hr"
import { MoreHorizontal } from "lucide-react"

type EmployeeListProps = {
  employees: Employee[]
}

const statusLabel: Record<string, string> = {
  ACTIVE: "Active",
  ON_LEAVE: "On Leave",
  TERMINATED: "Terminated",
}

export function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  직원 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => {
                const initials = extractInitials(employee.fullName)
                const statusKey = employee.status?.toUpperCase() ?? "ACTIVE"

                return (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{employee.fullName}</div>
                          <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Badge variant={statusKey === "ACTIVE" ? "default" : "secondary"}>
                        {statusLabel[statusKey] ?? statusKey}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function extractInitials(fullName: string) {
  if (!fullName) return "??"
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2)
  }
  const first = parts[0].charAt(0)
  const last = parts[parts.length - 1].charAt(0)
  return `${first}${last}`
}
