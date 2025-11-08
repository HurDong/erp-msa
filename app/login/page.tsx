"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await login({
        email: form.email,
        password: form.password,
      })
      localStorage.setItem("erpmsa_token", response.accessToken)
      window.dispatchEvent(new Event("erpmsa:auth-changed"))
      toast.success("로그인되었습니다.")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "로그인에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pastel-sky/30 to-pastel-lilac/40 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <CardTitle className="text-center text-2xl font-bold text-pastel-text">로그인</CardTitle>
          <p className="text-center text-sm text-pastel-text/70">ERP 대시보드에 접근하려면 계정으로 로그인하세요.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              아직 계정이 없으신가요?{" "}
              <Link className="text-primary underline underline-offset-4" href="/register">
                회원가입
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

