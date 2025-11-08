import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Package, TrendingUp, Users } from "lucide-react"

export function OverviewCards() {
  const cards = [
    {
      title: "Total Employees",
      value: "248",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      description: "Active employees",
      color: "#3b82f6", // blue
    },
    {
      title: "Inventory Value",
      value: "$1.2M",
      change: "+8%",
      trend: "up" as const,
      icon: Package,
      description: "Total stock value",
      color: "#10b981", // green
    },
    {
      title: "Monthly Revenue",
      value: "$485K",
      change: "+23%",
      trend: "up" as const,
      icon: DollarSign,
      description: "This month",
      color: "#8b5cf6", // purple
    },
    {
      title: "Operating Costs",
      value: "$312K",
      change: "-5%",
      trend: "down" as const,
      icon: TrendingUp,
      description: "This month",
      color: "#f59e0b", // orange
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card
            key={card.title}
            className="relative overflow-hidden shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{
              borderLeft: `3px solid ${card.color}`,
              background: `linear-gradient(to bottom right, ${card.color}0D, transparent)`,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${card.color}1A` }}
              >
                <Icon className="h-5 w-5" style={{ color: card.color }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {card.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-500" />
                )}
                <span className={card.trend === "up" ? "text-green-500" : "text-red-500"}>{card.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
