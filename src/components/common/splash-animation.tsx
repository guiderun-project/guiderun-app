import { useCallback, useEffect } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SPLASH_NATURAL_WIDTH = 355;
const SPLASH_NATURAL_HEIGHT = 1708;
const LOGO_WIDTH = 180;
const LOGO_HEIGHT = 124;

const scale = SCREEN_WIDTH / SPLASH_NATURAL_WIDTH;
const scaledSplashHeight = SPLASH_NATURAL_HEIGHT * scale;
const scrollRange = scaledSplashHeight - SCREEN_HEIGHT;
const sectionScroll = scrollRange / 2; // 3 sections → 2 transitions

const SECTION_PAUSE = 300; // 각 구간 정지 시간 (ms)
const SCROLL_DURATION = 800; // 구간 간 스크롤 시간 (ms)
const START_OFFSET = -130; // 시작 위치 위로 올리는 오프셋 (px)

interface SplashAnimationProps {
  onFinish: () => void;
}

export function SplashAnimation({ onFinish }: SplashAnimationProps) {
  const translateY = useSharedValue(-scrollRange + START_OFFSET); // section 3 (이미지 하단에서 약간 위) 시작
  const opacity = useSharedValue(1);

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // section 3 노출 → scroll → section 2 노출 → scroll → section 1 노출
    translateY.value = withSequence(
      withDelay(
        SECTION_PAUSE,
        withTiming(-sectionScroll, {
          duration: SCROLL_DURATION,
          easing: Easing.inOut(Easing.quad),
        }),
      ),
      withDelay(
        SECTION_PAUSE,
        withTiming(0, { duration: SCROLL_DURATION, easing: Easing.inOut(Easing.quad) }),
      ),
    );

    // 전체 스크롤 완료 후 section 1 잠깐 노출 → fade out
    const totalScrollDuration = SECTION_PAUSE + SCROLL_DURATION + SECTION_PAUSE + SCROLL_DURATION;
    opacity.value = withDelay(
      totalScrollDuration + SECTION_PAUSE,
      withTiming(0, { duration: 500 }, (finished) => {
        if (finished) scheduleOnRN(handleFinish);
      }),
    );
  }, [handleFinish, opacity, translateY]);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Animated.Image
        source={require('@/assets/splash/guiderun-splash.png')}
        style={[styles.splashImage, imageAnimatedStyle]}
        resizeMode="cover"
      />
      <Image
        source={require('@/assets/logo/guiderun-logo-white.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#151B23',
  },
  splashImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: scaledSplashHeight,
  },
  logo: {
    position: 'absolute',
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    top: (SCREEN_HEIGHT - LOGO_HEIGHT) / 2,
    left: (SCREEN_WIDTH - LOGO_WIDTH) / 2,
  },
});
