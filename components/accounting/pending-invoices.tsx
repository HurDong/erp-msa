import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, FileText, AlertCircle } from "lucide-react"

export function PendingInvoices() {
  const invoices = [
    {
      id: "INV-2024-001",
      client: "아크미 코퍼레이션",
      amount: "₩12,500,000",
      dueDate: "2024년 3월 15일",
      status: "pending",
      daysLeft: 3,
    },
    {
      id: "INV-2024-002",
      client: "테크스타트",
      amount: "₩8,750,000",
      dueDate: "2024년 3월 12일",
      status: "overdue",
      daysLeft: -1,
    },
    {
      id: "INV-2024-003",
      client: "글로벌 솔루션즈",
      amount: "₩15,200,000",
      dueDate: "2024년 3월 18일",
      status: "pending",
      daysLeft: 6,
    },
    {
      id: "INV-2024-004",
      client: "디자인 스튜디오",
      amount: "₩6,400,000",
      dueDate: "2024년 3월 20일",
      status: "pending",
      daysLeft: 8,
    },
  ]

  return (
    <Card className="rounded-3xl bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm border-amber-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 shadow-sm">
            <FileText className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">미결제 송장</h3>
            <p className="text-sm text-gray-600 mt-0.5">결제 대기 중인 송장을 확인하세요</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 bg-white/50 transition-all duration-200 hover:bg-white hover:shadow-md"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{invoice.id}</span>
                  <Badge
                    variant={invoice.status === "overdue" ? "destructive" : "secondary"}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      invoice.status === "overdue"
                        ? "bg-rose-100 text-rose-700 border-rose-200"
                        : "bg-sky-100 text-sky-700 border-sky-200"
                    }`}
                  >
                    {invoice.status === "overdue" ? "지연" : "대기중"}
                  </Badge>
                  {invoice.status === "overdue" && <AlertCircle className="h-3.5 w-3.5 text-rose-500" />}
                </div>
                <div className="text-sm text-gray-700">{invoice.client}</div>
                <div className="text-xs text-gray-500">
                  마감일: {invoice.dueDate}
                  {invoice.daysLeft > 0 && ` (${invoice.daysLeft}일 남음)`}
                  {invoice.daysLeft < 0 && ` (${Math.abs(invoice.daysLeft)}일 지연)`}
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-xl font-bold text-gray-800">{invoice.amount}</div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 bg-transparent"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  상세
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
