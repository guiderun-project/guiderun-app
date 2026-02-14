# GuideRun

시각장애러너와 가이드러너를 연결하는 러닝 매칭 서비스입니다.

함께 달리는 즐거움을 누구나 경험할 수 있도록, 시각장애러너와 가이드러너가 서로를 찾고 함께 훈련할 수 있는 플랫폼입니다.

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Language**: TypeScript
- **Routing**: Expo Router (file-based routing)
- **Navigation**: React Navigation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Run

```bash
# 개발 서버 시작
pnpm start

# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## Project Structure

```
guiderun-app/
├── app/              # 페이지 및 라우팅 (file-based routing)
│   ├── (tabs)/       # 탭 네비게이션
│   ├── _layout.tsx   # 루트 레이아웃
│   └── modal.tsx     # 모달 화면
├── assets/           # 이미지, 폰트 등 정적 리소스
├── components/       # 재사용 가능한 컴포넌트
├── constants/        # 상수 정의
├── hooks/            # 커스텀 훅
└── scripts/          # 유틸리티 스크립트
```
