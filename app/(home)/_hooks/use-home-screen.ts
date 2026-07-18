import useDeepLink from './use-deep-link';

function useHomeScreen() {
  const { initialUrl, isReady } = useDeepLink();
  return { initialUrl, isReady };
}

export default useHomeScreen;
