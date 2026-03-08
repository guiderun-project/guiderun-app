---
name: new-component
description: 프로젝트 컨벤션에 맞는 새 컴포넌트 파일 생성
disable-model-invocation: true
allowed-tools: Write, Read, Bash
argument-hint: <component-name> (예: error-boundary, splash-screen)
---

# 컴포넌트 생성

`$ARGUMENTS` 이름으로 새 컴포넌트를 생성합니다.

## 규칙
- 파일 경로: `src/components/$0.tsx`
- 파일명: kebab-case
- 컴포넌트명: PascalCase (파일명에서 변환)
- 스타일: NativeWind className 사용 (StyleSheet, 인라인 스타일 금지)
- Props: interface로 정의 (`{ComponentName}Props`)
- export: `export default function`

## 템플릿

```tsx
import { View } from 'react-native';

interface {PascalName}Props {
  // props
}

export default function {PascalName}({ }: {PascalName}Props) {
  return (
    <View>
      {/* TODO */}
    </View>
  );
}
```
