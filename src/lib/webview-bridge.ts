import type { RefObject } from 'react';
import type { WebView, WebViewMessageEvent } from 'react-native-webview';

// ─────────────────────────────────────────────────────────────────────────────
// 메시지 타입
// 명세 확정 후 아래 유니온에 타입 추가
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 웹 → 네이티브 메시지
 *
 * @example
 * // | { type: 'REQUEST_PERMISSION'; payload: { permission: 'camera' | 'location' } }
 * // | { type: 'OPEN_SHARE'; payload: { url: string; title?: string } }
 */
export type WebToNativeMessage = {
  type: 'SET_STATUS_BAR';
  payload: {
    /**
     * 상태바 아이콘/텍스트 색상.
     * 'dark' = 어두운 아이콘 (밝은 배경용), 'light' = 밝은 아이콘 (어두운 배경용)
     */
    style: 'light' | 'dark';
    /**
     * 상태바 배경색 (hex). 생략 시 style 기준 흰/검 고정값으로 대체됨
     * (style: 'dark' → #FFFFFF, style: 'light' → #000000)
     */
    backgroundColor?: string;
  };
};

/**
 * 네이티브 → 웹 메시지
 *
 * @example
 * // | { type: 'PUSH_TOKEN'; payload: { token: string } }
 */
export type NativeToWebMessage = { type: 'NAVIGATE'; payload: { path: string } };

// ─────────────────────────────────────────────────────────────────────────────
// WebViewBridge
// ─────────────────────────────────────────────────────────────────────────────

class WebViewBridge {
  private ref: RefObject<WebView | null> | null = null;

  /**
   * WebView ref 연결
   * useWebViewWrapper에서 호출
   */
  attach(ref: RefObject<WebView | null>): void {
    this.ref = ref;
  }

  /**
   * 웹 → 네이티브 메시지 파싱
   * WebViewWrapper의 onMessage prop에서 호출
   *
   * @example
   * <WebView onMessage={(e) => {
   *   const msg = webViewBridge.parseMessage(e);
   *   if (msg) onMessage?.(msg);
   * }} />
   */
  parseMessage = (event: WebViewMessageEvent): WebToNativeMessage | null => {
    try {
      return JSON.parse(event.nativeEvent.data) as WebToNativeMessage;
    } catch {
      console.warn('[Bridge] 메시지 파싱 실패:', event.nativeEvent.data);
      return null;
    }
  };

  /**
   * 네이티브 → 웹 메시지 전송
   * 웹에서는 window.addEventListener('message', ...) 로 수신
   *
   * @example
   * webViewBridge.sendToWeb({ type: 'PUSH_TOKEN', payload: { token } });
   */
  sendToWeb<T extends NativeToWebMessage>(message: T): void {
    if (!this.ref?.current) {
      console.warn('[Bridge] WebView ref가 연결되지 않음');
      return;
    }

    const serialized = JSON.stringify(message);
    const js = `window.postMessage(${JSON.stringify(serialized)}, '*'); true;`;

    this.ref.current.injectJavaScript(js);
  }
}

export const webViewBridge = new WebViewBridge();
