import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expires: string;
  icon: keyof typeof Ionicons.glyphMap;
  isExpired: boolean;
  brandColor: string;
  backgroundColor: string;
}

interface PaymentMethodItemProps {
  method: PaymentMethod;
  onPress: () => void;
}

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expires: '03/2025',
      icon: 'card-outline',
      isExpired: false,
      brandColor: '#1a365d',
      backgroundColor: '#3182ce',
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '1234',
      expires: '01/2026',
      icon: 'card-outline',
      isExpired: false,
      brandColor: '#e53e3e',
      backgroundColor: '#f56565',
    },
    {
      id: 3,
      type: 'American Express',
      last4: '5678',
      expires: '05/2024',
      icon: 'card',
      isExpired: true,
      brandColor: '#2d3748',
      backgroundColor: '#718096',
    },
    {
      id: 4,
      type: 'Discover',
      last4: '9012',
      expires: '08/2025',
      icon: 'card',
      isExpired: false,
      brandColor: '#d69e2e',
      backgroundColor: '#f6ad55',
    },
  ];

  const PaymentMethodItem = ({ method, onPress }: PaymentMethodItemProps) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750 mb-3"
    >
      <View 
        className="w-12 h-12 rounded-xl items-center justify-center mr-4 shadow-sm"
        style={{ backgroundColor: method.isExpired ? '#9CA3AF20' : method.backgroundColor + '20' }}
      >
        <Ionicons 
          name={method.icon}
          size={24}
          color={method.isExpired ? '#9CA3AF' : method.brandColor}
        />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {method.type} •••• {method.last4}
        </Text>
        <Text className={`text-sm ${
          method.isExpired 
            ? 'text-red-500 dark:text-red-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {method.isExpired ? 'Expired ' : 'Expires '}
          {method.expires}
        </Text>
      </View>
      {method.isExpired && (
        <View className="mr-3">
          <View className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full">
            <Text className="text-red-600 dark:text-red-300 text-xs font-medium">
              Expired
            </Text>
          </View>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const QuickStatsCard = ({ title, value, icon, color }: {
    title: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  }) => (
    <View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mx-1 border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center justify-between mb-2">
        <View 
          className="w-8 h-8 rounded-lg items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <Ionicons name={icon} size={16} color={color} />
        </View>
      </View>
      <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 text-xs">
        {title}
      </Text>
    </View>
  );

  const activeCards = paymentMethods.filter(method => !method.isExpired).length;
  const expiredCards = paymentMethods.filter(method => method.isExpired).length;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 pt-10">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
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
                color="#6B7280"
              />
            </TouchableOpacity>
            <View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                Payment Methods
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {activeCards} active • {expiredCards} expired
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center bg-blue-500 rounded-xl shadow-sm">
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="flex-row px-6 mb-6">
          <QuickStatsCard
            title="Active Cards"
            value={activeCards.toString()}
            icon="card"
            color="#10b981"
          />
          <QuickStatsCard
            title="Expired Cards"
            value={expiredCards.toString()}
            icon="alert-circle"
            color="#f59e0b"
          />
          <QuickStatsCard
            title="Total Cards"
            value={paymentMethods.length.toString()}
            icon="wallet"
            color="#8b5cf6"
          />
        </View>

        {/* Payment Methods List */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Your Cards
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">Manage</Text>
            </TouchableOpacity>
          </View>
          
          {paymentMethods.map((method) => (
            <PaymentMethodItem 
              key={method.id} 
              method={method} 
              onPress={() => {
                // Handle payment method selection
                console.log('Selected payment method:', method.id);
              }}
            />
          ))}
        </View>

        {/* Add Payment Method Section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Add New Card
            </Text>
          </View>
          
          <TouchableOpacity 
            className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750 mb-3"
            onPress={() => {
              // Handle add payment method
              console.log('Add new payment method');
            }}
          >
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: '#3b82f6' + '20' }}
            >
              <Ionicons name="add" size={24} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Add Payment Method
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Credit card, debit card, or bank account
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750"
            onPress={() => {
              // Handle PayPal connection
              console.log('Connect PayPal');
            }}
          >
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: '#0070ba' + '20' }}
            >
              <Ionicons name="logo-paypal" size={24} color="#0070ba" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Connect PayPal
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Link your PayPal account for easy payments
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Security
            </Text>
          </View>
          
          <TouchableOpacity 
            className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750 mb-3"
          >
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: '#22c55e' + '20' }}
            >
              <Ionicons name="shield-checkmark" size={24} color="#22c55e" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Payment Security
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Your payments are secured with bank-level encryption
              </Text>
            </View>
            <View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
              <Text className="text-green-600 dark:text-green-300 text-xs font-medium">
                Active
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-row items-center py-4 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 active:bg-gray-50 dark:active:bg-gray-750"
          >
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: '#f59e0b' + '20' }}
            >
              <Ionicons name="notifications" size={24} color="#f59e0b" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Transaction Alerts
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about all payment activities
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;