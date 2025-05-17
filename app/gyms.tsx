import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
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
        image: 'https://example.com/gym1.jpg',
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

export default function GymsScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState('active');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => (
            <Link href="../" style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Link>
          ),
          headerRight: () => (
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={20} color="black" />
              <Text style={styles.locationText}>all</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </View>
          )
        }}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Gyms"
          placeholderTextColor="#666"
        />
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
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
          <View key={gym.id} style={styles.gymCard}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: gym.image }} style={styles.gymImage} />
              {gym.exclusive && (
                <View style={styles.exclusiveTag}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.exclusiveText}>Exclusive</Text>
                </View>
              )}
              {gym.bcaTest && (
                <View style={styles.bcaTag}>
                  <Text style={styles.bcaText}>Free BCA Test worth ₹3000</Text>
                </View>
              )}
            </View>
            <View style={styles.gymInfo}>
              <Text style={styles.gymName}>{gym.name}</Text>
              <Text style={styles.gymDistance}>{gym.distance}</Text>
              <Text style={styles.gymLocation}>{gym.location}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Starts from</Text>
                <Text style={styles.price}>{gym.price}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.freeTrialButton}>
                  <Text style={styles.freeTrialText}>First Free Day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:     0 // Adjusted padding for better spacing
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  locationText: {
    marginHorizontal: 5,
    fontSize: 16
  },
  searchContainer: {
    margin: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16
  },
  searchIcon: {
    marginLeft: 10
  },
  categoriesContainer: {
    paddingVertical: 10
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5'
  },
  selectedCategory: {
    backgroundColor: '#007AFF'
  },
  categoryText: {
    fontSize: 16,
    color: '#333'
  },
  selectedCategoryText: {
    color: '#fff'
  },
  gymList: {
    flex: 1
  },
  gymCard: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  imageContainer: {
    position: 'relative'
  },
  gymImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  exclusiveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  exclusiveText: {
    color: '#FFD700',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold'
  },
  bcaTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,215,0,0.9)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  bcaText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  gymInfo: {
    padding: 15
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  gymDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5
  },
  gymLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  priceLabel: {
    fontSize: 14,
    color: '#666'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  freeTrialButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center'
  },
  freeTrialText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500'
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
});