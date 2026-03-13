import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import type {
  WebViewErrorEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';

import { CONFIG } from '@/src/constants/config';

export interface UseWebViewWrapperProps {
  url?: string;
  isAndroidBackBlock: boolean;
  hasLoadingSpinner: boolean;
  onNavigationStateChange?: (navState: WebViewNavigation) => void;
}

export function useWebViewWrapper({
  url,
  isAndroidBackBlock,
  hasLoadingSpinner,
  onNavigationStateChange,
}: UseWebViewWrapperProps) {
  const webViewRef = useRef<WebView>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const source = useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      return { uri: url ?? CONFIG.WEBVIEW_URL_DEV };
    }
    return { uri: url ?? CONFIG.WEBVIEW_URL_PRD };
  }, [url]);

  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      if (isAndroidBackBlock) {
        setCanGoBack(navState.canGoBack);
      }
      onNavigationStateChange?.(navState);
    },
    [isAndroidBackBlock, onNavigationStateChange],
  );

  useEffect(
    function blockAndroidBackPress() {
      if (Platform.OS !== 'android' || !isAndroidBackBlock) return;

      const handleBackPress = () => {
        if (canGoBack) {
          webViewRef.current?.goBack();
          return true; // 이벤트 소비 — 앱 종료 방지
        }
        return false; // 히스토리 없으면 기본 동작 (앱 종료)
      };

      const backPressHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => backPressHandler.remove();
    },
    [canGoBack, isAndroidBackBlock],
  );

  const onLoadEnd = useCallback(
    (_event?: WebViewNavigationEvent | WebViewErrorEvent) => {
      if (hasLoadingSpinner) {
        setIsInitialLoading(false);
      }
    },
    [hasLoadingSpinner],
  );

  return {
    source,
    webViewRef,
    canGoBack,
    isInitialLoading,
    handleNavigationStateChange,
    onLoadEnd,
  };
}
