import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  { id: 1, image: require('../assets/images/onboarding/slide1.jpeg') },
  { id: 2, image: require('../assets/images/onboarding/slide2.webp') },
  { id: 3, image: require('../assets/images/onboarding/slide3.webp') },
  { id: 4, image: require('../assets/images/onboarding/slide4.jpg') },
  { id: 5, image: require('../assets/images/onboarding/slide5.jpg') },
];

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onComplete }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);



  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < slides.length - 1) {
        setActiveIndex(activeIndex + 1);
        scrollViewRef.current?.scrollTo({
          x: width * (activeIndex + 1),
          animated: true,
        });
      } else {
        setActiveIndex(0);
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide) => (
          <Image
            key={slide.id}
            source={slide.image}
            style={styles.slide}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={onComplete}
      >
        <FontAwesome5 name="arrow-right" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingCarousel;