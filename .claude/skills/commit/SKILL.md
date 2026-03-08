---
name: commit
description: 변경사항을 분석하여 Conventional Commits 형식으로 커밋
disable-model-invocation: true
allowed-tools: Bash, Read, Grep
argument-hint: [커밋메시지]
---

# 커밋 생성

## 절차

1. `git status`와 `git diff`로 변경사항 확인
2. 변경사항 분석:
   - 새 기능 → `feat:`
   - 버그 수정 → `fix:`
   - 리팩토링 → `refactor:`
   - 설정/빌드 → `chore:`
   - 스타일/포맷 → `style:`
   - 문서 → `docs:`
   - 테스트 → `test:`
   - 성능 → `perf:`
   - CI/CD → `ci:`
3. `$ARGUMENTS`가 있으면 그대로 사용, 없으면 자동 생성 (한글)
4. 관련 파일만 `git add` (민감 파일 제외: `.env`, credentials 등)
5. 커밋 메시지 형식:
   ```
   <type>: <subject>

   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
   ```
6. 커밋 실행 후 `git status`로 결과 확인
