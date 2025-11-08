import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AdminOverview } from "@/components/admin/admin-overview"
import { SystemHealth } from "@/components/admin/system-health"
import { RecentActivity } from "@/components/admin/recent-activity"
import { UserRoleDistribution } from "@/components/admin/user-role-distribution"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="mt-2 text-muted-foreground">Manage users, system settings, and monitor activity.</p>
          </div>

          <AdminOverview />

          <div className="grid gap-6 lg:grid-cols-2">
            <SystemHealth />
            <UserRoleDistribution />
          </div>

          <RecentActivity />
        </div>
      </main>
    </div>
  )
}
