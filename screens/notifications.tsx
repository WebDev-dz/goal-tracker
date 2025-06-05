import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

interface Notification {
  id: number;
  title: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string; // Hex color for the icon
  iconBg: string; // Background color class
  category: 'savings' | 'fitness' | 'budget' | 'learning' | 'system' | 'achievement';
  timestamp?: string;
  isRead?: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onPress?: (notification: Notification) => void;
}

const NotificationsScreen = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();

  const todayNotifications: Notification[] = [
    {
      id: 1,
      title: 'Savings Goal Update',
      message: "You're on track to reach your savings goal by the end of the month. Keep up the excellent progress!",
      icon: 'wallet',
      iconColor: '#10B981', // Green
      iconBg: 'bg-green-100 dark:bg-green-900/20',
      category: 'savings',
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: 2,
      title: 'Fitness Goal Milestone',
      message: "Congratulations! You've completed all milestones for your fitness goal this week.",
      icon: 'trophy',
      iconColor: '#F59E0B', // Amber
      iconBg: 'bg-amber-100 dark:bg-amber-900/20',
      category: 'fitness',
      timestamp: '4 hours ago',
      isRead: false,
    },
    {
      id: 6,
      title: 'Achievement Unlocked!',
      message: "You've unlocked the 'Consistency Master' achievement for maintaining your goals for 30 days!",
      icon: 'star',
      iconColor: '#8B5CF6', // Purple
      iconBg: 'bg-purple-100 dark:bg-purple-900/20',
      category: 'achievement',
      timestamp: '6 hours ago',
      isRead: true,
    },
  ];

  const yesterdayNotifications: Notification[] = [
    {
      id: 3,
      title: 'Budget Alert',
      message: 'Your budget for dining out is nearing its limit. Consider cooking at home to stay on track.',
      icon: 'warning',
      iconColor: '#EF4444', // Red
      iconBg: 'bg-red-100 dark:bg-red-900/20',
      category: 'budget',
      timestamp: 'Yesterday 6:30 PM',
      isRead: true,
    },
    {
      id: 4,
      title: 'Learning Goal Progress',
      message: "Excellent work! You've made significant progress on your learning goal. You're 75% complete.",
      icon: 'book',
      iconColor: '#3B82F6', // Blue
      iconBg: 'bg-blue-100 dark:bg-blue-900/20',
      category: 'learning',
      timestamp: 'Yesterday 2:15 PM',
      isRead: true,
    },
    {
      id: 5,
      title: 'App Update Available',
      message: 'A new feature is available to help you track your expenses more efficiently. Update now!',
      icon: 'refresh-circle',
      iconColor: '#06B6D4', // Cyan
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/20',
      category: 'system',
      timestamp: 'Yesterday 10:00 AM',
      isRead: true,
    },
    {
      id: 7,
      title: 'Weekly Summary Ready',
      message: 'Your weekly financial summary is ready. Check out your progress and insights.',
      icon: 'bar-chart',
      iconColor: '#84CC16', // Lime
      iconBg: 'bg-lime-100 dark:bg-lime-900/20',
      category: 'system',
      timestamp: 'Yesterday 9:00 AM',
      isRead: true,
    },
  ];

  const handleNotificationPress = (notification: Notification) => {
    console.log('Notification pressed:', notification.title);
    // Handle navigation based on notification category
    switch (notification.category) {
      case 'savings':
        // Navigate to savings screen
        break;
      case 'fitness':
        // Navigate to fitness goals
        break;
      case 'budget':
        // Navigate to budget screen
        break;
      case 'learning':
        // Navigate to learning goals
        break;
      case 'achievement':
        // Show achievement details
        break;
      case 'system':
        // Handle system notifications
        break;
    }
  };

  const handleClearAll = () => {
    console.log('Clear all notifications');
    // Implement clear all functionality
  };

  const NotificationItem = ({ notification, onPress }: NotificationItemProps) => (
    <TouchableOpacity
      className={`flex-row items-start p-4 mb-3 rounded-2xl border ${
        notification.isRead 
          ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' 
          : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
      } shadow-sm`}
      onPress={() => onPress?.(notification)}
      activeOpacity={0.7}
    >
      {/* Icon Container */}
      <View className={`w-12 h-12 rounded-xl mr-4 items-center justify-center ${notification.iconBg}`}>
        <Ionicons
          name={notification.icon}
          size={22}
          color={notification.iconColor}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="text-base font-semibold text-gray-900 dark:text-white flex-1 pr-2">
            {notification.title}
          </Text>
          {!notification.isRead && (
            <View className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          )}
        </View>
        
        <Text className="text-sm text-gray-600 dark:text-gray-400 leading-5 mb-2">
          {notification.message}
        </Text>
        
        {notification.timestamp && (
          <Text className="text-xs text-gray-400 dark:text-gray-500">
            {notification.timestamp}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, count }: { title: string; count: number }) => (
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </Text>
      <View className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
        <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {count}
        </Text>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View className="items-center justify-center py-12">
      <View className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mb-4">
        <Ionicons 
          name="notifications-outline" 
          size={32} 
          color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'} 
        />
      </View>
      <Text className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        All caught up!
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400 text-center px-8">
        You don't have any notifications right now. We'll notify you when something important happens.
      </Text>
    </View>
  );

  const totalNotifications = todayNotifications.length + yesterdayNotifications.length;
  const unreadCount = [...todayNotifications, ...yesterdayNotifications].filter(n => !n.isRead).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center">
          <TouchableOpacity 
            className="mr-4 w-10 h-10 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl"
            onPress={() => navigation.goBack()}
          >
            <Ionicons 
              name="chevron-back" 
              size={20} 
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'} 
            />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text className="text-sm text-blue-500 dark:text-blue-400">
                {unreadCount} unread
              </Text>
            )}
          </View>
        </View>
        
        {totalNotifications > 0 && (
          <TouchableOpacity
            onPress={handleClearAll}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      >
        {totalNotifications === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Today Section */}
            {todayNotifications.length > 0 && (
              <View className="mb-8">
                <SectionHeader title="Today" count={todayNotifications.length} />
                {todayNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onPress={handleNotificationPress}
                  />
                ))}
              </View>
            )}

            {/* Yesterday Section */}
            {yesterdayNotifications.length > 0 && (
              <View className="mb-6">
                <SectionHeader title="Yesterday" count={yesterdayNotifications.length} />
                {yesterdayNotifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onPress={handleNotificationPress}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;