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

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Handle sign in logic
    console.log('Signing in with:', email, password);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
  };

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
          {/* Header */}
          <View className="px-6 pt-8 pb-12">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-6 shadow-lg">
                <Ionicons name="trophy" size={40} color="#FFFFFF" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-center">
                Sign in to continue tracking your goals
              </Text>
            </View>

            {/* Sign In Form */}
            <View className="space-y-4">
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
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
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

              {/* Forgot Password */}
              <View className="flex-row justify-end">
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text className="text-blue-500 font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                onPress={handleSignIn}
                disabled={isLoading}
                className="w-full bg-blue-500 py-4 rounded-xl shadow-lg active:bg-blue-600 disabled:opacity-50"
              >
                <View className="flex-row items-center justify-center">
                  {isLoading && (
                    <View className="mr-2">
                      <Ionicons name="refresh" size={20} color="#FFFFFF" />
                    </View>
                  )}
                  <Text className="text-white font-semibold text-lg">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <Text className="px-4 text-gray-500 dark:text-gray-400 text-sm">
                Or continue with
              </Text>
              <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </View>

            {/* Social Sign In */}
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => handleSocialSignIn('Google')}
                className="flex-1 flex-row items-center justify-center py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
              >
                <Ionicons name="logo-google" size={20} color="#EA4335" />
                <Text className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Google
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleSocialSignIn('Apple')}
                className="flex-1 flex-row items-center justify-center py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl active:bg-gray-100 dark:active:bg-gray-700"
              >
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                  Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text className="text-blue-500 font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}