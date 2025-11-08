import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EmployeeList } from "@/components/hr/employee-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Employee } from "@/lib/types/hr"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hr/employees`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch employees: ${response.status}`)
    }

    return (await response.json()) as Employee[]
  } catch (error) {
    console.error("[hr] failed to load employees", error)
    return []
  }
}

export default async function EmployeesPage() {
  const employees = await fetchEmployees()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
              <p className="mt-2 text-muted-foreground">Manage your team members and their information.</p>
            </div>
            <Link href="/hr/employees/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-9" />
            </div>
          </div>

          <EmployeeList employees={employees} />
        </div>
      </main>
    </div>
  )
}
