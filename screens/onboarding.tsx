import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ColorValue,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Goals: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface OnboardingItem {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  backgroundColor: string;
  gradientColors: [ColorValue, ColorValue];
  iconColor: string;
}

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    icon: 'trophy',
    title: 'Set Your Goals',
    description: 'Define what you want to achieve and create a clear path to success with our intuitive goal-setting tools.',
    backgroundColor: '#3B82F6',
    gradientColors: ['#3B82F6', '#1D4ED8'],
    iconColor: '#FFFFFF',
  },
  {
    id: 2,
    icon: 'trending-up',
    title: 'Track Progress',
    description: 'Monitor your journey with visual progress indicators and detailed analytics to stay motivated.',
    backgroundColor: '#10B981',
    gradientColors: ['#10B981', '#059669'],
    iconColor: '#FFFFFF',
  },
  {
    id: 3,
    icon: 'wallet',
    title: 'Budget Management',
    description: 'Manage your finances and allocate resources effectively to support your goal achievement.',
    backgroundColor: '#F59E0B',
    gradientColors: ['#F59E0B', '#D97706'],
    iconColor: '#FFFFFF',
  },
  {
    id: 4,
    icon: 'checkmark-circle',
    title: 'Achieve Success',
    description: 'Celebrate your milestones and achievements as you turn your dreams into reality.',
    backgroundColor: '#8B5CF6',
    gradientColors: ['#8B5CF6', '#7C3AED'],
    iconColor: '#FFFFFF',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();

  const currentSlide = onboardingData[currentIndex];

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / onboardingData.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      // Optional: Add real-time swipe feedback
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50 && currentIndex > 0) {
        // Swipe right - go to previous
        handleDotPress(currentIndex - 1);
      } else if (gestureState.dx < -50 && currentIndex < onboardingData.length - 1) {
        // Swipe left - go to next
        handleNext();
      }
    },
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentIndex && !isAnimating) {
      setCurrentIndex(newIndex);
      // Haptic feedback
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (currentIndex < onboardingData.length - 1) {
      setIsAnimating(true);
      const nextIndex = currentIndex + 1;
      
      // Animate button scale
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }, 300);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    console.log('Skip onboarding - navigate to main app');
    navigation.navigate('Goals');
  };

  const handleGetStarted = () => {
    if (Platform.OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    // Animate fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      console.log('Get started - navigate to auth or main app');
      navigation.navigate('Goals');
    });
  };

  const handleDotPress = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setIsAnimating(true);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const renderDots = () => {
    return (
      <View className="flex-row justify-center items-center space-x-2">
        {onboardingData.map((_, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            className="p-2"
            disabled={isAnimating}
            activeOpacity={0.7}
          >
            <Animated.View
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50'
              }`}
              style={[
                {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: index === currentIndex ? 0.25 : 0,
                  shadowRadius: 3.84,
                  elevation: 5,
                }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderSlide = (item: OnboardingItem, index: number) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View 
        key={item.id}
        style={[
          {
            width,
            height,
            transform: [{ scale }],
            opacity,
          }
        ]}
      >
        <LinearGradient
          colors={item.gradientColors}
          style={{ flex: 1 }}
        >
          {/* Icon Container */}
          <View className="items-center mb-12">
            <Animated.View 
              className="w-32 h-32 rounded-3xl items-center justify-center mb-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 15,
              }}
            >
              <View 
                className="w-20 h-20 rounded-2xl items-center justify-center"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 8,
                }}
              >
                <Ionicons 
                  name={item.icon} 
                  size={40} 
                  color={item.backgroundColor} 
                />
              </View>
            </Animated.View>
          </View>

          {/* Content */}
          <View className="items-center max-w-sm">
            <Text className="text-4xl font-bold text-white text-center mb-6">
              {item.title}
            </Text>
            <Text className="text-lg text-white/90 text-center leading-7">
              {item.description}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <Animated.View 
      className="flex-1"
      style={{ opacity: fadeAnim }}
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={currentSlide.backgroundColor}
        translucent={false}
      />
      
      <LinearGradient
        colors={currentSlide.gradientColors}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center px-6 pt-4 pb-8">
            <TouchableOpacity 
              onPress={handleSkip}
              className="py-3 px-6 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              activeOpacity={0.8}
              disabled={isAnimating}
            >
              <Text className="text-white font-semibold">Skip</Text>
            </TouchableOpacity>
            
            <View 
              className="py-2 px-4 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <Text className="text-white/90 font-medium">
                {currentIndex + 1} of {onboardingData.length}
              </Text>
            </View>
          </View>

          {/* Slides */}
          <View className="flex-1" {...panResponder.panHandlers}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { 
                  useNativeDriver: false,
                  listener: handleScroll,
                }
              )}
              scrollEventThrottle={16}
              className="flex-1"
              contentContainerStyle={{ alignItems: 'center' }}
              decelerationRate="fast"
              snapToInterval={width}
              snapToAlignment="center"
            >
              {onboardingData.map((item, index) => renderSlide(item, index))}
            </ScrollView>
          </View>

          {/* Bottom Section */}
          <View className="px-6 pb-8">
            {/* Dots Indicator */}
            <View className="mb-8">
              {renderDots()}
            </View>

            {/* Progress Bar */}
            <View className="mb-6">
              <View 
                className="w-full h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Animated.View 
                  className="h-full bg-white rounded-full"
                  style={{
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  }}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="space-y-4">
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  onPress={handleNext}
                  className="w-full py-4 rounded-2xl items-center justify-center flex-row"
                  style={{
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 10,
                  }}
                  activeOpacity={0.9}
                  disabled={isAnimating}
                >
                  <Text 
                    className="font-bold text-lg mr-2"
                    style={{ color: currentSlide.backgroundColor }}
                  >
                    {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                  </Text>
                  {currentIndex < onboardingData.length - 1 && (
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={currentSlide.backgroundColor} 
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>

              {currentIndex === onboardingData.length - 1 && (
                <TouchableOpacity
                  onPress={handleSkip}
                  className="w-full py-4"
                  activeOpacity={0.7}
                  disabled={isAnimating}
                >
                  <Text className="text-white/80 text-center font-medium">
                    I'll explore later
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Background Decorations */}
          <View className="absolute inset-0 pointer-events-none">
            <Animated.View 
              className="absolute top-20 right-8 w-32 h-32 rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: [{
                  scale: scrollX.interpolate({
                    inputRange: [0, width * (onboardingData.length - 1)],
                    outputRange: [1, 1.2],
                    extrapolate: 'clamp',
                  })
                }]
              }}
            />
            <Animated.View 
              className="absolute bottom-40 left-8 w-20 h-20 rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: [{
                  rotate: scrollX.interpolate({
                    inputRange: [0, width * (onboardingData.length - 1)],
                    outputRange: ['0deg', '360deg'],
                    extrapolate: 'clamp',
                  })
                }]
              }}
            />
            <View className="absolute top-1/3 left-12 w-4 h-4 rounded-full bg-white/20" />
            <View className="absolute top-1/2 right-16 w-6 h-6 rounded-full bg-white/20" />
            <View className="absolute top-3/4 right-1/4 w-8 h-8 rounded-full bg-white/10" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}