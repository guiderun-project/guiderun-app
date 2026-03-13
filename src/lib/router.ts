import { router } from 'expo-router';
import type { Href } from 'expo-router';

// ─── Route 상수 ────────────────────────────────────────────────────────────────
// 새 화면 추가 시 여기에만 추가
export const ROUTES = {
  HOME: '/',
} as const satisfies Record<string, Href>;

// ─── 파라미터가 있는 라우트 타입 ──────────────────────────────────────────────
// 파라미터 라우트 추가 예시: '/user/[id]': { id: string }
type ParamRoutes = Record<never, never>;

// ─── 타입 유틸리티 ────────────────────────────────────────────────────────────
type StaticRoute = (typeof ROUTES)[keyof typeof ROUTES];
type ParamRoute = keyof ParamRoutes;
type AppRoute = StaticRoute | ParamRoute;

type NavigateTo<T extends AppRoute> = T extends ParamRoute
  ? { pathname: T; params: ParamRoutes[T] }
  : T;

// ─── Router 함수 ──────────────────────────────────────────────────────────────
export const navigate = <T extends AppRoute>(to: NavigateTo<T>) => router.navigate(to as Href);

export const push = <T extends AppRoute>(to: NavigateTo<T>) => router.push(to as Href);

export const replace = <T extends AppRoute>(to: NavigateTo<T>) => router.replace(to as Href);

export const back = () => router.back();

export const canGoBack = () => router.canGoBack();
