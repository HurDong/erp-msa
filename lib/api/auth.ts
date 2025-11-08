"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

type AuthRequest = {
  email: string
  password: string
  fullName?: string
}

type AuthResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
  email: string
  fullName: string
  role: string
  permissions: string[]
}

async function request(path: string, payload: AuthRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const message = await res
      .json()
      .catch(() => ({ message: res.statusText }))
    throw new Error(message.message ?? "요청 처리 중 오류가 발생했습니다.")
  }

  return (await res.json()) as AuthResponse
}

export function register(payload: AuthRequest) {
  return request("/api/auth/register", payload)
}

export function login(payload: AuthRequest) {
  return request("/api/auth/login", payload)
}

