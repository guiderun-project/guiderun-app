# CI/CD 구성 체크리스트

> 작업 완료 시 `[ ]` → `[x]` 로 업데이트할 것

## Phase 1 — 즉시 가능 (계정 없이)

- [x] `staging` 브랜치 생성
- [x] GitHub Actions — PR CI 워크플로우 작성 (typecheck + lint)
- [ ] GitHub Actions — staging push 시 네이티브 빌드 + 배포 워크플로우 작성 (`deploy.yml`, 계정 준비 후)
- [ ] Fastlane 기본 구조 세팅 (`Gemfile`, `Fastfile`, `Appfile`)

## Phase 2 — Android (Google 계정 준비 후)

- [ ] Firebase 프로젝트 생성 + App Distribution 활성화
- [ ] Firebase 서비스 계정 JSON 발급
- [ ] GitHub Secrets 등록 (`FIREBASE_APP_ID_ANDROID`, `GOOGLE_APPLICATION_CREDENTIALS`)
- [ ] Android 빌드 + Firebase App Distribution 배포 워크플로우 작성
- [ ] 빌드 넘버 자동 증가 설정 (`github.run_number` 활용)

## Phase 3 — iOS (Apple Developer 계정 + $99 결제 후)

- [ ] Apple Developer 계정 생성 및 결제
- [ ] App ID 생성, API Key 발급 (Fastlane용)
- [ ] GitHub Secrets 등록 (`APPLE_API_KEY_ID`, `APPLE_API_ISSUER_ID`, `APPLE_API_KEY_CONTENT`)
- [ ] Fastlane match 세팅 (인증서/프로비저닝 프로파일 Git 관리)
- [ ] iOS 빌드 + TestFlight 업로드 워크플로우 작성

## Phase 4 — 스토어 배포 (안정화 후)

- [ ] Google Play 내부 테스트 트랙 → 프로덕션 배포 워크플로우
- [ ] App Store Connect 자동 제출 워크플로우
- [ ] 버전 자동 bump (conventional commits 기반)

---

## 브랜치 전략

```
feature/* → develop   PR: typecheck + lint 체크
develop   → staging   자동 빌드 + 내부 배포 (Android: Firebase / iOS: TestFlight)
staging   → main      스토어 배포 (Phase 4)
```
