import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, MoreHorizontal } from "lucide-react"

export function InvoiceList() {
  const invoices = [
    {
      id: "INV-2024-001",
      client: "Acme Corp",
      amount: "$12,500",
      issueDate: "Mar 1, 2024",
      dueDate: "Mar 15, 2024",
      status: "pending",
    },
    {
      id: "INV-2024-002",
      client: "TechStart Inc",
      amount: "$8,750",
      issueDate: "Feb 28, 2024",
      dueDate: "Mar 12, 2024",
      status: "overdue",
    },
    {
      id: "INV-2024-003",
      client: "Global Solutions",
      amount: "$15,200",
      issueDate: "Mar 3, 2024",
      dueDate: "Mar 18, 2024",
      status: "pending",
    },
    {
      id: "INV-2024-004",
      client: "Design Studio",
      amount: "$6,400",
      issueDate: "Mar 5, 2024",
      dueDate: "Mar 20, 2024",
      status: "pending",
    },
    {
      id: "INV-2024-005",
      client: "Marketing Pro",
      amount: "$9,850",
      issueDate: "Feb 25, 2024",
      dueDate: "Mar 10, 2024",
      status: "paid",
    },
    {
      id: "INV-2024-006",
      client: "Cloud Services",
      amount: "$22,100",
      issueDate: "Feb 22, 2024",
      dueDate: "Mar 8, 2024",
      status: "paid",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid"
      case "pending":
        return "Pending"
      case "overdue":
        return "Overdue"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell className="font-bold">{invoice.amount}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(invoice.status)}>{getStatusLabel(invoice.status)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
