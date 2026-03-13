export const CONFIG = {
  WEBVIEW_URL_PRD: process.env.EXPO_PUBLIC_WEBVIEW_URL_PRD ?? '',
  WEBVIEW_URL_DEV: process.env.EXPO_PUBLIC_WEBVIEW_URL_DEV ?? '',
} as const;
