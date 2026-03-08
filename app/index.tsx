import { SafeAreaView } from 'react-native-safe-area-context';

import WebViewScreen from '@/src/components/webview-screen';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <WebViewScreen />
    </SafeAreaView>
  );
}
