"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/lib/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.")
      return
    }

    try {
      setLoading(true)
      const response = await register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
      })
      localStorage.setItem("erpmsa_token", response.accessToken)
      window.dispatchEvent(new Event("erpmsa:auth-changed"))
      toast.success("회원가입이 완료되었습니다.")
      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "회원가입에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pastel-sky/30 to-pastel-mint/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <CardTitle className="text-center text-2xl font-bold text-pastel-text">회원가입</CardTitle>
          <p className="text-center text-sm text-pastel-text/70">ERP 시스템을 사용하기 위해 계정을 생성하세요.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">이름</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="홍길동"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
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
                placeholder="최소 8자 이상"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "처리 중..." : "회원가입"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link className="text-primary underline underline-offset-4" href="/login">
                로그인
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

