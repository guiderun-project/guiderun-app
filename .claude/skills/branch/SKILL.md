---
name: branch
description: 브랜치 생성 및 체크아웃
disable-model-invocation: true
allowed-tools: Bash
argument-hint: <type/name> (예: feature/webview-setup, fix/back-button)
---

# 브랜치 생성

## 절차

1. 현재 브랜치 및 상태 확인 (`git status`)
2. 커밋되지 않은 변경사항이 있으면 사용자에게 알림
3. develop 브랜치를 최신화 (`git pull origin develop`)
4. develop에서 새 브랜치 생성: `$ARGUMENTS`
   - `feature/`, `fix/`, `hotfix/`, `release/` 접두사가 없으면 `feature/` 자동 추가
5. 브랜치 체크아웃
