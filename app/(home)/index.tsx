import WebViewWrapper from '@/src/components/wrappers/webview-wrapper/webview-wrapper';

import { WebToNativeMessage } from '@/src/lib/webview-bridge';
import { useHomeScreen } from './_hooks/use-home-screen';

export default function HomeScreen() {
  const { initialUrl, isReady } = useHomeScreen();

  const onMessage = (message: WebToNativeMessage) => {};

  if (!isReady) return null;

  return <WebViewWrapper url={initialUrl} onMessage={onMessage} />;
}
