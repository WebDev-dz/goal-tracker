import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  return (
    <SafeAreaView className="bg-gray-50 dark:bg-gray-900 h-screen pt-10">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      

      {/* Content */}
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Our Mission Section */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Mission
        </Text>

        <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-8">
          At GoalTrack, we believe in empowering individuals to achieve their dreams. Our mission is to provide a user-friendly platform that helps you set, track, and conquer your goals, whether they're financial, personal, or professional.
        </Text>

        {/* Meet the Team Section */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Meet the Team
        </Text>

        <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-8">
          GoalTrack was developed by a passionate team of innovators dedicated to creating tools that make a positive impact on people's lives. We're committed to continuous improvement and user satisfaction.
        </Text>

        {/* Contact Us Section */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Us
        </Text>

        <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-8">
          For questions, feedback, or support, please reach out to us at support@goaltrack.app. We're always happy to hear from our users.
        </Text>

        {/* Additional Features Section - Optional Enhancement */}
        <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-4 bg-blue-500/20 dark:bg-blue-500/30">
              <Ionicons name="bulb" size={20} color="#3b82f6" />
            </View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              Why Choose GoalTrack?
            </Text>
          </View>
          
          <View className="space-y-3">
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
              <Text className="text-gray-700 dark:text-gray-300 flex-1">
                Intuitive goal tracking with visual progress indicators
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
              <Text className="text-gray-700 dark:text-gray-300 flex-1">
                Budget management tools to support your financial goals
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mr-3 mt-0.5" />
              <Text className="text-gray-700 dark:text-gray-300 flex-1">
                Milestone tracking to celebrate your achievements
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Card Enhancement */}
        <TouchableOpacity className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700 shadow-sm active:bg-gray-50 dark:active:bg-gray-750">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-xl items-center justify-center mr-4 bg-emerald-500/20 dark:bg-emerald-500/30">
                <Ionicons name="mail" size={24} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Get in Touch
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                  support@goaltrack.app
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;