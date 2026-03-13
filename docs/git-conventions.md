# Git 컨벤션

## 커밋 메시지 (Conventional Commits)
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

## 브랜치 전략
- `main` — 프로덕션 배포
- `develop` — 개발 통합
- `staging` — 내부 테스트 배포
- `feature/<설명>` — 기능 개발
- `fix/<설명>` — 버그 수정
- `release/<버전>` — 릴리즈 준비
- `hotfix/<설명>` — 프로덕션 긴급 수정

## 브랜치 흐름
```
feature/* → develop → staging → main
```

## pre-commit
- `tsc --noEmit` → `lint-staged` (eslint --fix + prettier --write)
- 커밋 전 반드시 타입 체크 + 린트 통과 필요
