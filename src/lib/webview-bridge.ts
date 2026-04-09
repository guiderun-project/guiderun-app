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
export type WebToNativeMessage = { type: '__PLACEHOLDER__'; payload: undefined };

/**
 * 네이티브 → 웹 메시지
 *
 * @example
 * // | { type: 'PUSH_TOKEN'; payload: { token: string } }
 * // | { type: 'NAVIGATE'; payload: { path: string } }
 */
export type NativeToWebMessage = { type: '__PLACEHOLDER__'; payload: undefined };

// ─────────────────────────────────────────────────────────────────────────────
// 내부 유틸 타입
// ─────────────────────────────────────────────────────────────────────────────

type ExtractPayload<Union, Type extends string> = Union extends { type: Type; payload: infer P }
  ? P
  : never;

type Handler<P> = (payload: P) => void | Promise<void>;

// ─────────────────────────────────────────────────────────────────────────────
// WebViewBridge
// ─────────────────────────────────────────────────────────────────────────────

class WebViewBridge {
  private ref: RefObject<WebView> | null = null;
  private handlers = new Map<string, Handler<unknown>>();

  /**
   * WebView ref 연결
   * useWebViewWrapper 또는 WebViewWrapper에서 호출
   */
  attach(ref: RefObject<WebView>): void {
    this.ref = ref;
  }

  /**
   * 웹 → 네이티브 메시지 핸들러 등록
   * type에 따라 payload 타입이 자동 추론됨
   *
   * @example
   * webViewBridge.register('REQUEST_PERMISSION', ({ permission }) => { ... });
   */
  register<T extends WebToNativeMessage['type']>(
    type: T,
    handler: Handler<ExtractPayload<WebToNativeMessage, T>>,
  ): void {
    this.handlers.set(type, handler as Handler<unknown>);
  }

  /**
   * WebView onMessage 이벤트 핸들러
   * WebViewWrapper의 onMessage prop에 연결
   *
   * @example
   * <WebView onMessage={webViewBridge.handleMessage} />
   */
  handleMessage = (event: WebViewMessageEvent): void => {
    let message: WebToNativeMessage;

    try {
      message = JSON.parse(event.nativeEvent.data);
    } catch {
      console.warn('[Bridge] 메시지 파싱 실패:', event.nativeEvent.data);
      return;
    }

    const handler = this.handlers.get(message.type);

    if (!handler) {
      console.warn('[Bridge] 등록되지 않은 메시지 타입:', message.type);
      return;
    }

    handler(message.payload);
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
