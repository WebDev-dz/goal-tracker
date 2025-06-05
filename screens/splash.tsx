import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

const SplashScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 items-center justify-center px-6">
        {/* App Logo/Icon */}
        <View 
          className="w-24 h-24 rounded-3xl items-center justify-center mb-8 shadow-lg"
          style={{ backgroundColor: '#3b82f6' }}
        >
          <Ionicons name="trophy" size={48} color="#FFFFFF" />
        </View>

        {/* App Name */}
        <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          GoalTracker
        </Text>

        {/* App Tagline */}
        <Text className="text-lg text-gray-500 dark:text-gray-400 text-center mb-12">
          Achieve your dreams, one goal at a time
        </Text>

        {/* Loading Indicator (Optional) */}
        <View className="flex-row items-center justify-center">
          <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
          <View className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
          <View className="w-2 h-2 bg-blue-300 rounded-full" />
        </View>
      </View>

      {/* Footer */}
      <View className="items-center pb-8">
        <Text className="text-sm text-gray-400 dark:text-gray-500">
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;