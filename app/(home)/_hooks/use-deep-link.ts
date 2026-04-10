import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';

import { CONFIG } from '@/src/constants/config';
import { webViewBridge } from '@/src/lib/webview-bridge';

function extractPath(url: string): string | null {
  const { path } = Linking.parse(url);
  return path ? `/${path}` : null;
}

function buildUrl(path: string): string {
  const base =
    process.env.NODE_ENV === 'development' ? CONFIG.WEBVIEW_URL_DEV : CONFIG.WEBVIEW_URL_PRD;
  return `${base.replace(/\/$/, '')}${path}`;
}

/**
 * 딥링크 처리 훅
 *
 * - 앱 종료 상태에서 딥링크 진입 → WebView 초기 URL 반환
 * - 앱 실행 중 딥링크 수신 → WebView에 NAVIGATE 메시지 전송
 * - isReady: getInitialURL 완료 전까지 WebView 렌더 지연용
 */
export function useDeepLink() {
  const [initialUrl, setInitialUrl] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        const path = extractPath(url);
        if (path) setInitialUrl(buildUrl(path));
      }
      setIsReady(true);
    });

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const path = extractPath(url);
      if (!path) return;
      webViewBridge.sendToWeb({ type: 'NAVIGATE', payload: { path } });
    });

    return () => subscription.remove();
  }, []);

  return { initialUrl, isReady };
}
