import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InventoryOverview } from "@/components/inventory/inventory-overview"
import { LowStockAlert } from "@/components/inventory/low-stock-alert"
import { RecentMovements } from "@/components/inventory/recent-movements"
import { TopProducts } from "@/components/inventory/top-products"
import { Sparkles } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200">
                <Sparkles className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-balance">재고 현황 한눈에</h1>
                <p className="text-sm text-muted-foreground">제품별 재고를 확인하고, 입출고 내역을 관리해요</p>
              </div>
            </div>
          </div>

          <InventoryOverview />

          <div className="grid gap-6 lg:grid-cols-2">
            <LowStockAlert />
            <TopProducts />
          </div>

          <RecentMovements />
        </div>
      </main>
    </div>
  )
}
