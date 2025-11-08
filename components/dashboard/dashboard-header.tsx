"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, User } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MobileNav } from "./mobile-nav"

export function DashboardHeader() {
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateAuthState = () => {
      setLoggedIn(Boolean(localStorage.getItem("erpmsa_token")))
    }

    updateAuthState()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "erpmsa_token") {
        updateAuthState()
      }
    }

    const handleAuthChanged = () => updateAuthState()

    window.addEventListener("storage", handleStorage)
    window.addEventListener("erpmsa:auth-changed", handleAuthChanged as EventListener)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("erpmsa:auth-changed", handleAuthChanged as EventListener)
    }
  }, [])

  const handleLogout = useCallback(() => {
    if (typeof window === "undefined") return
    localStorage.removeItem("erpmsa_token")
    setLoggedIn(false)
    window.dispatchEvent(new Event("erpmsa:auth-changed"))
    router.push("/login")
  }, [router])

  const goTo = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router]
  )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-lg">
        <div className="flex h-16 items-center gap-4 px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "#A8C5FF" }}>
              <span className="text-sm font-bold text-white">ERP</span>
            </div>
            <span className="hidden text-lg font-bold text-foreground sm:inline-block">Enterprise System</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 lg:flex lg:gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              대시보드
            </Link>
            <Link
              href="/hr"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              인사 관리
            </Link>
            <Link
              href="/inventory"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              재고 관리
            </Link>
            <Link
              href="/accounting"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              회계
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              관리자
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Bell className="h-5 w-5" />
            </Button>

            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>프로필</DropdownMenuItem>
                  <DropdownMenuItem>설정</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault()
                      handleLogout()
                    }}
                  >
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => goTo("/login")}>
                  로그인
                </Button>
                <Button size="sm" onClick={() => goTo("/register")}>
                  회원가입
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  )
}
