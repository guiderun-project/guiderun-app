---
name: typecheck
description: TypeScript 타입 체크 + ESLint 검사 실행
disable-model-invocation: true
allowed-tools: Bash
---

# 타입 체크 & 린트

## 절차

1. `pnpm typecheck` 실행 (tsc --noEmit)
2. `pnpm lint` 실행 (eslint)
3. 에러가 있으면 분석하여 수정 방안 제시
4. 에러가 없으면 통과 결과 보고
