# 코딩 컨벤션

## 철학
- 오버엔지니어링 경계 — 항상 적정 수준 유지
- 한 줄 한 줄 근거 있는 코드 작성
- 단일 책임 원칙(SRP) 지향
- 코드 품질 vs 빠른 구현은 상황에 따라 유연하게

## TypeScript
- `any` 사용 금지
- `interface`: 컴포넌트 Props, API 응답/요청 구조체 (객체 형태, 확장 가능성 있는 것)
- `type`: 함수 시그니처, 유니온/교차 타입, 모듈 레벨 타입, 유틸리티 조합
- 유틸리티 타입 적극 활용
- strict 모드 활성화

## 컴포넌트 & 훅
- 함수형 컴포넌트 + 커스텀 훅으로 로직 분리
- 한 파일에 모든 로직 몰아넣기 지양 — 성격(state / action 등)에 따라 분리
- 재사용성 기준으로 컴포넌트 분리 (줄 수 기준 없음)
- 과한 추상화 = 오버엔지니어링
- 컴포넌트는 `export default function`, 유틸/훅은 `export function` (named export)

## 스타일링
- **NativeWind(TailwindCSS) className 사용** — `style={{ }}` 인라인 스타일 사용하지 않음
- `StyleSheet.create` 사용하지 않음
- className 순서는 prettier-plugin-tailwindcss가 자동 정렬

## 네이밍
- **파일명**: kebab-case (예: `webview-screen.tsx`, `loading-spinner.tsx`) — Expo 공식 컨벤션
- **컴포넌트**: PascalCase (예: `WebViewScreen`, `LoadingSpinner`)
- **훅**: camelCase with `use` prefix (예: `useBackHandler`)
- **훅 파일명**: kebab-case with `use-` prefix (예: `use-back-handler.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `WEBVIEW_URL`, `CONFIG`)
- **함수/변수**: camelCase
- **타입/인터페이스**: PascalCase (예: `WebViewScreenProps`)
- **boolean 변수**: `is`, `has`, `can`, `should` prefix (예: `isLoading`, `canGoBack`)

## Import 순서
1. React / React Native
2. 외부 라이브러리 (expo, third-party)
3. `@/src/` 내부 모듈 (components → hooks → lib → constants → types 순)
4. 상대 경로 import
- 각 그룹 사이 빈 줄 구분
- 절대 경로(`@/`) 사용 권장, 같은 디렉토리 내에서만 상대 경로(`./`) 허용

## 상태관리
- 클라이언트 상태: **Zustand** 선호
- 서버 상태: **TanStack Query** (Query Key Factory + Custom Hook Abstraction Layer)
- 폼: **react-hook-form + zod**

## Prettier
- singleQuote, semi, trailingComma: all
- printWidth: 100, tabWidth: 2
- endOfLine: lf
- prettier-plugin-tailwindcss 적용
