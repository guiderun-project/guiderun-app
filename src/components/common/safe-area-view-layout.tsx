import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface SafeAreaViewLayoutProps {
  children: React.ReactNode;
}

const SafeAreaViewLayout = ({ children }: SafeAreaViewLayoutProps) => {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>;
};

export default SafeAreaViewLayout;
