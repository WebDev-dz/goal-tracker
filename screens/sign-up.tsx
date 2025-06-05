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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (!acceptTerms) {
      console.log('Please accept terms and conditions');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    setIsLoading(true);
    console.log('Signing up with:', formData);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  const handleBackPress = () => {
    console.log('Going back');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={handleBackPress} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-900 dark:text-white">
          Create Account
        </Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-4 pb-8">
            {/* Welcome Section */}
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-blue-500 rounded-2xl items-center justify-center mb-4 shadow-lg">
                <Ionicons name="person-add" size={32} color="#FFFFFF" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Join GoalTrack
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center">
                Start your journey to achieving your goals
              </Text>
            </View>

            {/* Sign Up Form */}
            <View className="space-y-4">
              {/* Full Name Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Ionicons name="person" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                </View>
              </View>

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
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Ionicons name="lock-closed" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </Text>
                <View className="relative">
                  <View className="absolute left-3 top-3 z-10">
                    <Ionicons name="lock-closed" size={20} color="#6B7280" />
                  </View>
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    placeholder="Confirm your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirmPassword}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#6B7280" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms and Conditions */}
              <View className="flex-row items-start mt-4">
                <TouchableOpacity
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  className="mr-3 mt-1"
                >
                  <View className={`w-5 h-5 rounded border-2 items-center justify-center ${
                    acceptTerms 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {acceptTerms && (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text className="flex-1 text-sm text-gray-600 dark:text-gray-400 leading-5">
                  I agree to the{' '}
                  <Text className="text-blue-500 font-medium">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-blue-500 font-medium">Privacy Policy</Text>
                </Text>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={handleSignUp}
                disabled={isLoading || !acceptTerms}
                className="w-full bg-blue-500 py-4 rounded-xl shadow-lg active:bg-blue-600 disabled:opacity-50 mt-6"
              >
                <View className="flex-row items-center justify-center">
                  {isLoading && (
                    <View className="mr-2">
                      <Ionicons name="refresh" size={20} color="#FFFFFF" />
                    </View>
                  )}
                  <Text className="text-white font-semibold text-lg">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <Text className="px-4 text-gray-500 dark:text-gray-400 text-sm">
                Or sign up with
              </Text>
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </View>

            {/* Social Sign Up */}
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => handleSocialSignUp('Google')}
                className="flex-1 flex-row items-center justify-center py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Google
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleSocialSignUp('Apple')}
                className="flex-1 flex-row items-center justify-center py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
              >
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text className="text-blue-500 font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}