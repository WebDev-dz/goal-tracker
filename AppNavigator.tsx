import React, { useEffect, useState } from 'react';
import { NavigationContainer, useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colorScheme, useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import GoalsScreen from './screens/goals';
import AIAssistantScreen from './screens/ai-assistant';
import SettingsPage from './screens/settings';
import ProfileScreen from './screens/profile';
import SubscriptionScreen from './screens/subscriptions';
import AboutScreen from './screens/about';
import NotificationsScreen from './screens/notifications';
import PreferencesScreen from './screens/preferences';
import PaymentMethodsScreen from './screens/payment-methods';
import PrivacyScreen from './screens/privacy';
import GoalDetailsScreen from './screens/goal-details';
import GoalBudgetScreen from './screens/goal-budget';

// Import auth and onboarding screens
import OnboardingScreen from './screens/onboarding';
import SignInScreen from './screens/sign-in';
import SignUpScreen from './screens/sign-up';
import ForgotPasswordScreen from './screens/forgot-password';
import SplashScreen from './screens/splash';

// Define navigation parameter lists
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type TabNavigatorParamList = {
  GoalsTab: undefined;
  AIAssistantTab: undefined;
  SettingsTab: undefined;
  ProfileTab: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Subscription: undefined;
  About: undefined;
  Notifications: undefined;
  Preferences: undefined;
  PaymentMethods: undefined;
  Privacy: undefined;
};

export type GoalsStackParamList = {
  Splash: undefined;
  Goals: undefined;
  GoalDetails: { goalId: string };
  GoalBudget: { goalId: string };
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Create navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabNavigatorParamList>(

);
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const GoalsStack = createNativeStackNavigator<GoalsStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Theme configuration
const getThemeColors = (isDark: boolean) => ({
  background: isDark ? '#000000' : '#FFFFFF',
  card: isDark ? '#1f1f1f' : '#FFFFFF',
  text: isDark ? '#FFFFFF' : '#000000',
  border: isDark ? '#333333' : '#e5e7eb',
  primary: '#3b82f6',
  tabBarActive: '#3b82f6',
  tabBarInactive: isDark ? '#9ca3af' : '#6b7280',
});

// Authentication context (simplified version)
export const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: true,
  hasSeenOnboarding: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  completeOnboarding: async () => {},
});

// Auth Stack Navigator
function AuthStackScreen() {
  const { colorScheme: currentColorScheme } = useColorScheme();
  const isDark = currentColorScheme === 'dark';
  const colors = getThemeColors(isDark);

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: !isDark,
        headerShown: false,
      }}
      initialRouteName="Splash">
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          title: 'Reset Password',
          presentation: 'modal',
        }}
      />
    </AuthStack.Navigator>
  );
}

// Goals Stack Navigator
function GoalsStackScreen() {
  const { colorScheme: currentColorScheme } = useColorScheme();
  const isDark = currentColorScheme === 'dark';
  const colors = getThemeColors(isDark);

  return (
    <GoalsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: !isDark,
      }}>
      {/* <GoalsStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} /> */}

      <GoalsStack.Screen name="Goals" component={GoalsScreen} options={{ headerShown: false }} />
      <GoalsStack.Screen
        name="GoalDetails"
        component={GoalDetailsScreen}
        options={{
          title: 'Goal Details',
          presentation: 'card',
        }}
      />
      <GoalsStack.Screen
        name="GoalBudget"
        component={GoalBudgetScreen}
        options={{
          title: 'Goal Budget',
          presentation: 'card',
        }}
      />
    </GoalsStack.Navigator>
  );
}

// Settings Stack Navigator
function SettingsStackScreen() {
  const { colorScheme: currentColorScheme } = useColorScheme();
  const isDark = currentColorScheme === 'dark';
  const colors = getThemeColors(isDark);

  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: !isDark,
      }}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: 'Subscription',
          presentation: 'card',
        }}
      />
      <SettingsStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          presentation: 'card',
        }}
      />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
          presentation: 'card',
        }}
      />
      <SettingsStack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{
          title: 'Preferences',
          presentation: 'card',
        }}
      />
      <SettingsStack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{
          title: 'Payment Methods',
          presentation: 'card',
        }}
      />
      <SettingsStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: 'Privacy',
          presentation: 'card',
        }}
      />
    </SettingsStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  const { colorScheme: currentColorScheme } = useColorScheme();
  const isDark = currentColorScheme === 'dark';
  const colors = getThemeColors(isDark);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'GoalsTab') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'AIAssistantTab') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              accessibilityLabel={`${route.name} tab`}
            />
          );
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
          marginBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="GoalsTab" component={GoalsStackScreen} options={{ title: 'Goals' }} />
      <Tab.Screen
        name="AIAssistantTab"
        component={AIAssistantScreen}
        options={{ title: 'AI Assistant' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackScreen}
        options={{ title: 'Settings' }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [authToken, onboardingStatus] = await Promise.all([
        AsyncStorage.getItem('authToken'),
        AsyncStorage.getItem('hasSeenOnboarding'),
      ]);

      setIsAuthenticated(!!authToken);
      setHasSeenOnboarding(onboardingStatus === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd make an API call here
      const mockToken = 'mock-jwt-token';
      await AsyncStorage.setItem('authToken', mockToken);
      await AsyncStorage.setItem('userEmail', email);

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you'd make an API call here
      const mockToken = 'mock-jwt-token';
      await AsyncStorage.setItem('authToken', mockToken);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userFullName', fullName);

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(['authToken', 'userEmail', 'userFullName']);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    hasSeenOnboarding,
    signIn,
    signUp,
    signOut,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Root Navigator
function RootNavigator() {
  const { isAuthenticated, isLoading, hasSeenOnboarding } = React.useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainTabNavigator} />
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    </RootStack.Navigator>
  );
}

// Main App Navigator
export function AppNavigator() {
  const { colorScheme: currentColorScheme } = useColorScheme();
  const isDark = currentColorScheme === 'dark';
  const colors = getThemeColors(isDark);

  // Create navigation theme
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  // Initialize theme to system on first load
  useEffect(() => {
    colorScheme.set('system');
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
