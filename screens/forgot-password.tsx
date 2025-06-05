import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../AppNavigator';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you'd make an API call here
      console.log('Reset password for:', email);
      
      setIsEmailSent(true);
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    navigation.goBack();
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    handleResetPassword();
  };

  if (isEmailSent) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        <View className="flex-1 px-6 justify-center">
          {/* Success Icon */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full items-center justify-center mb-6">
              <Ionicons name="checkmark-circle" size={48} color="#10B981" />
            </View>
            
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Check Your Email
            </Text>
            
            <Text className="text-gray-500 dark:text-gray-400 text-center mb-2">
              We've sent a password reset link to:
            </Text>
            
            <Text className="text-blue-500 font-semibold text-center mb-6">
              {email}
            </Text>
            
            <Text className="text-gray-500 dark:text-gray-400 text-center text-sm">
              Click the link in the email to reset your password. If you don't see it, check your spam folder.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <TouchableOpacity
              onPress={handleBackToSignIn}
              className="w-full bg-blue-500 py-4 rounded-xl shadow-lg active:bg-blue-600"
            >
              <Text className="text-white font-semibold text-lg text-center">
                Back to Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleResendEmail}
              className="w-full py-4"
            >
              <Text className="text-blue-500 font-medium text-center">
                Didn't receive the email? Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-center">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl items-center justify-center mb-6">
                <Ionicons name="key" size={40} color="#3B82F6" />
              </View>
              
              <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                Reset Password
              </Text>
              
              <Text className="text-gray-500 dark:text-gray-400 text-center">
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>

            {/* Reset Form */}
            <View className="space-y-6">
              {/* Email Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Ionicons name="mail" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                </View>
              </View>

              {/* Reset Button */}
              <TouchableOpacity
                onPress={handleResetPassword}
                disabled={isLoading || !email.trim()}
                className="w-full bg-blue-500 py-4 rounded-xl shadow-lg active:bg-blue-600 disabled:opacity-50"
              >
                <View className="flex-row items-center justify-center">
                  {isLoading && (
                    <View className="mr-2">
                      <Ionicons name="refresh" size={20} color="#FFFFFF" />
                    </View>
                  )}
                  <Text className="text-white font-semibold text-lg">
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Back to Sign In */}
              <TouchableOpacity
                onPress={handleBackToSignIn}
                className="w-full py-4"
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons name="arrow-back" size={20} color="#6B7280" />
                  <Text className="ml-2 text-gray-500 dark:text-gray-400 font-medium">
                    Back to Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <View className="ml-3 flex-1">
                  <Text className="text-blue-800 dark:text-blue-200 font-medium text-sm mb-1">
                    Having trouble?
                  </Text>
                  <Text className="text-blue-600 dark:text-blue-300 text-sm">
                    Make sure to check your spam folder. If you still don't receive the email, contact our support team.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}