import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Milestone {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  target: string;
  progress: number;
  completed: boolean;
}

interface BudgetRecommendation {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  current: string;
  recommended: string;
  savings: string;
  priority: 'high' | 'medium' | 'low';
}

const AIAssistantPage = () => {
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI financial assistant. I can help you create personalized savings goals, analyze your spending patterns, and provide budget recommendations. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'chat' | 'goals' | 'budget'>('chat');

  // Mock data
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      icon: 'home',
      title: 'Save for Dream House Down Payment',
      target: '$50,000',
      progress: 65,
      completed: false
    },
    {
      id: 2,
      icon: 'car',
      title: 'Emergency Car Fund',
      target: '$5,000',
      progress: 100,
      completed: true
    },
    {
      id: 3,
      icon: 'school',
      title: 'Education Fund',
      target: '$15,000',
      progress: 30,
      completed: false
    }
  ]);

  const [budgetRecommendations, setBudgetRecommendations] = useState<BudgetRecommendation[]>([
    {
      id: 1,
      icon: 'restaurant',
      title: 'Dining Out',
      current: '$400/month',
      recommended: '$250/month',
      savings: '$150/month',
      priority: 'high'
    },
    {
      id: 2,
      icon: 'tv',
      title: 'Entertainment & Streaming',
      current: '$180/month',
      recommended: '$120/month',
      savings: '$60/month',
      priority: 'medium'
    },
    {
      id: 3,
      icon: 'shirt',
      title: 'Shopping & Clothing',
      current: '$300/month',
      recommended: '$200/month',
      savings: '$100/month',
      priority: 'medium'
    },
    {
      id: 4,
      icon: 'car',
      title: 'Transportation',
      current: '$250/month',
      recommended: '$200/month',
      savings: '$50/month',
      priority: 'low'
    }
  ]);

  // Components
  const TabButton = ({ 
    title, 
    isActive, 
    onPress, 
    icon 
  }: { 
    title: string; 
    isActive: boolean; 
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 px-4 py-3 rounded-xl mx-1 flex-row items-center justify-center ${
        isActive ? 'bg-blue-500' : 'bg-gray-100 dark:bg-gray-800'
      }`}
    >
      <Ionicons 
        name={icon} 
        size={18} 
        color={isActive ? '#ffffff' : '#6B7280'} 
        style={{ marginRight: 6 }}
      />
      <Text className={`font-medium text-sm ${
        isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const ChatBubble = ({ message }: { message: ChatMessage }) => (
    <View className={`mb-4 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${
        message.type === 'user' 
          ? 'bg-blue-500 rounded-br-md' 
          : 'bg-gray-100 dark:bg-gray-800 rounded-bl-md'
      }`}>
        <Text className={`text-base ${
          message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}>
          {message.content}
        </Text>
      </View>
      <Text className="text-xs text-gray-400 mt-1 px-2">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const MilestoneItem = ({ milestone }: { milestone: Milestone }) => (
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center mb-3">
        <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
          milestone.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'
        }`}>
          <Ionicons 
            name={milestone.completed ? 'checkmark-circle' : milestone.icon} 
            size={24} 
            color={milestone.completed ? '#22C55E' : '#3B82F6'} 
          />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white font-semibold text-base mb-1">
            {milestone.title}
          </Text>
          <Text className="text-blue-500 text-sm font-medium">
            Target: {milestone.target}
          </Text>
        </View>
        {milestone.completed && (
          <View className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
            <Text className="text-green-600 text-xs font-medium">Completed</Text>
          </View>
        )}
      </View>
      
      {!milestone.completed && (
        <>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-500 dark:text-gray-400 text-sm">Progress</Text>
            <Text className="text-gray-900 dark:text-white font-semibold text-sm">
              {milestone.progress}%
            </Text>
          </View>
          <View className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <View 
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${milestone.progress}%` }}
            />
          </View>
        </>
      )}
    </View>
  );

  const BudgetRecommendationItem = ({ recommendation }: { recommendation: BudgetRecommendation }) => {
    const priorityColors = {
      high: 'bg-red-50 dark:bg-red-900/20 text-red-600',
      medium: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
      low: 'bg-green-50 dark:bg-green-900/20 text-green-600'
    };

    return (
      <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-3 shadow-sm border border-gray-100 dark:border-gray-700">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl items-center justify-center mr-4">
              <Ionicons name={recommendation.icon} size={24} color="#6B7280" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 dark:text-white font-semibold text-base mb-1">
                {recommendation.title}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 dark:text-gray-400 text-sm mr-2">
                  {recommendation.current}
                </Text>
                <Ionicons name="arrow-forward" size={12} color="#6B7280" />
                <Text className="text-blue-500 text-sm ml-2 font-medium">
                  {recommendation.recommended}
                </Text>
              </View>
            </View>
          </View>
          <View className={`px-2 py-1 rounded-full ${priorityColors[recommendation.priority]}`}>
            <Text className={`text-xs font-medium capitalize ${priorityColors[recommendation.priority].split(' ').pop()}`}>
              {recommendation.priority}
            </Text>
          </View>
        </View>
        
        <View className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <View className="flex-row items-center">
            <Ionicons name="trending-down" size={16} color="#22C55E" />
            <Text className="text-green-600 font-semibold ml-2">
              Potential savings: {recommendation.savings}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Functions
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        type: 'user',
        content: inputText.trim(),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "That's a great question! Based on your spending patterns, I'd recommend focusing on reducing dining expenses first, as that could save you up to $150 per month.",
          "I can help you create a personalized savings plan. Would you like me to analyze your current budget and suggest some optimizations?",
          "Based on your financial goals, you're making excellent progress! Let me show you some strategies to accelerate your savings.",
          "I notice you're interested in budgeting. Here are some AI-powered insights about your spending habits that might help.",
        ];
        
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const generateGoal = () => {
    Alert.alert(
      'Generate New Goal',
      'Would you like me to analyze your spending and create a new personalized savings goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Generate', 
          onPress: () => {
            // Simulate goal generation
            const newMilestone: Milestone = {
              id: Date.now(),
              icon: 'airplane',
              title: 'Vacation Fund',
              target: '$3,000',
              progress: 0,
              completed: false
            };
            setMilestones(prev => [...prev, newMilestone]);
            setSelectedTab('goals');
            
            // Add AI message about new goal
            const aiMessage: ChatMessage = {
              id: Date.now() + 1,
              type: 'assistant',
              content: "I've created a new vacation fund goal for you! Based on your spending patterns, you can reach this goal in 8 months by saving $375 per month.",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
          }
        }
      ]
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'chat':
        return (
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <ScrollView 
              ref={scrollViewRef}
              className="flex-1 px-6"
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              
              {isTyping && (
                <View className="items-start mb-4">
                  <View className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                    <View className="flex-row space-x-1">
                      <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                      <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"  />
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
            
            {/* Input Area */}
            <View className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <View className="flex-row items-center space-x-3">
                <View className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                  <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask me anything about your finances..."
                    placeholderTextColor="#9CA3AF"
                    className="text-gray-900 dark:text-white text-base"
                    multiline
                    maxLength={500}
                  />
                </View>
                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={!inputText.trim()}
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    inputText.trim() ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <Ionicons 
                    name="send" 
                    size={20} 
                    color={inputText.trim() ? '#ffffff' : '#9CA3AF'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        );

      case 'goals':
        return (
          <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">
                Your Goals ({milestones.length})
              </Text>
              <TouchableOpacity
                onPress={generateGoal}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">+ New Goal</Text>
              </TouchableOpacity>
            </View>
            
            {milestones.map((milestone) => (
              <MilestoneItem key={milestone.id} milestone={milestone} />
            ))}
          </ScrollView>
        );

      case 'budget':
        return (
          <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Budget Recommendations
              </Text>
              <Text className="text-gray-600 dark:text-gray-400">
                AI-powered suggestions to optimize your spending
              </Text>
            </View>
            
            {budgetRecommendations.map((recommendation) => (
              <BudgetRecommendationItem key={recommendation.id} recommendation={recommendation} />
            ))}
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Financial Assistant
        </Text>
        <Text className="text-gray-600 dark:text-gray-400">
          Your personal finance companion
        </Text>
      </View>

      {/* Tab Navigation */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <TabButton 
            title="Chat" 
            isActive={selectedTab === 'chat'} 
            onPress={() => setSelectedTab('chat')}
            icon="chatbubbles"
          />
          <TabButton 
            title="Goals" 
            isActive={selectedTab === 'goals'} 
            onPress={() => setSelectedTab('goals')}
            icon="flag"
          />
          <TabButton 
            title="Budget" 
            isActive={selectedTab === 'budget'} 
            onPress={() => setSelectedTab('budget')}
            icon="analytics"
          />
        </View>
      </View>

      {/* Tab Content */}
      <View className="flex-1">
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
};

export default AIAssistantPage;