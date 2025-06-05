import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Types
interface Expense {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
}

interface Income {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
}

interface RouteParams {
  goalId: string;
}

type GoalBudgetRouteProp = RouteProp<{ GoalBudget: RouteParams }, 'GoalBudget'>;

const GoalBudgetPage = () => {
  const route = useRoute<GoalBudgetRouteProp>();
  const { goalId } = route.params;
  const screenWidth = Dimensions.get('window').width;

  // State
  const [selectedTab, setSelectedTab] = useState<'overview' | 'expenses' | 'income'>('overview');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');

  // Mock data - would be fetched based on goalId
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      icon: 'car',
      title: 'Car Insurance',
      amount: 200,
      category: 'Insurance',
      date: '2025-05-25',
      recurring: true
    },
    {
      id: 2,
      icon: 'build',
      title: 'Car Maintenance',
      amount: 1000,
      category: 'Maintenance',
      date: '2025-05-20',
      recurring: false
    },
    {
      id: 3,
      icon: 'card',
      title: 'Car Payment',
      amount: 350,
      category: 'Payment',
      date: '2025-05-15',
      recurring: true
    },
    {
      id: 4,
      icon: 'car-sport',
      title: 'Gas',
      amount: 120,
      category: 'Fuel',
      date: '2025-05-28',
      recurring: false
    }
  ]);

  const [income, setIncome] = useState<Income[]>([
    {
      id: 1,
      icon: 'card',
      title: 'Monthly Salary',
      amount: 2000,
      category: 'Salary',
      date: '2025-05-01',
      recurring: true
    },
    {
      id: 2,
      icon: 'trending-up',
      title: 'Side Hustle',
      amount: 500,
      category: 'Freelance',
      date: '2025-05-15',
      recurring: false
    },
    {
      id: 3,
      icon: 'wallet',
      title: 'Investment Returns',
      amount: 150,
      category: 'Investment',
      date: '2025-05-20',
      recurring: false
    }
  ]);

  // Goal data
  const goalData = {
    title: 'Financial Freedom',
    targetAmount: 100000,
    currentAmount: 65000,
    monthlyTarget: 2500
  };

  // Calculations
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const netAmount = totalIncome - totalExpenses;
  const budgetProgress = (netAmount / goalData.monthlyTarget) * 100;

  // Chart data
  const chartData = {
    labels: ['Income', 'Expenses', 'Net'],
    datasets: [
      {
        data: [totalIncome, totalExpenses, Math.max(0, netAmount)],
        colors: [
          (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,  // Green for income
          (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,  // Red for expenses
          (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue for net
        ]
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: true,
  };

  // Components
  const BudgetCard = ({ 
    title, 
    amount, 
    bgColor = 'bg-gray-100', 
    textColor = 'text-gray-900',
    icon 
  }: {
    title: string;
    amount: number;
    bgColor?: string;
    textColor?: string;
    icon?: keyof typeof Ionicons.glyphMap;
  }) => (
    <View className={`${bgColor} rounded-2xl p-4 flex-1 shadow-sm border border-gray-100 dark:border-gray-700`}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</Text>
        {icon && <Ionicons name={icon} size={20} color="#6B7280" />}
      </View>
      <Text className={`${textColor} text-2xl font-bold`}>
        ${amount.toLocaleString()}
      </Text>
    </View>
  );

  const ExpenseItem = ({ expense, onDelete }: { expense: Expense; onDelete: () => void }) => (
    <TouchableOpacity 
      onLongPress={() => {
        Alert.alert(
          'Delete Expense',
          `Are you sure you want to delete "${expense.title}"?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: onDelete, style: 'destructive' }
          ]
        );
      }}
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl mb-3 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <View className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl items-center justify-center mr-4">
        <Ionicons name={expense.icon} size={24} color="#EF4444" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-900 dark:text-white font-semibold text-base">
            {expense.title}
          </Text>
          {expense.recurring && (
            <View className="bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
              <Text className="text-orange-600 text-xs font-medium">Recurring</Text>
            </View>
          )}
        </View>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1">
          {expense.category}
        </Text>
        <Text className="text-gray-400 dark:text-gray-500 text-xs">
          {new Date(expense.date).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-red-600 font-bold text-lg">
        -${expense.amount.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const IncomeItem = ({ income, onDelete }: { income: Income; onDelete: () => void }) => (
    <TouchableOpacity 
      onLongPress={() => {
        Alert.alert(
          'Delete Income',
          `Are you sure you want to delete "${income.title}"?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: onDelete, style: 'destructive' }
          ]
        );
      }}
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl mb-3 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <View className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl items-center justify-center mr-4">
        <Ionicons name={income.icon} size={24} color="#22C55E" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-900 dark:text-white font-semibold text-base">
            {income.title}
          </Text>
          {income.recurring && (
            <View className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <Text className="text-green-600 text-xs font-medium">Recurring</Text>
            </View>
          )}
        </View>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1">
          {income.category}
        </Text>
        <Text className="text-gray-400 dark:text-gray-500 text-xs">
          {new Date(income.date).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-green-600 font-bold text-lg">
        +${income.amount.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const TabButton = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-lg mr-3 ${isActive ? 'bg-blue-500' : 'bg-gray-100 dark:bg-gray-800'}`}
    >
      <Text className={`font-medium ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  // Functions
  const addExpense = () => {
    if (newItemTitle.trim() && newItemAmount) {
      const newExpense: Expense = {
        id: Date.now(),
        icon: 'wallet',
        title: newItemTitle,
        amount: parseFloat(newItemAmount),
        category: newItemCategory || 'Other',
        date: new Date().toISOString().split('T')[0],
        recurring: false
      };
      setExpenses([...expenses, newExpense]);
      resetForm();
      setShowAddExpense(false);
    }
  };

  const addIncome = () => {
    if (newItemTitle.trim() && newItemAmount) {
      const newIncome: Income = {
        id: Date.now(),
        icon: 'card',
        title: newItemTitle,
        amount: parseFloat(newItemAmount),
        category: newItemCategory || 'Other',
        date: new Date().toISOString().split('T')[0],
        recurring: false
      };
      setIncome([...income, newIncome]);
      resetForm();
      setShowAddIncome(false);
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const deleteIncome = (id: number) => {
    setIncome(income.filter(inc => inc.id !== id));
  };

  const resetForm = () => {
    setNewItemTitle('');
    setNewItemAmount('');
    setNewItemCategory('');
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <View>
            {/* Budget Chart */}
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Budget Overview
              </Text>
              {/* <BarChart
                data={chartData}
                width={screenWidth - 80}
                height={200}
                chartConfig={chartConfig}
                style={{ marginVertical: 8, borderRadius: 16 }}
                yAxisLabel="$"
                yAxisSuffix=""
                withInnerLines={false}
                showBarTops={false}
                fromZero={true}
              /> */}
            </View>

            {/* Summary Cards */}
            <View className="mb-6">
              <View className="flex-row gap-3 mb-3">
                <BudgetCard 
                  title="Monthly Income" 
                  amount={totalIncome} 
                  bgColor="bg-green-50 dark:bg-green-900/20" 
                  textColor="text-green-600"
                  icon="trending-up"
                />
                <BudgetCard 
                  title="Monthly Expenses" 
                  amount={totalExpenses} 
                  bgColor="bg-red-50 dark:bg-red-900/20" 
                  textColor="text-red-600"
                  icon="trending-down"
                />
              </View>
              
              <BudgetCard 
                title="Net Amount" 
                amount={netAmount} 
                bgColor={netAmount >= 0 ? "bg-blue-50 dark:bg-blue-900/20" : "bg-red-50 dark:bg-red-900/20"}
                textColor={netAmount >= 0 ? "text-blue-600" : "text-red-600"}
                icon="wallet"
              />
            </View>

            {/* Progress to Goal */}
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Goal Progress
              </Text>
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-600 dark:text-gray-400">Monthly Target</Text>
                <Text className="text-gray-900 dark:text-white font-semibold">
                  ${goalData.monthlyTarget.toLocaleString()}
                </Text>
              </View>
              <View className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                <View 
                  className={`h-3 rounded-full ${budgetProgress >= 100 ? 'bg-green-500' : budgetProgress >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, Math.max(0, budgetProgress))}%` }}
                />
              </View>
              <Text className="text-gray-500 dark:text-gray-400 text-sm">
                {budgetProgress.toFixed(1)}% of monthly target
              </Text>
            </View>
          </View>
        );

      case 'expenses':
        return (
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                Expenses ({expenses.length})
              </Text>
              <Text className="text-red-600 font-bold text-lg">
                -${totalExpenses.toLocaleString()}
              </Text>
            </View>
            {expenses.map((expense) => (
              <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                onDelete={() => deleteExpense(expense.id)}
              />
            ))}
          </View>
        );

      case 'income':
        return (
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                Income ({income.length})
              </Text>
              <Text className="text-green-600 font-bold text-lg">
                +${totalIncome.toLocaleString()}
              </Text>
            </View>
            {income.map((incomeItem) => (
              <IncomeItem 
                key={incomeItem.id} 
                income={incomeItem} 
                onDelete={() => deleteIncome(incomeItem.id)}
              />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        {/* Goal Title */}
        <View className="px-6 pt-4 pb-6">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {goalData.title}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Budget tracking and management
          </Text>
        </View>

        {/* Tab Navigation */}
        <View className="px-6 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TabButton title="Overview" isActive={selectedTab === 'overview'} onPress={() => setSelectedTab('overview')} />
            <TabButton title="Expenses" isActive={selectedTab === 'expenses'} onPress={() => setSelectedTab('expenses')} />
            <TabButton title="Income" isActive={selectedTab === 'income'} onPress={() => setSelectedTab('income')} />
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View className="px-6 pb-8">
          {renderTabContent()}
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <View className="absolute bottom-6 right-6 flex-col gap-4">
        <TouchableOpacity
          onPress={() => setShowAddIncome(true)}
          className="bg-green-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowAddExpense(true)}
          className="bg-red-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="remove" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Add Expense Modal */}
      <Modal visible={showAddExpense} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Expense
            </Text>
            <TextInput
              value={newItemTitle}
              onChangeText={setNewItemTitle}
              placeholder="Expense title"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={newItemAmount}
              onChangeText={setNewItemAmount}
              placeholder="Amount"
              keyboardType="numeric"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={newItemCategory}
              onChangeText={setNewItemCategory}
              placeholder="Category (optional)"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setShowAddExpense(false);
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-600 py-3 rounded-lg"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addExpense}
                className="flex-1 bg-red-500 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Add Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Income Modal */}
      <Modal visible={showAddIncome} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black bg-opacity-25">
          <View className="bg-white dark:bg-gray-800 rounded-t-2xl p-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Income
            </Text>
            <TextInput
              value={newItemTitle}
              onChangeText={setNewItemTitle}
              placeholder="Income source"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={newItemAmount}
              onChangeText={setNewItemAmount}
              placeholder="Amount"
              keyboardType="numeric"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-3 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              value={newItemCategory}
              onChangeText={setNewItemCategory}
              placeholder="Category (optional)"
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 text-gray-900 dark:text-white"
              placeholderTextColor="#9CA3AF"
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  setShowAddIncome(false);
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-600 py-3 rounded-lg"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addIncome}
                className="flex-1 bg-green-500 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Add Income</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GoalBudgetPage;