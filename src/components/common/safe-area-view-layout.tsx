import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeAreaViewLayoutProps {
  children: React.ReactNode;
  /**
   * 세이프에어리어 상단(상태바 영역) 배경색.
   * Android는 StatusBar 컴포넌트가 직접 칠하지만, iOS는 배경색 지정이 불가능해 오버레이로 대체
   */
  statusBarBackgroundColor?: string;
  /**
   * 세이프에어리어 하단(홈 인디케이터 영역) 배경색.
   * Android는 expo-navigation-bar가 직접 칠하지만, iOS는 배경색 지정이 불가능해 오버레이로 대체
   */
  bottomBarBackgroundColor?: string;
}

const SafeAreaViewLayout = ({
  children,
  statusBarBackgroundColor,
  bottomBarBackgroundColor,
}: SafeAreaViewLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1">
      {children}
      {statusBarBackgroundColor && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: statusBarBackgroundColor,
          }}
        />
      )}
      {bottomBarBackgroundColor && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom,
            backgroundColor: bottomBarBackgroundColor,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default SafeAreaViewLayout;
