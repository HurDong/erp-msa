import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AccountingOverview } from "@/components/accounting/accounting-overview"
import { RevenueChart } from "@/components/accounting/revenue-chart"
import { RecentTransactions } from "@/components/accounting/recent-transactions"
import { PendingInvoices } from "@/components/accounting/pending-invoices"

export default function AccountingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">회계 관리</h1>
            <p className="mt-2 text-gray-600">매출, 지출, 송장을 한눈에 관리하세요 💰</p>
          </div>

          <AccountingOverview />

          <RevenueChart />

          <div className="grid gap-6 lg:grid-cols-2">
            <PendingInvoices />
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  )
}
