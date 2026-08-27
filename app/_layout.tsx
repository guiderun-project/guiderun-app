import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SplashAnimation } from '@/src/components/common/splash-animation';
import { SplashAnimation2 } from '@/src/components/common/splash-animation-2';
import { AppProvider } from '@/src/providers/app-provider';

type SplashState = 'splash1' | 'splash2' | 'done';

export default function RootLayout() {
  const [splashState, setSplashState] = useState<SplashState>('splash1');

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
      {splashState !== 'done' && <View style={styles.splashBackground} pointerEvents="none" />}
      {splashState === 'splash1' && <SplashAnimation onFinish={() => setSplashState('splash2')} />}
      {splashState === 'splash2' && <SplashAnimation2 onFinish={() => setSplashState('done')} />}
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  splashBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151B23',
  },
});
