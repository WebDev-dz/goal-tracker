import React, { useCallback, useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define navigation prop types
type SettingsStackParamList = {
  Settings: undefined;
  Subscription: undefined;
  About: undefined;
  Notifications: undefined;
  Preferences: undefined;
  PaymentMethods: undefined;
  
};

// Define subscription and benefits data for easy customization
const subscriptionPlans = [
  {
    name: 'Basic',
    description: 'Free',
    icon: 'star-outline',
    iconColor: 'text-gray-500',
  },
  {
    name: 'Premium',
    description: 'Unlock all features',
    icon: 'star-outline',
    iconColor: 'text-gray-500',
  },
  {
    name: 'Pro',
    description: 'Unlock all features',
    icon: 'star-outline',
    iconColor: 'text-gray-500',
  },
];

const benefits = [
  { text: 'Unlimited goals', icon: 'checkmark', iconColor: 'text-green-500' },
  { text: 'Unlimited milestones', icon: 'checkmark', iconColor: 'text-green-500' },
  { text: 'Unlimited budgets', icon: 'checkmark', iconColor: 'text-green-500' },
  { text: 'Priority support', icon: 'checkmark', iconColor: 'text-green-500' },
];

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-800">
          <Text className="text-lg text-gray-900 dark:text-white">Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

type NavigationProp = NativeStackNavigationProp<SettingsStackParamList, 'Subscription'>;

const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const theme = useTheme();
  const handleUpgrade = useCallback(async () => {
    setIsUpgrading(true);
    try {
      // Simulate async upgrade logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Upgrading subscription...');
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsUpgrading(false);
    }
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ErrorBoundary>
      <View className="flex-1 bg-gray-50 dark:bg-gray-800">
        <StatusBar
          barStyle={!theme.dark  ? 'dark-content' : 'light-content'}
          backgroundColor={!theme.dark ? '#f9fafb' : '#1f2937'}
        />

        {/* Header */}
        <View className="bg-white dark:bg-gray-900 px-4 py-3 flex-row items-center border-b border-gray-100 dark:border-gray-700">
          <TouchableOpacity
            onPress={handleGoBack}
            className="mr-4"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={!theme.dark ? '#000000' : '#ffffff'}
            />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center mr-8">
            Subscription
          </Text>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Current Plan Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Current Plan
            </Text>
            <View className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex-row items-center">
              <View className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl items-center justify-center mr-4">
                <Ionicons
                  name={subscriptionPlans[0].icon as "star-outline"}
                  size={24}
                  className={subscriptionPlans[0].iconColor}
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {subscriptionPlans[0].name}
                </Text>
                <Text className="text-base text-gray-500 dark:text-gray-400">
                  {subscriptionPlans[0].description}
                </Text>
              </View>
            </View>
          </View>

          {/* Upgrade Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Upgrade
            </Text>
            {subscriptionPlans.slice(1).map((plan, index) => (
              <View
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex-row items-center mb-4"
              >
                <View className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl items-center justify-center mr-4">
                  <Ionicons name={plan.icon as "star-outline"} size={24} className={plan.iconColor} />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {plan.name}
                  </Text>
                  <Text className="text-base text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Benefits Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Benefits
            </Text>
            {benefits.map((benefit, index) => (
              <View
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex-row items-center mb-4"
              >
                <View className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl items-center justify-center mr-4">
                  <Ionicons name={benefit.icon as "checkmark"} size={24} className={benefit.iconColor} />
                </View>
                <Text className="text-lg text-gray-900 dark:text-white flex-1">
                  {benefit.text}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View className="px-6 pb-8 pt-4 bg-gray-50 dark:bg-gray-800">
          <TouchableOpacity
            className="bg-blue-500 dark:bg-blue-600 py-4 rounded-full items-center shadow-md"
            onPress={handleUpgrade}
            activeOpacity={0.8}
            accessibilityLabel="Upgrade subscription"
            accessibilityRole="button"
            disabled={isUpgrading}
          >
            {isUpgrading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-lg font-semibold text-white">
                Upgrade
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ErrorBoundary>
  );
};

export default React.memo(SubscriptionScreen);