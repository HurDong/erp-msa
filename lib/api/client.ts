/**
 * 공통 API 클라이언트
 * 모든 API 요청에 JWT 토큰을 자동으로 포함시킵니다.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

/**
 * localStorage에서 JWT 토큰을 가져옵니다.
 */
function getToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return localStorage.getItem("erpmsa_token")
}

/**
 * API 요청 옵션 타입
 */
type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: unknown
  headers?: Record<string, string>
  requireAuth?: boolean // 인증이 필요한지 여부 (기본값: true)
}

/**
 * 공통 API 요청 함수
 * 
 * @param path API 경로 (예: "/api/hr/employees")
 * @param options 요청 옵션
 * @returns Response 객체
 */
export async function apiRequest(
  path: string,
  options: ApiRequestOptions = {}
): Promise<Response> {
  const {
    method = "GET",
    body,
    headers = {},
    requireAuth = true,
  } = options

  // 기본 헤더 설정
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  // 인증이 필요한 경우 토큰 추가
  if (requireAuth) {
    const token = getToken()
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`
    }
  }

  // 요청 본문 설정
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  }

  if (body && method !== "GET") {
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions)

  // 401 Unauthorized인 경우 로그인 페이지로 리다이렉트
  if (response.status === 401 && requireAuth) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("erpmsa_token")
      window.dispatchEvent(new Event("erpmsa:auth-changed"))
      window.location.href = "/login"
    }
    throw new Error("인증이 필요합니다. 다시 로그인해주세요.")
  }

  return response
}

/**
 * JSON 응답을 파싱하는 헬퍼 함수
 */
export async function apiRequestJson<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const response = await apiRequest(path, options)

  if (!response.ok) {
    const errorMessage = await response
      .json()
      .catch(() => ({ message: response.statusText }))
    throw new Error(
      (errorMessage as { message?: string })?.message ??
        `요청 실패: ${response.status}`
    )
  }

  return (await response.json()) as T
}

/**
 * GET 요청 헬퍼
 */
export async function apiGet<T>(
  path: string,
  options?: Omit<ApiRequestOptions, "method" | "body">
): Promise<T> {
  return apiRequestJson<T>(path, { ...options, method: "GET" })
}

/**
 * POST 요청 헬퍼
 */
export async function apiPost<T>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">
): Promise<T> {
  return apiRequestJson<T>(path, { ...options, method: "POST", body })
}

/**
 * PUT 요청 헬퍼
 */
export async function apiPut<T>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">
): Promise<T> {
  return apiRequestJson<T>(path, { ...options, method: "PUT", body })
}

/**
 * DELETE 요청 헬퍼
 */
export async function apiDelete<T>(
  path: string,
  options?: Omit<ApiRequestOptions, "method" | "body">
): Promise<T> {
  return apiRequestJson<T>(path, { ...options, method: "DELETE" })
}

/**
 * PATCH 요청 헬퍼
 */
export async function apiPatch<T>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">
): Promise<T> {
  return apiRequestJson<T>(path, { ...options, method: "PATCH", body })
}

