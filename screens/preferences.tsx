
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SettingsStackParamList, TabNavigatorParamList } from '../AppNavigator';
import { useColorScheme } from 'nativewind';

// Define navigation prop type
type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsStackParamList, 'Preferences'>,
  BottomTabNavigationProp<TabNavigatorParamList>
>;

// Define preference data structure
interface Preference {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'theme';
  icon?: keyof typeof Ionicons.glyphMap;
  targetScreen?: keyof SettingsStackParamList | keyof TabNavigatorParamList;
  value?: boolean | string;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

// Define tab route names for runtime checks
const tabRoutes: Array<keyof TabNavigatorParamList> = ['GoalsTab', 'AIAssistantTab', 'SettingsTab', 'ProfileTab'];

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

const PreferencesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [goalReminders, setGoalReminders] = useState(true);
  const [milestoneUpdates, setMilestoneUpdates] = useState(false);

  const themes = ['system', 'light', 'dark'];

  // Define preferences inside component to access state setters
  const preferences: Preference[] = [
    {
      id: 'theme',
      title: 'Theme',
      description: 'Choose app theme',
      type: 'theme',
      icon: 'color-palette-outline',
      onPress: () => {
        const currentScheme = colorScheme ?? 'system';
        
        setColorScheme(currentScheme === 'dark' ? 'light' : 'dark');
      },
    },
    {
      id: 'goalReminders',
      title: 'Goal Reminders',
      description: 'Receive goal reminders',
      type: 'toggle',
      icon: 'notifications-outline',
      value: goalReminders,
      onToggle: setGoalReminders,
    },
    {
      id: 'milestoneUpdates',
      title: 'Milestone Updates',
      description: 'Receive milestone updates',
      type: 'toggle',
      icon: 'notifications-outline',
      value: milestoneUpdates,
      onToggle: setMilestoneUpdates,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      type: 'navigation',
      icon: 'shield',
      targetScreen: 'Preferences', // Adjust if a dedicated Privacy screen exists
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      type: 'navigation',
      icon: 'document-text',
      targetScreen: 'Preferences', // Adjust if a dedicated Terms screen exists
    },
    {
      id: 'support',
      title: 'Contact Support',
      type: 'navigation',
      icon: 'mail',
      targetScreen: 'Preferences', // Adjust if a dedicated Support screen exists
    },
  ];

  const capitalizeScheme = (scheme: string | null) =>
    scheme ? scheme.charAt(0).toUpperCase() + scheme.slice(1) : 'System';

  const handleNavigation = useCallback(
    (targetScreen?: keyof SettingsStackParamList | keyof TabNavigatorParamList) => {
      if (targetScreen) {
        if (tabRoutes.includes(targetScreen as keyof TabNavigatorParamList)) {
          navigation.navigate(targetScreen as keyof TabNavigatorParamList);
        } else {
          navigation.navigate(targetScreen as keyof SettingsStackParamList);
        }
      }
    },
    [navigation],
  );

  return (
    <ErrorBoundary>
      <View className="flex-1 bg-gray-50 dark:bg-gray-800">
        <StatusBar
          barStyle={!theme.dark ? 'dark-content' : 'light-content'}
          backgroundColor={!theme.dark ? '#f9fafb' : '#1f2937'}
        />

        

        <ScrollView className="flex-1 px-6 py-6">
          {/* Appearance Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Appearance
            </Text>
            {preferences
              .filter((p) => p.type === 'theme')
              .map((pref) => (
                <TouchableOpacity
                  key={pref.id}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700"
                  onPress={pref.onPress}
                  accessibilityLabel="Switch theme"
                  accessibilityRole="button"
                >
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={pref.icon as 'color-palette-outline'}
                      size={24}
                      className="text-gray-500 mr-4"
                    />
                    <View>
                      <Text className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {pref.title}
                      </Text>
                      <Text className="text-base text-gray-500 dark:text-gray-400">
                        {pref.description}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-lg text-gray-900 dark:text-white">
                    {capitalizeScheme(colorScheme || 'system')}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          {/* Notifications Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Notifications
            </Text>
            {preferences
              .filter((p) => p.type === 'toggle')
              .map((pref) => (
                <View
                  key={pref.id}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700"
                >
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={pref.icon as 'notifications-outline'}
                      size={24}
                      className="text-gray-500 mr-4"
                    />
                    <View>
                      <Text className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {pref.title}
                      </Text>
                      <Text className="text-base text-gray-500 dark:text-gray-400">
                        {pref.description}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={pref.value as boolean}
                    onValueChange={pref.onToggle}
                    thumbColor={!theme.dark ? '#ffffff' : '#f4f4f5'}
                    trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                    accessibilityLabel={`Toggle ${pref.title}`}
                  />
                </View>
              ))}
          </View>

          {/* Other Section */}
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Other
            </Text>
            {preferences
              .filter((p) => p.type === 'navigation')
              .map((pref) => (
                <TouchableOpacity
                  key={pref.id}
                  className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700"
                  onPress={() => handleNavigation(pref.targetScreen)}
                  accessibilityLabel={pref.title}
                  accessibilityRole="button"
                >
                  <View className="flex-row items-center flex-1">
                    <Ionicons
                      name={pref.icon as 'shield'}
                      size={24}
                      className="text-gray-500 mr-4"
                    />
                    <Text className="text-lg text-gray-900 dark:text-white">
                      {pref.title}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
};

export default React.memo(PreferencesScreen);
