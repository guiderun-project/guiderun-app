---
name: new-hook
description: 프로젝트 컨벤션에 맞는 새 커스텀 훅 파일 생성
disable-model-invocation: true
allowed-tools: Write, Read, Bash
argument-hint: <hook-name> (예: use-network-status, use-deep-link)
---

# 커스텀 훅 생성

`$ARGUMENTS` 이름으로 새 커스텀 훅을 생성합니다.

## 규칙
- 파일 경로: `src/hooks/$0.ts`
- 파일명: kebab-case, `use-` prefix 필수
- 훅 이름: camelCase (파일명에서 변환)
- export: named export (`export function useXxx`)
- `$0`에 `use-` prefix가 없으면 자동 추가

## 템플릿

```ts
export function {camelName}() {
  // TODO
}
```
