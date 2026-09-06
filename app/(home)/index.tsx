import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import SafeAreaViewLayout from '@/src/components/common/safe-area-view-layout';
import WebViewWrapper from '@/src/components/wrappers/webview-wrapper/webview-wrapper';
import { WebToNativeMessage } from '@/src/lib/webview-bridge';
import useHomeScreen from './_hooks/use-home-screen';

type BarStyle = 'light' | 'dark';

// backgroundColor 미전달 시 style 기준으로 쓰는 기본값
const DEFAULT_BAR_BACKGROUND: Record<BarStyle, string> = {
  dark: '#FFFFFF',
  light: '#000000',
};

export default function HomeScreen() {
  const { initialUrl, isReady } = useHomeScreen();
  const [statusBar, setStatusBar] = useState<{ style: BarStyle; backgroundColor: string }>({
    style: 'dark',
    backgroundColor: DEFAULT_BAR_BACKGROUND.dark,
  });
  const [bottomBar, setBottomBar] = useState<{ style: BarStyle; backgroundColor: string }>({
    style: 'dark',
    backgroundColor: DEFAULT_BAR_BACKGROUND.dark,
  });

  useEffect(
    function syncAndroidNavigationBarButtonStyle() {
      if (Platform.OS !== 'android') return;
      NavigationBar.setButtonStyleAsync(bottomBar.style);
    },
    [bottomBar.style],
  );

  const onMessage = (message: WebToNativeMessage) => {
    if (message.type === 'SET_STATUS_BAR') {
      const { style, backgroundColor } = message.payload;
      setStatusBar({ style, backgroundColor: backgroundColor ?? DEFAULT_BAR_BACKGROUND[style] });
    }
    if (message.type === 'SET_BOTTOM_BAR') {
      const { style, backgroundColor } = message.payload;
      setBottomBar({ style, backgroundColor: backgroundColor ?? DEFAULT_BAR_BACKGROUND[style] });
    }
  };

  if (!isReady) return null;

  return (
    <SafeAreaViewLayout
      statusBarBackgroundColor={statusBar.backgroundColor}
      bottomBarBackgroundColor={bottomBar.backgroundColor}
    >
      <StatusBar style={statusBar.style} />
      <WebViewWrapper url={initialUrl} onMessage={onMessage} />
    </SafeAreaViewLayout>
  );
}
