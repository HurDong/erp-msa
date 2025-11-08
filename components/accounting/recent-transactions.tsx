import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Clock } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "송장 결제 - 아크미 코퍼레이션",
      type: "income",
      amount: "+₩12,500,000",
      date: "3월 12일",
      time: "오후 2:30",
      category: "매출",
    },
    {
      id: 2,
      description: "사무용품 구매",
      type: "expense",
      amount: "-₩450,000",
      date: "3월 12일",
      time: "오전 11:15",
      category: "운영비",
    },
    {
      id: 3,
      description: "소프트웨어 구독료",
      type: "expense",
      amount: "-₩299,000",
      date: "3월 11일",
      time: "오전 9:00",
      category: "IT",
    },
    {
      id: 4,
      description: "송장 결제 - 테크스타트",
      type: "income",
      amount: "+₩8,750,000",
      date: "3월 10일",
      time: "오후 4:20",
      category: "매출",
    },
    {
      id: 5,
      description: "직원 경비 정산",
      type: "expense",
      amount: "-₩320,000",
      date: "3월 10일",
      time: "오후 1:45",
      category: "인사",
    },
  ]

  return (
    <Card className="rounded-3xl bg-gradient-to-br from-white to-emerald-50/30 backdrop-blur-sm border-emerald-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 shadow-sm">
            <Clock className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">최근 거래 내역</h3>
            <p className="text-sm text-gray-600 mt-0.5">최근 입출금 현황을 확인하세요</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-start gap-3 p-3 rounded-2xl transition-all duration-200 hover:bg-white/70"
            >
              <div
                className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${
                  transaction.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                }`}
              >
                {transaction.type === "income" ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <div className="font-semibold text-gray-800">{transaction.description}</div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs rounded-full px-2.5 py-0.5 border-gray-200 bg-gray-50/50"
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {transaction.date} • {transaction.time}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      transaction.type === "income" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {transaction.amount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
