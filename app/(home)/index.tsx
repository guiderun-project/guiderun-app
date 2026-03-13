import WebViewWrapper from '@/src/components/wrappers/webview-wrapper/webview-wrapper';

import { useHomeScreen } from './_hooks/use-home-screen';

export default function HomeScreen() {
  useHomeScreen();
  return <WebViewWrapper />;
}
