import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, Package, UserPlus } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Employee",
      icon: UserPlus,
      href: "/hr/employees/new",
      description: "Onboard new team member",
      iconColor: "#3b82f6", // blue
    },
    {
      title: "Create Invoice",
      icon: FileText,
      href: "/accounting/invoices/new",
      description: "Generate new invoice",
      iconColor: "#8b5cf6", // purple
    },
    {
      title: "Add Stock",
      icon: Package,
      href: "/inventory/add",
      description: "Update inventory levels",
      iconColor: "#10b981", // green
    },
    {
      title: "Record Expense",
      icon: DollarSign,
      href: "/accounting/expenses/new",
      description: "Log business expense",
      iconColor: "#f59e0b", // orange
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col items-start gap-2 border-border bg-transparent p-4 transition-all duration-200 hover:scale-[1.02] hover:border-muted-foreground/30 hover:bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: action.iconColor }} />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">{action.description}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
