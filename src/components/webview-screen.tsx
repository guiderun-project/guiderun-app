import { useRef, useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';

import { LoadingSpinner } from '@/src/components/loading-spinner';
import { CONFIG } from '@/src/constants/config';

interface WebViewScreenProps {
  url?: string;
  onNavigationStateChange?: (navState: WebViewNavigation) => void;
}

export default function WebViewScreen({ url, onNavigationStateChange }: WebViewScreenProps) {
  const webViewRef = useRef<WebView>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      setCanGoBack(navState.canGoBack);
      onNavigationStateChange?.(navState);
    },
    [onNavigationStateChange],
  );

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true; // 이벤트 소비 — 앱 종료 방지
      }
      return false; // 히스토리 없으면 기본 동작 (앱 종료)
    });

    return () => handler.remove();
  }, [canGoBack]);

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        source={{ uri: url ?? CONFIG.WEBVIEW_URL }}
        className="flex-1"
        onLoadEnd={() => setIsInitialLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
      />
      {isInitialLoading && <LoadingSpinner />}
    </View>
  );
}
