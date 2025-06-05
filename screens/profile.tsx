import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingsStackParamList, TabNavigatorParamList } from 'AppNavigator';

// Types
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  totalSavings: number;
  goalsCompleted: number;
}

interface AppSettings {
  notifications: boolean;
  biometrics: boolean;
  darkMode: boolean;
  currency: string;
  language: string;
}

type SettingsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsStackParamList, 'Settings'>,
  BottomTabNavigationProp<TabNavigatorParamList>
>;

const ProfileScreen = () => {
  // State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState<'name' | 'email' | 'phone' | null>(null);
  const [editValue, setEditValue] = useState('');
  const { colorScheme, setColorScheme } = useColorScheme();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  // Authentication state - Replace this with your actual auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This should come from your auth context/state
  const [isLoading, setIsLoading] = useState(false); // For loading states

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Sophia Carter',
    email: 'sophia.carter@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    joinDate: '2022',
    totalSavings: 45000,
    goalsCompleted: 8
  });

  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    biometrics: false,
    darkMode: colorScheme === 'dark',
    currency: 'USD',
    language: 'English'
  });

  // Achievement data
  const achievements = [
    {
      id: 1,
      icon: 'trophy',
      title: 'Goal Crusher',
      description: '10 goals completed',
      unlocked: true,
      color: '#F59E0B'
    },
    {
      id: 2,
      icon: 'flash',
      title: 'Speed Saver',
      description: 'Reached goal in 30 days',
      unlocked: true,
      color: '#8B5CF6'
    },
    {
      id: 3,
      icon: 'star',
      title: 'Consistency Master',
      description: '90 days streak',
      unlocked: false,
      color: '#6B7280'
    }
  ];

  // Login/Guest User Component
  const LoginPrompt = () => (
    <View className="flex-1 px-6 justify-center items-center">
      <View className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full shadow-lg border border-gray-100 dark:border-gray-700">
        {/* Icon */}
        <View className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mb-6 self-center">
          <Ionicons name="person-outline" size={40} color="#3B82F6" />
        </View>

        {/* Title and Description */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
          Welcome to Your Profile
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-8 leading-6">
          Sign in to access your personal dashboard, track your savings goals, and manage your account settings.
        </Text>

        {/* Benefits List */}
        <View className="mb-8 space-y-4">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 dark:text-gray-300 flex-1">
              Track your savings and financial goals
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 dark:text-gray-300 flex-1">
              Sync across all your devices
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 dark:text-gray-300 flex-1">
              Personalized recommendations
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <TouchableOpacity
            className="bg-blue-500 py-4 rounded-xl shadow-sm"
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-semibold text-base">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 dark:bg-gray-700 py-4 rounded-xl"
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text className="text-gray-700 dark:text-gray-300 text-center font-semibold text-base">
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3"
            onPress={handleContinueAsGuest}
            disabled={isLoading}
          >
            <Text className="text-blue-500 text-center font-medium">
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Guest Mode Info */}
      <View className="mt-6 px-4">
        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Guest mode has limited features. Sign in for the full experience.
        </Text>
      </View>
    </View>
  );

  // Components (same as before)
  const StatsCard = ({ 
    title, 
    value, 
    icon, 
    color = 'text-blue-500' 
  }: {
    title: string;
    value: string | number;
    icon: keyof typeof Ionicons.glyphMap;
    color?: string;
  }) => (
    <View className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center justify-between mb-2">
        <Ionicons name={icon} size={24} color="#6B7280" />
      </View>
      <Text className={`text-2xl font-bold ${color} dark:text-white mb-1`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 text-sm">
        {title}
      </Text>
    </View>
  );

  const SettingItem = ({ 
    title, 
    subtitle, 
    icon, 
    onPress, 
    showArrow = true,
    rightComponent 
  }: {
    title: string;
    subtitle?: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 border-b border-gray-100 dark:border-gray-700"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#6B7280" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900 dark:text-white">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      ))}
    </TouchableOpacity>
  );

  const ProfileField = ({ 
    label, 
    value, 
    onEdit 
  }: {
    label: string;
    value: string;
    onEdit: () => void;
  }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-900 dark:text-white mb-1">
          {label}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {value}
        </Text>
      </View>
      <TouchableOpacity onPress={onEdit}>
        <Ionicons name="pencil" size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );

  const AchievementBadge = ({ achievement }: { achievement: typeof achievements[0] }) => (
    <View className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${
      !achievement.unlocked ? 'opacity-50' : ''
    }`}>
      <View className="items-center">
        <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${
          achievement.unlocked ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          <Ionicons 
            name={achievement.icon as keyof typeof Ionicons.glyphMap} 
            size={24} 
            color={achievement.unlocked ? achievement.color : '#6B7280'} 
          />
        </View>
        <Text className="text-sm font-semibold text-gray-900 dark:text-white text-center mb-1">
          {achievement.title}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {achievement.description}
        </Text>
      </View>
    </View>
  );

  // Functions
  const handleLogin = () => {
    setIsLoading(true);
    // Replace with your actual login navigation or logic
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to login screen
      setIsLoggedIn(true); // Adjust based on your navigation structure
    }, 1000);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    navigation.navigate('SignUp' as any); // Adjust based on your navigation structure
  };

  const handleContinueAsGuest = () => {
    // Set limited guest mode - you might want to store this in AsyncStorage or context
    Alert.alert(
      'Guest Mode',
      'You\'re using the app in guest mode. Some features may be limited.',
      [
        { text: 'OK', onPress: () => console.log('Guest mode activated') }
      ]
    );
  };

  const handleEdit = (field: 'name' | 'email' | 'phone') => {
    setEditingField(field);
    setEditValue(userProfile[field]);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (editingField && editValue.trim()) {
      setUserProfile(prev => ({
        ...prev,
        [editingField]: editValue.trim()
      }));
      setShowEditModal(false);
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          onPress: () => {
            setIsLoggedIn(false);
            // Clear user data, navigate to auth screen, etc.
            console.log('Logging out...');
          },
          style: 'destructive' 
        }
      ]
    );
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my financial journey! I've saved $${userProfile.totalSavings.toLocaleString()} and completed ${userProfile.goalsCompleted} goals using this amazing app!`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const navigateToSection = (section: string) => {
    console.log(`Navigating to ${section}`);
    // Handle navigation to different sections
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
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
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile
            </Text>
            <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {isLoggedIn ? 'Manage your profile' : 'Sign in to get started'}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      {!isLoggedIn ? (
        <LoginPrompt />
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header with Actions */}
          <View className="px-6 pt-4 pb-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Profile
              </Text>
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={shareProfile}
                  className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-sm"
                >
                  <Ionicons name="share-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigateToSection('Settings')}
                  className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-sm"
                >
                  <Ionicons name="settings-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Profile Avatar and Info */}
          <View className="bg-white dark:bg-gray-800 mx-6 rounded-2xl px-6 py-8 items-center shadow-sm border border-gray-100 dark:border-gray-700">
            <View className="w-32 h-32 rounded-full bg-orange-200 mb-4 overflow-hidden shadow-lg">
              <Image
                source={{ uri: userProfile.avatar }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {userProfile.name}
            </Text>
            <Text className="text-base text-blue-500 mb-4">
              Joined in {userProfile.joinDate}
            </Text>
            
            {/* Stats */}
            <View className="flex-row space-x-4 w-full">
              <StatsCard 
                title="Total Saved" 
                value={`$${userProfile.totalSavings.toLocaleString()}`}
                icon="wallet"
                color="text-green-500"
              />
              <StatsCard 
                title="Goals Completed" 
                value={userProfile.goalsCompleted}
                icon="trophy"
                color="text-yellow-500"
              />
            </View>
          </View>

          {/* Achievements Section */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </Text>
            <View className="flex-row space-x-3">
              {achievements.map((achievement) => (
                <View key={achievement.id} className="flex-1">
                  <AchievementBadge achievement={achievement} />
                </View>
              ))}
            </View>
          </View>

          {/* Personal Information Section */}
          <View className="bg-white dark:bg-gray-800 mx-6 mt-6 rounded-2xl px-6 py-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </Text>

            <ProfileField 
              label="Name" 
              value={userProfile.name} 
              onEdit={() => handleEdit('name')}
            />
            <ProfileField 
              label="Email" 
              value={userProfile.email} 
              onEdit={() => handleEdit('email')}
            />
            <ProfileField 
              label="Phone" 
              value={userProfile.phone} 
              onEdit={() => handleEdit('phone')}
            />
          </View>

          {/* Settings Section */}
          <View className="bg-white dark:bg-gray-800 mx-6 mt-6 rounded-2xl px-6 py-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              App Settings
            </Text>

            <SettingItem
              title="Notifications"
              subtitle="Push notifications and alerts"
              icon="notifications"
              rightComponent={
                <Switch
                  value={settings.notifications}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, notifications: value }))}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor="#ffffff"
                />
              }
              showArrow={false}
            />

            <SettingItem
              title="Biometric Security"
              subtitle="Use fingerprint or face ID"
              icon="finger-print"
              rightComponent={
                <Switch
                  value={settings.biometrics}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, biometrics: value }))}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor="#ffffff"
                />
              }
              showArrow={false}
            />

            <SettingItem
              title="Dark Mode"
              subtitle="Toggle app appearance"
              icon="moon"
              rightComponent={
                <Switch
                  value={settings.darkMode}
                  onValueChange={(value) => {
                    setSettings(prev => ({ ...prev, darkMode: value }));
                    setColorScheme(value ? 'dark' : 'light');
                  }}
                  trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                  thumbColor="#ffffff"
                />
              }
              showArrow={false}
            />

            <SettingItem
              title="Currency"
              subtitle={settings.currency}
              icon="card"
              onPress={() => navigateToSection('Currency')}
            />

            <SettingItem
              title="Language"
              subtitle={settings.language}
              icon="language"
              onPress={() => navigateToSection('Language')}
            />
          </View>

          {/* Support Section */}
          <View className="bg-white dark:bg-gray-800 mx-6 mt-6 rounded-2xl px-6 py-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support & Legal
            </Text>

            <SettingItem
              title="Help & Support"
              subtitle="FAQs and contact support"
              icon="help-circle"
              onPress={() => navigateToSection('Help & Support')}
            />

            <SettingItem
              title="Privacy Policy"
              subtitle="How we protect your data"
              icon="shield-checkmark"
              onPress={() => navigateToSection('Privacy')}
            />

            <SettingItem
              title="Terms of Service"
              subtitle="App usage terms"
              icon="document-text"
              onPress={() => navigateToSection('Terms')}
            />

            <SettingItem
              title="About"
              subtitle="App version and info"
              icon="information-circle"
              onPress={() => navigateToSection('About')}
            />
          </View>

          {/* Log Out Button */}
          <View className="px-6 py-8">
            <TouchableOpacity
              className="bg-red-50 dark:bg-red-900/20 py-4 rounded-2xl items-center border border-red-200 dark:border-red-800"
              onPress={handleLogOut}
            >
              <Text className="text-base font-semibold text-red-600">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Edit {editingField?.charAt(0).toUpperCase()}{editingField?.slice(1)}
            </Text>
            
            <TextInput
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter your ${editingField}`}
              placeholderTextColor="#9CA3AF"
              className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-6 text-gray-900 dark:text-white text-base"
              keyboardType={editingField === 'email' ? 'email-address' : editingField === 'phone' ? 'phone-pad' : 'default'}
              autoCapitalize={editingField === 'email' ? 'none' : 'words'}
            />
            
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(false);
                  setEditingField(null);
                  setEditValue('');
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-600 py-4 rounded-xl"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={saveEdit}
                className="flex-1 bg-blue-500 py-4 rounded-xl"
              >
                <Text className="text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;