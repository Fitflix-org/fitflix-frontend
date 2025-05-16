import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

const carouselItems = [
  {
    title: 'Smart And Hygienic gyms',
    text: 'Modern equipments, Cutting-edge facilities, and a spotless environment',
    image: { uri: 'https://via.placeholder.com/300x300?text=Gym+1' }
  },
  {
    title: 'Expert Trainers',
    text: 'Get guidance from certified fitness professionals',
    image: { uri: 'https://via.placeholder.com/300x300?text=Gym+2' }
  },
  {
    title: 'Flexible Plans',
    text: 'Choose from a variety of membership options',
    image: { uri: 'https://via.placeholder.com/300x300?text=Gym+3' }
  }
];

export default function OnboardingScreen() {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={setActiveSlide}
        autoplay
        autoplayInterval={3000}
        loop
      />
      
      <View style={styles.pagination}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={[styles.button, styles.getStartedButton]}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={[styles.button, styles.tryButton]}>
          <Text style={styles.tryButtonText}>Try WTF for ₹1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: ITEM_WIDTH * 0.8,
    height: ITEM_WIDTH * 0.8,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF0000',
    width: 20,
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
    gap: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FF0000',
  },
  tryButton: {
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tryButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});