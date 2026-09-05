import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import SafeAreaViewLayout from '@/src/components/common/safe-area-view-layout';
import WebViewWrapper from '@/src/components/wrappers/webview-wrapper/webview-wrapper';
import { WebToNativeMessage } from '@/src/lib/webview-bridge';
import useHomeScreen from './_hooks/use-home-screen';

type StatusBarStyle = 'light' | 'dark';

// style별 고정 배경색. 'dark'(어두운 아이콘) = 흰 배경, 'light'(밝은 아이콘) = 검정 배경
const STATUS_BAR_BACKGROUND: Record<StatusBarStyle, string> = {
  dark: '#FFFFFF',
  light: '#000000',
};

export default function HomeScreen() {
  const { initialUrl, isReady } = useHomeScreen();
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>('dark');

  const onMessage = (message: WebToNativeMessage) => {
    if (message.type === 'SET_STATUS_BAR') {
      setStatusBarStyle(message.payload.style);
    }
  };

  if (!isReady) return null;

  const backgroundColor = STATUS_BAR_BACKGROUND[statusBarStyle];

  return (
    <SafeAreaViewLayout statusBarBackgroundColor={backgroundColor}>
      <StatusBar style={statusBarStyle} />
      <WebViewWrapper url={initialUrl} onMessage={onMessage} />
    </SafeAreaViewLayout>
  );
}
