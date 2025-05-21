import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingCarousel from '../components/OnboardingCarousel';

const OnboardingScreen: React.FC = () => {
  const handleComplete = () => {
    // Navigate to registration after onboarding
    router.push('/registration');
  };

  return (
    <View style={styles.container}>
      <OnboardingCarousel onComplete={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 0
  }
});

export default OnboardingScreen;