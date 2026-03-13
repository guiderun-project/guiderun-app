# GuideRun

시각장애러너와 가이드러너를 연결하는 러닝 매칭 서비스입니다.

함께 달리는 즐거움을 누구나 경험할 수 있도록, 시각장애러너와 가이드러너가 서로를 찾고 함께 훈련할 수 있는 플랫폼입니다.

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Routing**: Expo Router (file-based routing)
- **Styling**: NativeWind (TailwindCSS)
- **State**: Zustand (클라이언트) / TanStack Query (서버)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Run

```bash
# 개발 서버 시작
pnpm start

# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## Project Structure

```
guiderun-app/
├── app/                              # expo-router 라우팅 (파일 = 라우트 = 화면)
│   ├── _layout.tsx                   # 루트 레이아웃 — 전역 Provider + Stack
│   ├── (home)/                       # route group — URL: /
│   │   ├── _hooks/
│   │   │   └── use-home-screen.ts    # 홈 화면 로직 (알림, 다크모드, 디바이스 상태 등)
│   │   └── index.tsx                 # 홈 화면
│   └── (modals)/                     # route group — 모달 화면
│       └── _layout.tsx               # presentation: modal 설정
│
├── src/
│   ├── components/
│   │   ├── common/                   # 범용 UI 컴포넌트 (LoadingSpinner 등)
│   │   └── wrappers/                 # 재사용 구조 래퍼
│   │       └── webview-wrapper/      # WebView 공통 설정 래퍼
│   │           ├── _hooks/
│   │           │   └── use-webview-wrapper.ts
│   │           └── webview-wrapper.tsx
│   │
│   ├── providers/                    # 앱 전역 Context Provider
│   ├── hooks/                        # 공용 커스텀 훅 (여러 화면에서 공유)
│   ├── lib/                          # 유틸리티, 브릿지
│   │   └── router.ts                 # 타입 안전 라우팅 유틸
│   ├── constants/                    # 상수 및 설정값
│   └── types/                        # 전역 타입 정의
│
└── assets/                           # 이미지, 폰트 등 정적 리소스
```

## Architecture

### 레이어 역할 분리

| 레이어 | 위치 | 역할 |
|--------|------|------|
| **Screen** | `app/(name)/` | 라우트 + 화면 UI. `_hooks/`로 로직 분리 |
| **Screen Logic** | `app/(name)/_hooks/` | 화면별 로직 (expo-router가 라우트로 인식 안 함) |
| **Modal** | `app/(modals)/` | 모달 presentation 화면 |
| **Wrapper** | `src/components/wrappers/` | 재사용 구조 래퍼 (WebView, ScreenWrapper 등) |
| **Common** | `src/components/common/` | 범용 UI 컴포넌트 |
| **Shared Hooks** | `src/hooks/` | 여러 화면에서 공유하는 훅 |
| **Provider** | `src/providers/` | 앱 전역 상태 및 설정 |

### 화면 추가 패턴

```
app/(screen-name)/
  _hooks/
    use-screen-name.ts   ← 화면 로직
  index.tsx              ← 화면 UI
```

### 데이터 흐름

```
app/(home)/index.tsx
  ├─ _hooks/use-home-screen.ts     (화면 로직)
  └─ src/components/wrappers/      (구조 래퍼)
```

### 모달 화면 추가 방법

```
app/(modals)/screen-name.tsx 파일 추가
src/lib/router.ts의 ROUTES에 경로 추가
```

## Scripts

```bash
pnpm lint        # ESLint 검사
pnpm typecheck   # TypeScript 타입 검사
pnpm format      # Prettier 포맷팅
```
