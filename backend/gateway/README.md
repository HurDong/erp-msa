# Gateway Service

Spring Cloud Gateway 기반 API Gateway 서비스로, JWT 기반 인증 및 역할 기반 접근 제어를 제공합니다.

## 주요 기능

### 1. 필터 체인 (실행 순서)

1. **RequestLoggingFilter** (Order: -100)
   - 요청 로깅 및 트레이싱
   - 요청 ID 생성 및 MDC에 저장
   - 요청/응답 로깅

2. **JwtAuthenticationFilter** (Order: -50)
   - JWT 토큰 검증
   - Authorization 헤더에서 Bearer 토큰 추출
   - 토큰 유효성 검증 (HMAC, HS256)
   - 사용자 정보(role, email, permissions)를 헤더에 추가

3. **RoleAuthorizationFilter** (Order: -25)
   - 역할 기반 접근 제어
   - 경로별 권한 체크
   - 권한 부족 시 403 Forbidden 응답

## 라우팅 규칙

| 경로 | 대상 서비스 | 인증 필요 | 권한 요구사항 |
|------|------------|----------|--------------|
| `/api/auth/**` | auth-service | ❌ | 공개 접근 |
| `/api/hr/**` | hr-service | ✅ | `hr:read` (읽기), `hr:write` (쓰기) |
| `/api/inventory/**` | inventory-service | ✅ | `inventory:read` (읽기), `inventory:write` (쓰기) |
| `/api/accounting/**` | accounting-service | ✅ | `accounting:read` (읽기), `accounting:write` (쓰기) |
| `/api/admin/**` | admin-service | ✅ | `ADMIN` 역할 필수 |

## 역할 및 권한

### 역할 (Role)
- **USER**: 기본 사용자
  - 권한: `hr:read`
- **MANAGER**: 관리자
  - 권한: `hr:read`, `hr:write`, `inventory:read`, `accounting:read`
- **ADMIN**: 시스템 관리자
  - 권한: 모든 권한 + `admin:read`, `admin:write`

### 권한 기반 접근 제어
- **읽기 작업** (GET): 해당 리소스의 `read` 권한 필요
- **쓰기 작업** (POST, PUT, DELETE, PATCH): 해당 리소스의 `write` 권한 필요
- **관리자 경로** (`/api/admin/**`): `ADMIN` 역할 필수

## 사용 방법

### 1. 인증된 요청 보내기

```bash
# JWT 토큰을 Authorization 헤더에 포함
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     http://localhost:8080/api/hr/employees
```

### 2. 로그인하여 토큰 받기

```bash
# 로그인
curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"password"}'

# 응답에서 accessToken 추출
```

### 3. 역할별 접근 테스트

```bash
# USER 역할로 HR 조회 (성공)
curl -H "Authorization: Bearer <USER_TOKEN>" \
     http://localhost:8080/api/hr/employees

# USER 역할로 ADMIN 접근 (실패 - 403)
curl -H "Authorization: Bearer <USER_TOKEN>" \
     http://localhost:8080/api/admin/dashboard

# ADMIN 역할로 ADMIN 접근 (성공)
curl -H "Authorization: Bearer <ADMIN_TOKEN>" \
     http://localhost:8080/api/admin/dashboard
```

## 에러 응답

### 401 Unauthorized
- 토큰이 없거나 유효하지 않음
- 토큰이 만료됨

```json
{
  "error": "Missing or invalid Authorization header",
  "status": 401
}
```

### 403 Forbidden
- 권한이 부족함
- 역할이 요구사항을 만족하지 않음

```json
{
  "error": "Access denied: Admin role required",
  "status": 403
}
```

## 설정

### application.yml

```yaml
app:
  jwt:
    secret: this_is_a_dev_only_secret_change_me  # 프로덕션에서는 환경 변수로 관리
```

**중요**: JWT secret은 auth-service와 동일한 값이어야 합니다.

## 요청 헤더 전달

Gateway에서 검증된 사용자 정보는 다음 헤더로 하위 서비스에 전달됩니다:

- `X-User-Role`: 사용자 역할 (USER, MANAGER, ADMIN)
- `X-User-Email`: 사용자 이메일
- `X-User-Permissions`: 권한 목록 (쉼표로 구분)
- `X-Request-Id`: 요청 추적 ID

## 로깅

Gateway는 다음 정보를 로깅합니다:

- 요청 메서드 및 경로
- 인증 성공/실패
- 권한 체크 결과
- 요청 ID를 통한 트레이싱

로그 레벨은 `application.yml`에서 조정 가능합니다.

