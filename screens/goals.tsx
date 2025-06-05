import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, VirtualizedList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoalsStackParamList } from '../AppNavigator';

type GoalsScreenNavigationProp = NativeStackNavigationProp<GoalsStackParamList, 'Goals'>;

interface Goal {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  progress: number;
  color: string;
  iconColor: string;
  category: 'financial' | 'fitness' | 'education' | 'career' | 'personal';
}

interface Milestone {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  timeframe: string;
  iconColor: string;
  goalId: number;
}

interface ProgressBarProps {
  progress: number;
  color: string;
}

interface GoalItemProps {
  goal: Goal;
  onPress: () => void;
}

interface MilestoneItemProps {
  milestone: Milestone;
  onPress: () => void;
}

const GoalsPage = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();

  const goals: Goal[] = [
    {
      id: 1,
      icon: 'wallet',
      title: 'Financial Freedom',
      description: 'Achieve financial independence by 2030',
      progress: 60,
      color: 'bg-emerald-500',
      iconColor: '#10b981',
      category: 'financial'
    },
    {
      id: 2,
      icon: 'fitness',
      title: 'Marathon Training',
      description: 'Complete a marathon in under 4 hours',
      progress: 30,
      color: 'bg-orange-500',
      iconColor: '#f97316',
      category: 'fitness'
    },
    {
      id: 3,
      icon: 'musical-notes',
      title: 'Piano Mastery',
      description: 'Learn to play the piano proficiently',
      progress: 15,
      color: 'bg-purple-500',
      iconColor: '#a855f7',
      category: 'education'
    },
    {
      id: 4,
      icon: 'briefcase',
      title: 'Career Growth',
      description: 'Get promoted to senior position',
      progress: 45,
      color: 'bg-blue-500',
      iconColor: '#3b82f6',
      category: 'career'
    },
    {
      id: 5,
      icon: 'leaf',
      title: 'Healthy Lifestyle',
      description: 'Maintain consistent healthy habits',
      progress: 75,
      color: 'bg-green-500',
      iconColor: '#22c55e',
      category: 'personal'
    }
  ];

  const milestones: Milestone[] = [
    {
      id: 1,
      icon: 'wallet',
      title: 'Emergency Fund',
      description: 'Save $5,000 for emergency fund',
      timeframe: 'In 2 weeks',
      iconColor: '#10b981',
      goalId: 1
    },
    {
      id: 2,
      icon: 'fitness',
      title: 'Long Run',
      description: 'Complete 20-mile training run',
      timeframe: 'In 1 week',
      iconColor: '#f97316',
      goalId: 2
    },
    {
      id: 3,
      icon: 'musical-notes',
      title: 'Practice Milestone',
      description: 'Complete 50 hours of practice',
      timeframe: 'In 3 weeks',
      iconColor: '#a855f7',
      goalId: 3
    },
    {
      id: 4,
      icon: 'school',
      title: 'Certification',
      description: 'Complete AWS certification',
      timeframe: 'In 1 month',
      iconColor: '#3b82f6',
      goalId: 4
    }
  ];

  const navigateToGoalDetails = (goalId: number) => {
    navigation.navigate('GoalDetails', { goalId: goalId.toString() });
  };

  const navigateToGoalBudget = (goalId: number) => {
    navigation.navigate('GoalBudget', { goalId: goalId.toString() });
  };

  const ProgressBar = ({ progress, color }: ProgressBarProps) => (
    <View className="flex-row items-center">
      <View className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
        <View 
          className={`h-2 ${color} rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </View>
      <Text className="text-gray-600 dark:text-gray-300 text-sm font-medium w-8 text-right">
        {progress}%
      </Text>
    </View>
  );

  const GoalItem = ({ goal, onPress }: GoalItemProps) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex flex-row items-center py-4 border-b border-gray-100 dark:border-gray-700 gap-2 active:bg-gray-50 dark:active:bg-gray-800"
    >
      <View 
        className="w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm"
        style={{ backgroundColor: goal.iconColor }}
      >
        <Ionicons name={goal.icon} size={24} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-900 dark:text-white font-semibold text-base">
            {goal.title}
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              navigateToGoalBudget(goal.id);
            }}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            <Ionicons name="wallet-outline" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {goal.description}
        </Text>
        <ProgressBar progress={goal.progress} color={goal.color} />
      </View>
    </TouchableOpacity>
  );

  const MilestoneItem = ({ milestone, onPress }: MilestoneItemProps) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-800"
    >
      <View 
        className="w-10 h-10 rounded-lg items-center justify-center mr-4"
        style={{ backgroundColor: milestone.iconColor + '20' }}
      >
        <Ionicons name={milestone.icon} size={20} color={milestone.iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 dark:text-white font-semibold text-base mb-1">
          {milestone.title}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm">
          {milestone.description}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-gray-400 dark:text-gray-500 text-sm mb-1">
          {milestone.timeframe}
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const QuickStatsCard = ({ title, value, icon, color, onPress }: {
    title: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
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
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </Text>
    </TouchableOpacity>
  );

  const completedGoals = goals.filter(goal => goal.progress === 100).length;
  const activeGoals = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
  const averageProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);

  return (
    <SafeAreaView  className='flex-1 bg-white dark:bg-gray-900'>
      <ScrollView className="flex-1 bg-white dark:bg-gray-900 mx-3">
        <View className="pb-40">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-12 pb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">Goals</Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {activeGoals} active • {completedGoals} completed
              </Text>
            </View>
            <TouchableOpacity className="w-10 h-10 items-center justify-center bg-blue-500 rounded-xl shadow-sm">
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats */}
          <View className="flex-row px-6 mb-6">
            <QuickStatsCard
              title="Active Goals"
              value={activeGoals.toString()}
              icon="trophy"
              color="#f59e0b"
              onPress={() => {}}
            />
            <QuickStatsCard
              title="Avg Progress"
              value={`${averageProgress}%`}
              icon="trending-up"
              color="#10b981"
              onPress={() => {}}
            />
            <QuickStatsCard
              title="This Month"
              value={completedGoals.toString()}
              icon="checkmark-circle"
              color="#8b5cf6"
              onPress={() => {}}
            />
          </View>

          {/* Goals Section */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Your Goals
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-500 font-medium">View All</Text>
              </TouchableOpacity>
            </View>
            {goals.map((goal) => (
              <GoalItem 
                key={goal.id} 
                goal={goal} 
                onPress={() => navigateToGoalDetails(goal.id)}
              />
            ))}
          </View>

          {/* Upcoming Milestones Section */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Upcoming Milestones
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-500 font-medium">View All</Text>
              </TouchableOpacity>
            </View>
            {milestones.map((milestone) => (
              <MilestoneItem 
                key={milestone.id} 
                milestone={milestone} 
                onPress={() => navigateToGoalDetails(milestone.goalId)}
              />
            ))}
          </View>

          {/* Budget Overview Section */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Budget Overview
              </Text>
              <TouchableOpacity onPress={() => navigateToGoalBudget(1)}>
                <Text className="text-blue-500 font-medium">Manage</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              onPress={() => navigateToGoalBudget(1)}
              className="flex flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750"
            >
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: '#10b981' + '20' }}
              >
                <Ionicons name="wallet" size={24} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white font-semibold text-base mb-1">
                  Financial Freedom Budget
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                  Track expenses and savings progress
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3">
                    <View 
                      className="h-2 bg-emerald-500 rounded-full"
                      style={{ width: '50%' }}
                    />
                  </View>
                  <Text className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    50%
                  </Text>
                </View>
              </View>
              <View className="items-end ml-4">
                <Text className="text-gray-900 dark:text-white font-bold text-lg">
                  $2,500
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  of $5,000
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" className="mt-1" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GoalsPage;