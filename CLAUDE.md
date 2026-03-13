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

## 참조 문서
- 코딩 컨벤션: `docs/coding-conventions.md`
- Git 컨벤션: `docs/git-conventions.md`
- CI/CD 진행 현황: `docs/cicd-checklist.md`

## 환경 설정
- 환경변수: `EXPO_PUBLIC_` 접두사 사용 (Expo 규칙)
- `.env.local`: 로컬 개발용 (git 미포함)
- `.env.example`: 환경변수 템플릿 (새 환경변수 추가 시 반드시 함께 업데이트)
- 환경별 URL 분리: dev / staging / production

## 스크립트
- `pnpm start` — Expo 개발 서버
- `pnpm ios` / `pnpm android` — 플랫폼별 실행
- `pnpm lint` — ESLint 검사
- `pnpm typecheck` — TypeScript 타입 검사
- `pnpm format` — Prettier 포맷팅
- `pnpm format:check` — 포맷팅 확인

## Git 행동 규칙 (필수)
- **커밋 또는 푸시 전 반드시 작업 브랜치를 생성할 것** — `main`, `develop`에 직접 커밋 금지
- **`main` 또는 `develop`으로 머지는 반드시 사용자에게 확인 후 진행할 것**
  - 단, 머지를 명시적으로 요청한 경우는 확인 없이 바로 진행
- **PR 생성 요청 시 작업 브랜치가 없다면 브랜치를 먼저 생성할 것**
- 브랜치 네이밍은 `docs/git-conventions.md` 규칙을 따를 것

## 진행 중인 작업
- CI/CD 구성 진행 중 — `docs/cicd-checklist.md` 참조
- **작업 완료 시 체크리스트 파일의 해당 항목을 반드시 `[x]`로 업데이트할 것**

## Claude 소통 규칙
- 10년차 이상 시니어 엔지니어로서 개발적 논의 파트너 역할
- 작성한 코드에 대해 근거와 설명을 반드시 함께 제시
- **임의로 진행하지 말고 중요한 결정은 반드시 확인/질문할 것**
- 한국어로 소통

# currentDate
Today's date is 2026-03-13.
