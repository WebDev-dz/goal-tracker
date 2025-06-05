import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const handleGoBack = () => {
    // Handle navigation back
    console.log('Going back...');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <TouchableOpacity onPress={handleGoBack} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900 dark:text-white flex-1 text-center mr-8">
          Privacy Policy
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Privacy Policy Section */}
        <View className="mt-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </Text>
          
          <Text className="text-base text-gray-600 dark:text-gray-300 leading-6 mb-8">
            Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to ensuring the confidentiality and security of your data.
          </Text>
        </View>

        {/* Data Handling Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-4 bg-blue-500/20 dark:bg-blue-500/30">
              <Ionicons name="shield-checkmark" size={20} color="#3b82f6" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Data Handling
            </Text>
          </View>
          
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <Text className="text-base text-gray-600 dark:text-gray-300 leading-6">
              We collect data to improve our services and personalize your experience. Your data is stored securely and is not shared with third parties without your consent.
            </Text>
          </View>
        </View>

        {/* User Data Protection Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-4 bg-emerald-500/20 dark:bg-emerald-500/30">
              <Ionicons name="lock-closed" size={20} color="#10b981" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              User Data Protection
            </Text>
          </View>
          
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <Text className="text-base text-gray-600 dark:text-gray-300 leading-6 mb-4">
              We employ industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. We regularly update our security protocols to ensure your information remains safe.
            </Text>
            
            {/* Security Features List */}
            <View className="space-y-3">
              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
                <Text className="text-gray-600 dark:text-gray-300 flex-1">
                  End-to-end encryption for sensitive data
                </Text>
              </View>
              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
                <Text className="text-gray-600 dark:text-gray-300 flex-1">
                  Regular security audits and updates
                </Text>
              </View>
              <View className="flex-row items-start">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
                <Text className="text-gray-600 dark:text-gray-300 flex-1">
                  Secure data storage with limited access
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Your Rights Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-4 bg-purple-500/20 dark:bg-purple-500/30">
              <Ionicons name="person-circle" size={20} color="#8b5cf6" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Rights
            </Text>
          </View>
          
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <Text className="text-base text-gray-600 dark:text-gray-300 leading-6 mb-4">
              You have the right to access, update, or delete your personal information at any time. Contact us if you have any questions about your data.
            </Text>
            
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg active:bg-gray-100 dark:active:bg-gray-600">
              <View className="flex-row items-center flex-1">
                <Ionicons name="mail" size={20} color="#6B7280" className="mr-3" />
                <Text className="text-gray-700 dark:text-gray-300 font-medium">
                  Contact Privacy Team
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Last Updated Info */}
        <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <View className="flex-row items-center">
            <Ionicons name="time" size={16} color="#6B7280" className="mr-2" />
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: January 2025
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}