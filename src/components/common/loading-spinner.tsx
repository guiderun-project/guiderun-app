import { ActivityIndicator, View } from 'react-native';

export function LoadingSpinner() {
  return (
    <View className="absolute inset-0 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
