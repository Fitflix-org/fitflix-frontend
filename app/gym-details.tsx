import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Amenity = {
  icon: string;
  name: string;
};

const amenities: Amenity[] = [
  { icon: 'barbell', name: 'Personal Training' },
  { icon: 'videocam', name: 'CCTV' },
  { icon: 'water', name: 'Swimming pool' },
  { icon: 'water-outline', name: 'Shower' },
  { icon: 'tv', name: 'TV' },
];

const gymImages = [
  require('../assets/images/onboarding/slide4.jpg'),
  require('../assets/images/onboarding/slide4.jpg'),
  require('../assets/images/onboarding/slide4.jpg'),
  require('../assets/images/onboarding/slide4.jpg'),
];

export default function GymDetailsScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const [timerHours, setTimerHours] = useState(6);
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [timerSeconds, setTimerSeconds] = useState(67);

  // In a real app, you would fetch the gym details based on the ID
  // For now, we'll use hardcoded data
  const gymDetails = {
    id: id || '1',
    name: 'Delight Fitness',
    price: '₹899/month*', 
  };

  const trainingClasses = [
    { name: 'Zumba', image: require('../assets/images/zumba.jpg') },
    { name: 'Yoga', image: require('../assets/images/yoga.jpg') },
    { name: 'Boxing', image: require('../assets/images/boxing.avif') },
    { name: 'Dance', image: require('../assets/images/dance.avif') }
  ];

  const nearbyGyms = [
    {
      name: 'ClassicFit Studio',
      location: 'Sangareddy',
      price: '₹2999/Mo*',
      image: require('../assets/images/yoga.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      {/* Video/Image Section */}
      <View style={styles.videoContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Link href="/gyms">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Link>
        </TouchableOpacity>
        <View style={styles.playButton}>
          <Ionicons name="play" size={24} color="white" />
        </View>
      </View>
      
      {/* Gym Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.gymHeader}>
          <Text style={styles.gymName}>{gymDetails.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{gymDetails.price}</Text>
            <Text style={styles.priceSubtext}>Onwards</Text>
          </View>
        </View>
        
        <View style={styles.locationRow}>
          <View style={styles.locationInfo}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.locationText}>{gymDetails.distance} {gymDetails.location}</Text>
          </View>
          <TouchableOpacity style={styles.directionButton}>
            <Ionicons name="navigate-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.timingRow}>
          <Ionicons name="time-outline" size={20} color="white" />
          <Text style={styles.timingText}>Gym timing : {gymDetails.timing}</Text>
          <TouchableOpacity style={styles.expandButton}>
            <Ionicons name="chevron-down" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          <Image source={require('../assets/images/icon.png')} style={styles.googleIcon} />
          <Text style={styles.ratingText}>{gymDetails.rating}</Text>
          <Text style={styles.reviewsText}>{gymDetails.reviews} Reviews</Text>
        </View>
        
        {/* Promotion Section */}
        <View style={styles.promotionContainer}>
          <Text style={styles.promotionTitle}>SUMMER SAVER SALE</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{String(timerHours).padStart(2, '0')}: {String(timerMinutes).padStart(2, '0')} : {String(timerSeconds).padStart(2, '0')}</Text>
          </View>
          <Text style={styles.promotionText}>+ FREE ₹900 Amazon voucher</Text>
          <Text style={styles.promotionText}>+ No Cost EMI Available</Text>
        </View>
        
        {/* Membership Section */}
        <TouchableOpacity style={styles.membershipContainer}>
          <View style={styles.membershipIconContainer}>
            <Ionicons name="star" size={24} color="white" />
          </View>
          <View style={styles.membershipTextContainer}>
            <Text style={styles.membershipTitle}>Do you want unlimited access</Text>
            <Text style={styles.membershipTitle}>to only this center?</Text>
            <Text style={styles.membershipSubtext}>Get unlimited access to single center with other benefits</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
        
        {/* Amenities Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Ionicons name={amenity.icon as any} size={24} color="white" style={styles.amenityIcon} />
                <Text style={styles.amenityText}>{amenity.name}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Gym Images Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.gymImagesContainer}>
            {gymImages.map((image, index) => (
              <Image key={index} source={image} style={styles.gymImage} />
            ))}
          </View>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Available Training Classes */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Training Classes</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trainingClassesScroll}>
          {trainingClasses.map((item, index) => (
            <View key={index} style={styles.trainingClassItem}>
              <Image source={item.image} style={styles.trainingClassImage} />
              <Text style={styles.trainingClassLabel}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Gyms And Centers */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Gyms And Centers</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </View>
        {nearbyGyms.map((gym, index) => (
          <View key={index} style={styles.nearbyGymCard}>
            <ImageBackground
              source={gym.image}
              style={styles.nearbyGymImage}
              imageStyle={styles.nearbyGymImageStyle}
            >
              <View style={styles.gymProTag}>
                <Text style={styles.gymProText}>GYM PRO</Text>
                <MaterialCommunityIcons name="diamond" size={16} color="white" />
              </View>
              <View style={styles.nearbyGymOverlay}>
                <View style={styles.nearbyGymDetails}>
                  <Text style={styles.nearbyGymName}>{gym.name}</Text>
                  <View style={styles.nearbyGymLocation}>
                    <MaterialIcons name="location-on" size={16} color="white" />
                    <Text style={styles.nearbyGymLocationText}>{gym.location}</Text>
                  </View>
                </View>
                <View style={styles.nearbyGymPriceContainer}>
                  <Text style={styles.nearbyGymPrice}>{gym.price}</Text>
                  <Text style={styles.nearbyGymTaxes}>+ Taxes</Text>
                </View>
              </View>
              <View style={styles.nearbyGymButtonsContainer}>
                <TouchableOpacity style={styles.nearbyGymButton}>
                  <Text style={styles.nearbyGymButtonText}>CHECK IN</Text>
                </TouchableOpacity>
                <View style={styles.buttonDivider} />
                <TouchableOpacity style={styles.nearbyGymButton}>
                  <Text style={styles.nearbyGymButtonText}>RENEW</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#0F1E3D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  gymHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
  directionButton: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 20,
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timingText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
  expandButton: {
    marginLeft: 'auto',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  reviewsText: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  promotionContainer: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  timerContainer: {
    backgroundColor: '#333333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  promotionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  membershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  membershipIconContainer: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  membershipTextContainer: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  membershipSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  amenityIcon: {
    marginRight: 10,
  },
  amenityText: {
    fontSize: 16,
    color: 'white',
  },
  gymImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gymImage: {
    width: '48%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  viewMoreText: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  statisticsContainer: {
    padding: 15,
    backgroundColor: '#0F1E3D',
    borderRadius: 10,
    marginBottom: 20,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statisticItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statisticValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  statisticLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  statisticSubtext: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  statisticDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#333333',
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  trainingClassesScroll: {
    paddingHorizontal: 15,
  },
  trainingClassItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  trainingClassImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  trainingClassLabel: {
    color: 'white',
    fontSize: 14,
  },
  nearbyGymCard: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  nearbyGymImage: {
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
  },
  nearbyGymImageStyle: {
    borderRadius: 10,
  },
  gymProTag: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  gymProText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  nearbyGymOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  nearbyGymDetails: {},
  nearbyGymName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nearbyGymLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  nearbyGymLocationText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  nearbyGymPriceContainer: {
    alignItems: 'flex-end',
  },
  nearbyGymPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nearbyGymTaxes: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  nearbyGymButtonsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  nearbyGymButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nearbyGymButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#0F1E3D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  gymHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
  directionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timingText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
    flex: 1,
  },
  expandButton: {
    padding: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  reviewsText: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  promotionContainer: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  timerContainer: {
    marginBottom: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  promotionText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  membershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  membershipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  membershipTextContainer: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  membershipSubtext: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    alignItems: 'center',
    width: width / 5 - 10,
    marginBottom: 15,
  },
  amenityIcon: {
    marginBottom: 5,
  },
  amenityText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  gymImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gymImage: {
    width: (width - 40) / 2,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
  },
  viewMoreText: {
    fontSize: 14,
    color: 'white',
    marginRight: 5,
  },
});