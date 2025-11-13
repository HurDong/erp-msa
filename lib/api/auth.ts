"use client"

import { apiPost } from "./client"

export type AuthRequest = {
  email: string
  password: string
  fullName?: string
}

export type AuthResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
  email: string
  fullName: string
  role: string
  permissions: string[]
}

/**
 * 회원가입
 * 인증이 필요 없으므로 requireAuth: false로 설정
 */
export function register(payload: AuthRequest) {
  return apiPost<AuthResponse>("/api/auth/register", payload, {
    requireAuth: false,
  })
}

/**
 * 로그인
 * 인증이 필요 없으므로 requireAuth: false로 설정
 */
export function login(payload: AuthRequest) {
  return apiPost<AuthResponse>("/api/auth/login", payload, {
    requireAuth: false,
  })
}

