---
name: pr
description: feature 브랜치 생성 → 커밋 → PR 생성 → develop에 머지까지 한번에 처리
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, Glob
argument-hint: <브랜치명> <커밋메시지>
---

# PR 생성 및 머지 워크플로우

feature 브랜치를 생성하고 PR을 만들어 develop에 머지합니다.

## 인자
- `$0`: 브랜치명 (feature/ 접두사 자동 추가)
- `$1` 이후: 커밋 메시지 (없으면 변경사항 분석 후 자동 생성)

## 절차

1. 현재 변경사항 확인 (`git status`, `git diff`)
2. develop 브랜치에서 `feature/$0` 브랜치 생성 및 체크아웃
3. 변경사항 스테이징 및 커밋 (Conventional Commits 형식)
   - 커밋 메시지가 주어지면 그대로 사용
   - 없으면 변경사항을 분석하여 적절한 타입(`feat`, `fix`, `refactor` 등) + 한글 메시지 생성
4. feature 브랜치를 remote에 push
5. `gh pr create`로 develop 대상 PR 생성
   - PR 제목: 커밋 메시지 활용
   - PR 본문: 변경사항 요약 + 테스트 계획
6. PR을 develop에 머지 (`gh pr merge --squash`)
7. develop 브랜치로 체크아웃
8. 로컬 feature 브랜치 삭제

## 주의사항
- 머지 전 PR URL을 사용자에게 보여주고 머지 진행 여부 확인
- 충돌 발생 시 사용자에게 알리고 중단
- `--squash` 머지 사용
