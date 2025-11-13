"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EmployeeList } from "@/components/hr/employee-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Employee } from "@/lib/types/hr"
import { apiGet } from "@/lib/api/client"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoading(true)
        const data = await apiGet<Employee[]>("/api/hr/employees")
        setEmployees(data)
      } catch (error) {
        console.error("[hr] failed to load employees", error)
        setEmployees([])
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
      </div>
    )
  }

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
