import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type GymCategory = {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  features: string[];
  gyms: Gym[];
};

type Gym = {
  id: string;
  name: string;
  location: string;
  distance: string;
  price: string;
  image: string;
  exclusive: boolean;
  bcaTest: boolean;
};

const gymCategories: GymCategory[] = [
  {
    id: 'active',
    name: 'Active',
    description: 'Affordable fitness centers with essential equipment',
    priceRange: '₹999 - ₹1,999/month',
    features: ['Basic Equipment', 'Group Classes', 'Locker Room'],
    gyms: [
      {
        id: '1',
        name: 'WTF Gym Sector 22',
        location: '2nd Floor, Global Fitness, CS Rana Complex near by Shiv Mandir Sec-22',
        distance: '1.66 km',
        price: '₹999/Month',
        image: '../../assets/images/onboarding/slide4.jpg',
        exclusive: true,
        bcaTest: true
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Advanced facilities with premium equipment and services',
    priceRange: '₹2,000 - ₹3,999/month',
    features: ['Premium Equipment', 'Personal Training', 'Spa Access', 'Swimming Pool'],
    gyms: [
      {
        id: '2',
        name: 'Premium Fitness Hub',
        location: '5th Avenue, Downtown',
        distance: '3.5 km',
        price: '₹2,500/Month',
        image: 'https://example.com/gym2.jpg',
        exclusive: false,
        bcaTest: false
      }
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Elite fitness experience with exclusive amenities',
    priceRange: '₹4,000+/month',
    features: ['State-of-the-art Equipment', 'VIP Services', 'Wellness Center', 'Tennis Court'],
    gyms: [
      {
        id: '3',
        name: 'Luxury Health Club',
        location: 'Ocean Drive, Seaside',
        distance: '5 km',
        price: '₹5,000/Month',
        image: 'https://example.com/gym3.jpg',
        exclusive: true,
        bcaTest: true
      }
    ]
  }
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('active');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color="white" />
          <Text style={styles.locationText}>all</Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for gym near you"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {gymCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, selectedCategory === category.id && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[styles.categoryText, selectedCategory === category.id && styles.selectedCategoryText]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.gymList}>
        {gymCategories.find(cat => cat.id === selectedCategory)?.gyms.map((gym) => (
          <TouchableOpacity 
            key={gym.id} 
            style={styles.gymCard}
            onPress={() => router.push(`/gym-details?id=${gym.id}`)}
          >
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: gym.image }} style={styles.gymImage} />
                <View style={styles.gymBadge}>
                  <Text style={styles.gymBadgeText}>GYM PRO</Text>
                  <Ionicons name="diamond" size={16} color="white" />
                </View>
              </View>
              <View style={styles.gymInfo}>
                <Text style={styles.gymName}>{gym.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#4CAF50" />
                  <Text style={styles.ratingText}>4.6</Text>
                  <Text style={styles.distanceText}>• {gym.distance} away</Text>
                </View>
                <Text style={styles.gymLocation}>{gym.location}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.checkInButton}
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onPress
                      console.log('Check in pressed');
                    }}
                  >
                    <Text style={styles.checkInText}>CHECK IN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.renewButton}
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onPress
                      console.log('Renew pressed');
                    }}
                  >
                    <Text style={styles.renewText}>RENEW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10
  },
  backButton: {
    padding: 5
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'white'
  },
  searchContainer: {
    margin: 15,
    backgroundColor: '#222',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'white'
  },
  searchIcon: {
    marginRight: 10,
    color: '#888'
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#222'
  },
  selectedCategory: {
    backgroundColor: '#4CAF50'
  },
  categoryText: {
    fontSize: 16,
    color: '#888'
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold'
  },
  gymList: {
    flex: 1,
    paddingHorizontal: 10
  },
  gymCard: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#111',
    overflow: 'hidden'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
    width: '40%'
  },
  gymImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  gymBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#4A148C',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  gymBadgeText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12,
    fontWeight: 'bold'
  },
  gymInfo: {
    padding: 15,
    width: '60%'
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  ratingText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
    marginRight: 5
  },
  distanceText: {
    fontSize: 14,
    color: '#888'
  },
  gymLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
    lineHeight: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  checkInButton: {
    flex: 1,
    backgroundColor: '#0F1E3D',
    borderRadius: 25,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center'
  },
  checkInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  renewButton: {
    flex: 1,
    backgroundColor: '#0F1E3D',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center'
  },
  renewText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});