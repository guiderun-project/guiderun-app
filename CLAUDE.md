# GuideRun App - Claude Code Instructions

## 프로젝트 개요
- **Expo (SDK 54)** + **React Native WebView** 앱
- CNG(Continuous Native Generation) 방식 — `ios/`, `android/` 폴더는 git에 포함하지 않음
- 패키지 매니저: **pnpm**
- 스타일링: **NativeWind (TailwindCSS)**
- 라우팅: **expo-router** (파일 기반)

## 프로젝트 구조
```
app/            → expo-router 라우팅 (화면 진입점만, 로직 최소화)
src/
├── components/ → UI 컴포넌트
├── constants/  → 설정값, 상수
├── hooks/      → 커스텀 훅
├── lib/        → 유틸리티, 브릿지 등
├── providers/  → Context Provider
└── types/      → 타입 정의
```

## 코딩 스타일 & 규칙

### 철학
- 오버엔지니어링 경계 — 항상 적정 수준 유지
- 한 줄 한 줄 근거 있는 코드 작성
- 단일 책임 원칙(SRP) 지향
- 코드 품질 vs 빠른 구현은 상황에 따라 유연하게

### TypeScript
- `any` 사용 금지
- `interface`: 컴포넌트 Props, API 응답/요청 구조체 (객체 형태, 확장 가능성 있는 것)
- `type`: 함수 시그니처, 유니온/교차 타입, 모듈 레벨 타입, 유틸리티 조합
- 유틸리티 타입 적극 활용
- strict 모드 활성화

### 컴포넌트 & 훅
- 함수형 컴포넌트 + 커스텀 훅으로 로직 분리
- 한 파일에 모든 로직 몰아넣기 지양 — 성격(state / action 등)에 따라 분리
- 재사용성 기준으로 컴포넌트 분리 (줄 수 기준 없음)
- 과한 추상화 = 오버엔지니어링
- 컴포넌트는 `export default function`, 유틸/훅은 `export function` (named export)

### 스타일링
- **NativeWind(TailwindCSS) className 사용** — `style={{ }}` 인라인 스타일 사용하지 않음
- `StyleSheet.create` 사용하지 않음
- className 순서는 prettier-plugin-tailwindcss가 자동 정렬

### 네이밍
- **파일명**: kebab-case (예: `webview-screen.tsx`, `loading-spinner.tsx`) — Expo 공식 컨벤션
- **컴포넌트**: PascalCase (예: `WebViewScreen`, `LoadingSpinner`)
- **훅**: camelCase with `use` prefix (예: `useBackHandler`)
- **훅 파일명**: kebab-case with `use-` prefix (예: `use-back-handler.ts`)
- **상수**: UPPER_SNAKE_CASE (예: `WEBVIEW_URL`, `CONFIG`)
- **함수/변수**: camelCase
- **타입/인터페이스**: PascalCase (예: `WebViewScreenProps`)
- **boolean 변수**: `is`, `has`, `can`, `should` prefix (예: `isLoading`, `canGoBack`)

### Import 순서
1. React / React Native
2. 외부 라이브러리 (expo, third-party)
3. `@/src/` 내부 모듈 (components → hooks → lib → constants → types 순)
4. 상대 경로 import
- 각 그룹 사이 빈 줄 구분
- 절대 경로(`@/`) 사용 권장, 같은 디렉토리 내에서만 상대 경로(`./`) 허용

### 상태관리
- 클라이언트 상태: **Zustand** 선호
- 서버 상태: **TanStack Query** (Query Key Factory + Custom Hook Abstraction Layer)
- 폼: **react-hook-form + zod**

## 환경 설정
- 환경변수: `EXPO_PUBLIC_` 접두사 사용 (Expo 규칙)
- `.env.local`: 로컬 개발용 (git 미포함)
- `.env.example`: 환경변수 템플릿 (새 환경변수 추가 시 반드시 함께 업데이트)
- 환경별 URL 분리: dev / staging / production

## Prettier 설정
- singleQuote, semi, trailingComma: all
- printWidth: 100, tabWidth: 2
- endOfLine: lf
- prettier-plugin-tailwindcss 적용

## Git 규칙

### 커밋 메시지 (Conventional Commits)
```
<type>: <subject>

[optional body]
```
- **type**: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `perf`, `ci`, `build`
- **subject**: 한글 또는 영문, 명령형/현재형, 50자 이내
- 예시:
  - `feat: WebView 기본 구조 및 백버튼 처리 추가`
  - `fix: Android 백버튼 WebView 히스토리 미동작 수정`
  - `chore: ESLint, Prettier 설정 추가`
  - `refactor: LoadingSpinner 컴포넌트 분리`
  - `ci: GitHub Actions 배포 워크플로우 추가`

### 브랜치 전략
- `main` — 프로덕션 배포
- `develop` — 개발 통합
- `feature/<설명>` — 기능 개발
- `fix/<설명>` — 버그 수정
- `release/<버전>` — 릴리즈 준비
- `hotfix/<설명>` — 프로덕션 긴급 수정

### 커밋 & 푸시 규칙 (필수)
- **커밋 또는 푸시 전 반드시 작업 브랜치를 생성할 것** — `main`, `develop`에 직접 커밋 금지
- **`main` 또는 `develop`으로 머지는 반드시 사용자에게 확인 후 진행할 것**
  - 단, "PR 생성 후 develop에 머지해줘" 처럼 머지를 명시적으로 요청한 경우는 확인 없이 바로 진행
- **PR 생성 요청 시 작업 브랜치가 없다면 브랜치를 먼저 생성한 후 PR을 진행할 것**
- 브랜치 네이밍은 브랜치 전략 규칙을 따를 것 (예: `feature/webview-wrapper`, `fix/android-back-handler`)

### pre-commit
- `tsc --noEmit` → `lint-staged` (eslint --fix + prettier --write)
- 커밋 전 반드시 타입 체크 + 린트 통과 필요

## 스크립트
- `pnpm start` — Expo 개발 서버
- `pnpm ios` / `pnpm android` — 플랫폼별 실행
- `pnpm lint` — ESLint 검사
- `pnpm typecheck` — TypeScript 타입 검사
- `pnpm format` — Prettier 포맷팅
- `pnpm format:check` — 포맷팅 확인

## 진행 중인 작업

- CI/CD 구성 진행 중 — `docs/cicd-checklist.md` 참조
- **작업 완료 시 체크리스트 파일의 해당 항목을 반드시 `[x]`로 업데이트할 것**

## Claude 소통 규칙
- 10년차 이상 시니어 엔지니어로서 개발적 논의 파트너 역할
- 작성한 코드에 대해 근거와 설명을 반드시 함께 제시
- **임의로 진행하지 말고 중요한 결정은 반드시 확인/질문할 것**
- 프로젝트 진행 시 메모리 파일에 진행 현황을 업데이트할 것
- 한국어로 소통
