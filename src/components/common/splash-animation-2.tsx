import { useCallback, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LOGO_WIDTH = 180;
const LOGO_HEIGHT = 124;

const FADE_IN_DURATION = 400;
const TEXT_DELAY = 300;
const TEXT_DURATION = 700;
const HOLD_DURATION = 900;
const FADE_OUT_DURATION = 500;

interface SplashAnimation2Props {
  onFinish: () => void;
}

export function SplashAnimation2({ onFinish }: SplashAnimation2Props) {
  const screenOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(50);
  const textOpacity = useSharedValue(0);

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // 화면 fade in → 텍스트 등장 대기 + 홀드 → fade out
    screenOpacity.value = withSequence(
      withTiming(1, { duration: FADE_IN_DURATION }),
      withDelay(
        TEXT_DELAY + TEXT_DURATION + HOLD_DURATION,
        withTiming(0, { duration: FADE_OUT_DURATION }, (finished) => {
          if (finished) runOnJS(handleFinish)();
        }),
      ),
    );

    // 텍스트: 아래에서 위로 슬라이드 + fade in
    textTranslateY.value = withDelay(
      TEXT_DELAY,
      withTiming(0, { duration: TEXT_DURATION, easing: Easing.out(Easing.quad) }),
    );
    textOpacity.value = withDelay(TEXT_DELAY, withTiming(1, { duration: TEXT_DURATION }));
  }, [handleFinish, screenOpacity, textOpacity, textTranslateY]);

  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <Image
        source={require('@/assets/splash/guiderun-splash2.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Image
        source={require('@/assets/logo/guiderun-logo-black.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Text style={styles.text}>함께 연결된 안전한 러닝</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    position: 'absolute',
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    top: (SCREEN_HEIGHT - LOGO_HEIGHT) / 2,
    left: (SCREEN_WIDTH - LOGO_WIDTH) / 2,
  },
  textContainer: {
    position: 'absolute',
    top: (SCREEN_HEIGHT + LOGO_HEIGHT) / 2 + 17.4,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
});
