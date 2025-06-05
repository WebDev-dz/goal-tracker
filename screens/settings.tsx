import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import parameter lists from AppNavigator
import { SettingsStackParamList, TabNavigatorParamList } from '../AppNavigator';
import { useColorScheme } from 'nativewind';

// Define the combined navigation prop type
type SettingsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsStackParamList, 'Settings'>,
  BottomTabNavigationProp<TabNavigatorParamList>
>;

// Define settings data structure
interface Setting {
  id: number;
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  hasAvatar?: boolean;
  targetScreen?: keyof SettingsStackParamList | keyof TabNavigatorParamList;
  iconColor: string;
  backgroundColor: string;
}

interface SettingItemProps extends TouchableOpacityProps {
  setting: Setting;
  showChevron?: boolean;
}

interface SectionHeaderProps {
  title: string;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
          <Text className="text-lg text-gray-900 dark:text-white">Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// Settings data for easy customization with colorful icons
const accountSettings: Setting[] = [
  {
    id: 1,
    icon: 'person-outline',
    title: 'Profile',
    description: 'Manage your profile information',
    hasAvatar: true,
    targetScreen: 'ProfileTab',
    iconColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  {
    id: 2,
    icon: 'star-outline',
    title: 'Subscription',
    description: 'Manage your subscription plan',
    targetScreen: 'Subscription',
    iconColor: '#f59e0b',
    backgroundColor: '#f59e0b',
  },
  {
    id: 3,
    icon: 'card-outline',
    title: 'Payment Methods',
    description: 'Manage your payment methods',
    targetScreen: 'PaymentMethods',
    iconColor: '#10b981',
    backgroundColor: '#10b981',
  },
];

const notificationSettings: Setting[] = [
  {
    id: 1,
    icon: 'notifications-outline',
    title: 'Notifications',
    description: 'Configure notification preferences',
    targetScreen: 'Notifications',
    iconColor: '#f97316',
    backgroundColor: '#f97316',
  },
];

const preferenceSettings: Setting[] = [
  {
    id: 1,
    icon: 'settings-outline',
    title: 'App Preferences',
    description: 'Customize app behavior',
    targetScreen: 'Preferences',
    iconColor: '#6366f1',
    backgroundColor: '#6366f1',
  },
  {
    id: 2,
    icon: 'shield-outline',
    title: 'Privacy',
    description: 'Control your privacy settings',
    targetScreen: 'Preferences',
    iconColor: '#dc2626',
    backgroundColor: '#dc2626',
  },
  {
    id: 3,
    icon: 'information-circle-outline',
    title: 'About',
    description: 'App version and information',
    targetScreen: 'About',
    iconColor: '#8b5cf6',
    backgroundColor: '#8b5cf6',
  },
];

const SettingItem: React.FC<SettingItemProps> = ({ setting, showChevron = true, ...props }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-4 border-b border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-800"
      accessibilityLabel={setting.title}
      accessibilityRole="button"
      {...props}
    >
      <View 
        className="w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm"
        style={{ backgroundColor: setting.backgroundColor + '20' }}
      >
        {setting.hasAvatar ? (
          <View className="w-12 h-12 rounded-xl overflow-hidden">
            <View 
              className="w-full h-full items-center justify-center"
              style={{ backgroundColor: setting.backgroundColor }}
            >
              <Ionicons name="person" size={20} color="#FFFFFF" />
            </View>
          </View>
        ) : (
          <Ionicons
            name={setting.icon as keyof typeof Ionicons.glyphMap}
            size={24}
            color={setting.iconColor}
          />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {setting.title}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {setting.description}
        </Text>
      </View>
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color="#9CA3AF"
        />
      )}
    </TouchableOpacity>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4 px-6">
    {title}
  </Text>
);

const QuickStatsCard = ({ title, value, icon, color, onPress }: {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mx-1 border border-gray-100 dark:border-gray-700"
  >
    <View className="flex-row items-center justify-between mb-2">
      <View 
        className="w-8 h-8 rounded-lg items-center justify-center"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
    </View>
    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
      {value}
    </Text>
    <Text className="text-gray-500 dark:text-gray-400 text-xs">
      {title}
    </Text>
  </TouchableOpacity>
);

const SettingsPage: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const theme = useColorScheme();

  const handleNavigation = useCallback(
    (targetScreen?: keyof SettingsStackParamList | keyof TabNavigatorParamList) => {
      if (targetScreen) {
        if (targetScreen === 'ProfileTab') {
          navigation.navigate('ProfileTab');
        } else {
          navigation.navigate(targetScreen as keyof SettingsStackParamList);
        }
      }
    },
    [navigation],
  );

  return (
    <ErrorBoundary>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 pt-10">
        <ScrollView className="flex-1 bg-white dark:bg-gray-900">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-12 pb-6">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mr-4 w-10 h-10 items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl"
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={theme.colorScheme === 'dark' ? '#ffffff' : '#000000'}
                />
              </TouchableOpacity>
              <View>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  Settings
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Manage your preferences
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row px-6 mb-6">
            <QuickStatsCard
              title="Active Goals"
              value="5"
              icon="trophy"
              color="#f59e0b"
              onPress={() => navigation.navigate('GoalsTab')}
            />
            <QuickStatsCard
              title="Saved Cards"
              value="3"
              icon="card"
              color="#10b981"
            />
            <QuickStatsCard
              title="Notifications"
              value="12"
              icon="notifications"
              color="#f97316"
            />
          </View>

          {/* Account Section */}
          <View className="mb-8">
            <SectionHeader title="Account" />
            <View className="px-6">
              {accountSettings.map((setting) => (
                <SettingItem
                  key={setting.id}
                  setting={setting}
                  onPress={() => handleNavigation(setting.targetScreen)}
                />
              ))}
            </View>
          </View>

          {/* Notifications Section */}
          <View className="mb-8">
            <SectionHeader title="Notifications" />
            <View className="px-6">
              {notificationSettings.map((setting) => (
                <SettingItem
                  key={setting.id}
                  setting={setting}
                  onPress={() => handleNavigation(setting.targetScreen)}
                />
              ))}
            </View>
          </View>

          {/* Preferences Section */}
          <View className="mb-8">
            <SectionHeader title="Preferences" />
            <View className="px-6">
              {preferenceSettings.map((setting) => (
                <SettingItem
                  key={setting.id}
                  setting={setting}
                  onPress={() => handleNavigation(setting.targetScreen)}
                />
              ))}
            </View>
          </View>

          {/* Support Section */}
          <View className="mb-8">
            <SectionHeader title="Support" />
            <View className="px-6">
              <TouchableOpacity 
                className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750 mb-4"
              >
                <View 
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: '#22c55e' + '20' }}
                >
                  <Ionicons name="help-circle-outline" size={24} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    Help Center
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Get help and find answers to common questions
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity 
                className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750"
              >
                <View 
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: '#ec4899' + '20' }}
                >
                  <Ionicons name="mail-outline" size={24} color="#ec4899" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                    Contact Support
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Send us a message for personalized help
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info */}
          <View className="px-6 pb-8">
            <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <Text className="text-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                Goals App
              </Text>
              <Text className="text-center text-gray-400 dark:text-gray-500 text-xs">
                Version 1.0.0
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

export default React.memo(SettingsPage);