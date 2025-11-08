export type Employee = {
  id: number
  fullName: string
  email: string
  position: string
  department: string
  hireDate: string
  status: "ACTIVE" | "ON_LEAVE" | "TERMINATED" | string
}

export type DepartmentStat = {
  department: string
  count: number
  ratio: number
}

