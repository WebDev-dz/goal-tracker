import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput,  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, ProgressChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColorScheme } from 'nativewind';

// Types
interface Goal {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  progress: number;
  color: string;
  iconColor: string;
  category: 'financial' | 'fitness' | 'education' | 'career' | 'personal';
  targetAmount?: number;
  currentAmount?: number;
  targetDate?: string;
  createdDate: string;
}

interface Milestone {
  id: number;
  goalId: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Activity {
  id: number;
  goalId: number;
  title: string;
  description: string;
  date: string;
  type: 'progress' | 'milestone' | 'budget';
  amount?: number;
}

interface RouteParams {
  goalId: string;
}

type GoalDetailsRouteProp = RouteProp<{ GoalDetails: RouteParams }, 'GoalDetails'>;

const GoalDetailsPage = () => {
  const navigation = useNavigation();
  const route = useRoute<GoalDetailsRouteProp>();
  const { goalId } = route.params;
  const screenWidth = Dimensions.get('window').width;
  const theme = useColorScheme();
  // State
  const [selectedTab, setSelectedTab] = useState<'overview' | 'milestones' | 'budget' | 'activity'>('overview');
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDescription, setNewMilestoneDescription] = useState('');

  // Mock data - In real app, fetch based on goalId
  const goal: Goal = {
    id: parseInt(goalId),
    icon: 'wallet',
    title: 'Financial Freedom',
    description: 'Achieve financial independence by building a diversified investment portfolio and emergency fund',
    progress: 65,
    color: 'bg-emerald-500',
    iconColor: '#10b981',
    category: 'financial',
    targetAmount: 100000,
    currentAmount: 65000,
    targetDate: '2030-12-31',
    createdDate: '2024-01-15'
  };

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      goalId: parseInt(goalId),
      title: 'Emergency Fund Complete',
      description: 'Build 6-month emergency fund',
      deadline: '2025-06-30',
      completed: true,
      priority: 'high'
    },
    {
      id: 2,
      goalId: parseInt(goalId),
      title: 'Investment Portfolio',
      description: 'Reach $50,000 in investments',
      deadline: '2025-12-31',
      completed: false,
      priority: 'high'
    },
    {
      id: 3,
      goalId: parseInt(goalId),
      title: 'Debt Free',
      description: 'Pay off all consumer debt',
      deadline: '2025-09-30',
      completed: false,
      priority: 'medium'
    }
  ]);

  const activities: Activity[] = [
    {
      id: 1,
      goalId: parseInt(goalId),
      title: 'Monthly Investment',
      description: 'Added $2,000 to investment portfolio',
      date: '2025-05-25',
      type: 'progress',
      amount: 2000
    },
    {
      id: 2,
      goalId: parseInt(goalId),
      title: 'Emergency Fund Milestone',
      description: 'Completed emergency fund goal',
      date: '2025-05-20',
      type: 'milestone'
    },
    {
      id: 3,
      goalId: parseInt(goalId),
      title: 'Budget Update',
      description: 'Updated monthly savings target',
      date: '2025-05-15',
      type: 'budget'
    }
  ];

  // Chart data
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [45000, 50000, 55000, 60000, 65000],
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colorScheme === 'dark' ? '#1F2937' : '#ffffff',
    backgroundGradientTo: theme.colorScheme === 'dark' ? '#1F2937' : '#ffffff',
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#10b981',
      fill: theme.colorScheme === 'dark' ? '#1F2937' : '#ffffff'
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: theme.colorScheme === 'dark' ? '#374151' : '#E5E7EB',
      strokeWidth: 1
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '500',
      fill: theme.colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'
    },
    backgroundColor: theme.colorScheme === 'dark' ? '#1F2937' : '#ffffff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradient: '#10b981',
    fillShadowGradientOpacity: 0.1,
    decimalPlaces: 0,
    formatYLabel: (yLabel: string) => `$${parseFloat(yLabel).toLocaleString()}`
  };

  // Components
  const TabButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-lg mr-3 ${isActive ? 'bg-blue-500' : 'bg-gray-100'}`}
    >
      <Text className={`font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const MilestoneItem = ({ milestone }: { milestone: Milestone }) => (
    <TouchableOpacity className="flex-row items-center py-4 px-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-3">
      <View className={`w-8 h-8 rounded-lg items-center justify-center mr-4 ${
        milestone.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}>
        <Ionicons 
          name={milestone.completed ? "checkmark" : "time"} 
          size={16} 
          color={milestone.completed ? '#ffffff' : '#9CA3AF'} 
        />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-900 dark:text-white font-semibold text-base">
            {milestone.title}
          </Text>
          <View className={`px-2 py-1 rounded-full ${
            milestone.priority === 'high' ? 'bg-red-100' : 
            milestone.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
          }`}>
            <Text className={`text-xs font-medium ${
              milestone.priority === 'high' ? 'text-red-600' : 
              milestone.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {milestone.priority}
            </Text>
          </View>
        </View>
        <Text className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {milestone.description}
        </Text>
        <Text className="text-blue-500 text-sm">
          Due: {new Date(milestone.deadline).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ActivityItem = ({ activity }: { activity: Activity }) => (
    <View className="flex-row items-start py-3 border-b border-gray-100 dark:border-gray-700">
      <View className={`w-8 h-8 rounded-lg items-center justify-center mr-3 mt-1 ${
        activity.type === 'progress' ? 'bg-blue-100' : 
        activity.type === 'milestone' ? 'bg-green-100' : 'bg-purple-100'
      }`}>
        <Ionicons 
          name={
            activity.type === 'progress' ? 'trending-up' : 
            activity.type === 'milestone' ? 'flag' : 'wallet'
          }
          size={16} 
          color={
            activity.type === 'progress' ? '#3B82F6' : 
            activity.type === 'milestone' ? '#10B981' : '#8B5CF6'
          }
        />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 dark:text-white font-semibold text-base mb-1">
          {activity.title}
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-sm mb-1">
          {activity.description}
        </Text>
        <Text className="text-gray-400 dark:text-gray-500 text-xs">
          {new Date(activity.date).toLocaleDateString()}
        </Text>
      </View>
      {activity.amount && (
        <Text className="text-green-600 font-semibold">
          +${activity.amount.toLocaleString()}
        </Text>
      )}
    </View>
  );

  const addMilestone = () => {
    if (newMilestoneTitle.trim()) {
      const newMilestone: Milestone = {
        id: Date.now(),
        goalId: parseInt(goalId),
        title: newMilestoneTitle,
        description: newMilestoneDescription,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        completed: false,
        priority: 'medium'
      };
      setMilestones([...milestones, newMilestone]);
      setNewMilestoneTitle('');
      setNewMilestoneDescription('');
      setShowAddMilestone(false);
    }
  };

  const toggleMilestone = (milestoneId: number) => {
    setMilestones(milestones.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    ));
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <View>
            {/* Progress Chart */}
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Progress Over Time
              </Text>
              <LineChart
                data={progressData}
                width={screenWidth - 80}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                withShadow={false}
                fromZero={false}
              />
            </View>

            {/* Key Metrics */}
            <View className="flex-row mb-6">
              <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 mr-3 shadow-sm border border-gray-100 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1">Current</Text>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${goal.currentAmount?.toLocaleString()}
                </Text>
              </View>
              <View className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1">Target</Text>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${goal.targetAmount?.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Recent Milestones */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Milestones
              </Text>
              {milestones.slice(0, 2).map((milestone) => (
                <MilestoneItem key={milestone.id} milestone={milestone} />
              ))}
            </View>
          </View>
        );

      case 'milestones':
        return (
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                All Milestones
              </Text>
              <TouchableOpacity
                onPress={() => setShowAddMilestone(true)}
                className="bg-blue-500 px-4 py-2 rounded-lg flex-row items-center"
              >
                <Ionicons name="add" size={16} color="#ffffff" />
                <Text className="text-white font-medium ml-1">Add</Text>
              </TouchableOpacity>
            </View>
            {milestones.map((milestone) => (
              <TouchableOpacity
                key={milestone.id}
                onPress={() => toggleMilestone(milestone.id)}
              >
                <MilestoneItem milestone={milestone} />
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'budget':
        return (
          <View>
            <View className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Budget Overview
              </Text>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-600 dark:text-gray-400">Monthly Target</Text>
                <Text className="text-xl font-bold text-green-600">$2,500</Text>
              </View>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-600 dark:text-gray-400">This Month</Text>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">$2,200</Text>
              </View>
              <View className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <View className="h-2 bg-green-500 rounded-full" style={{ width: '88%' }} />
              </View>
              <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2">88% of monthly target</Text>
            </View>
            
            <TouchableOpacity className="bg-blue-500 py-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Manage Budget</Text>
            </TouchableOpacity>
          </View>
        );

      case 'activity':
        return (
          <View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </Text>
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 h-screen bg-white dark:bg-gray-900">
      <ScrollView className="flex-1">
       
      

        {/* Tab Navigation */}
        <View className="px-6 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <TabButton title="Overview" isActive={selectedTab === 'overview'} onPress={() => setSelectedTab('overview')} />
            <TabButton title="Milestones" isActive={selectedTab === 'milestones'} onPress={() => setSelectedTab('milestones')} />
            <TabButton title="Budget" isActive={selectedTab === 'budget'} onPress={() => setSelectedTab('budget')} />
            <TabButton title="Activity" isActive={selectedTab === 'activity'} onPress={() => setSelectedTab('activity')} />
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View className="px-6">
          {renderTabContent()}
        </View>
      </ScrollView>

      {/* Add Milestone Modal */}
      <Modal
        visible={showAddMilestone}
        transparent={true}
        backdropColor={'#000000'}
        animationType="slide"
      >
        <View className="flex-1 justify-end  bg-opacity-50">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Milestone
            </Text>
            <TextInput
              value={newMilestoneTitle}
              onChangeText={setNewMilestoneTitle}
              placeholder="Milestone title"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 text-gray-900 dark:text-white"
            />
            <TextInput
              value={newMilestoneDescription}
              onChangeText={setNewMilestoneDescription}
              placeholder="Description (optional)"
              multiline
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-gray-900 dark:text-white"
            />
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setShowAddMilestone(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-600 py-3 rounded-lg mr-2"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addMilestone}
                className="flex-1 bg-blue-500 py-3 rounded-lg ml-2"
              >
                <Text className="text-white text-center font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GoalDetailsPage;