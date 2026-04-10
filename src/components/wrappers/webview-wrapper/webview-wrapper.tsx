import { View } from 'react-native';
import { WebView, WebViewProps, type WebViewNavigation } from 'react-native-webview';

import { LoadingSpinner } from '@/src/components/common/loading-spinner';
import { WebToNativeMessage, webViewBridge } from '@/src/lib/webview-bridge';
import { useWebViewWrapper } from './_hooks/use-webview-wrapper';

interface WebViewWrapperProps extends Omit<
  WebViewProps,
  'source' | 'onLoadEnd' | 'onNavigationStateChange' | 'onMessage'
> {
  url?: string;
  /**
   * Android 물리 백버튼 블로킹 여부 (기본값: true)
   */
  isAndroidBackBlock?: boolean;
  /**
   * 로딩 스피너 표시 여부 (기본값: true)
   */
  hasLoadingSpinner?: boolean;
  children?: React.ReactNode;
  /**
   * 네비게이션 상태 변경 핸들러
   */
  onNavigationStateChange?: (navState: WebViewNavigation) => void;
  /**
   * 브릿지가 파싱한 메시지를 받는 핸들러
   */
  onMessage?: (message: WebToNativeMessage) => void;
}

export default function WebViewWrapper({
  url,
  isAndroidBackBlock = true,
  hasLoadingSpinner = true,
  children,
  onMessage,
  onNavigationStateChange,
  ...props
}: WebViewWrapperProps) {
  const { webViewRef, isInitialLoading, handleNavigationStateChange, source, onLoadEnd } =
    useWebViewWrapper({
      url,
      isAndroidBackBlock,
      hasLoadingSpinner,
      onNavigationStateChange,
    });

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        source={source}
        className="flex-1"
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
        onMessage={(event) => {
          const message = webViewBridge.parseMessage(event);
          if (message) onMessage?.(message);
        }}
        {...props}
      />
      {isInitialLoading && hasLoadingSpinner && <LoadingSpinner />}
      {children}
    </View>
  );
}
