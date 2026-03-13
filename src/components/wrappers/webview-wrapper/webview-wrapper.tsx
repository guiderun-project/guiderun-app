import { View } from 'react-native';
import { WebView, WebViewProps, type WebViewNavigation } from 'react-native-webview';

import { LoadingSpinner } from '@/src/components/common/loading-spinner';
import { useWebViewWrapper } from './_hooks/use-webview-wrapper';

interface WebViewWrapperProps extends Omit<
  WebViewProps,
  'source' | 'onLoadEnd' | 'onNavigationStateChange'
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
  /**
   * 네비게이션 상태 변경 핸들러
   */
  onNavigationStateChange?: (navState: WebViewNavigation) => void;
  children?: React.ReactNode;
}

export default function WebViewWrapper({
  url,
  isAndroidBackBlock = true,
  hasLoadingSpinner = true,
  onNavigationStateChange,
  children,
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
        {...props}
      />
      {isInitialLoading && hasLoadingSpinner && <LoadingSpinner />}
      {children}
    </View>
  );
}
