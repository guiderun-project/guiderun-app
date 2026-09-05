import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import SafeAreaViewLayout from '@/src/components/common/safe-area-view-layout';
import WebViewWrapper from '@/src/components/wrappers/webview-wrapper/webview-wrapper';
import { WebToNativeMessage } from '@/src/lib/webview-bridge';
import useHomeScreen from './_hooks/use-home-screen';

type StatusBarStyle = 'light' | 'dark';

// backgroundColor 미전달 시 style 기준으로 쓰는 기본값
const DEFAULT_STATUS_BAR_BACKGROUND: Record<StatusBarStyle, string> = {
  dark: '#FFFFFF',
  light: '#000000',
};

export default function HomeScreen() {
  const { initialUrl, isReady } = useHomeScreen();
  const [statusBar, setStatusBar] = useState<{ style: StatusBarStyle; backgroundColor: string }>({
    style: 'dark',
    backgroundColor: DEFAULT_STATUS_BAR_BACKGROUND.dark,
  });

  const onMessage = (message: WebToNativeMessage) => {
    if (message.type === 'SET_STATUS_BAR') {
      const { style, backgroundColor } = message.payload;
      setStatusBar({
        style,
        backgroundColor: backgroundColor ?? DEFAULT_STATUS_BAR_BACKGROUND[style],
      });
    }
  };

  if (!isReady) return null;

  return (
    <SafeAreaViewLayout statusBarBackgroundColor={statusBar.backgroundColor}>
      <StatusBar style={statusBar.style} />
      <WebViewWrapper url={initialUrl} onMessage={onMessage} />
    </SafeAreaViewLayout>
  );
}
