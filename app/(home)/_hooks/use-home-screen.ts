import { useDeepLink } from './use-deep-link';

export function useHomeScreen() {
  const { initialUrl, isReady } = useDeepLink();
  return { initialUrl, isReady };
}
