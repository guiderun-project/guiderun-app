import type { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // 향후 확장: 푸시 알림, 딥링크, 인증 등의 Provider를 여기서 감싸기
  return <>{children}</>;
}
