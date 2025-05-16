import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type DiscoverItem = {
  id: string;
  title: string;
  icon: string;
  comingSoon?: boolean;
};

type GymLocation = {
  id: string;
  name: string;
  distance: string;
  address: string;
  price: string;
  isExclusive: boolean;
  offer: string;
};

const discoverItems: DiscoverItem[] = [
  { id: '1', title: 'WTF GYM', icon: 'map-marker-alt' },
  { id: '2', title: 'Schedule', icon: 'calendar-alt' },
  { id: '3', title: 'DIGI-GYM', icon: 'video' },
  { 
    id: '4', 
    title: 'Personal Training', 
    icon: 'user-friends',
    comingSoon: true 
  },
  { 
    id: '5', 
    title: 'Fitness Activity', 
    icon: 'running',
    comingSoon: true 
  },
  { 
    id: '6', 
    title: 'Diet & Nutrition', 
    icon: 'apple-alt',
    comingSoon: true 
  },
];

const nearbyGyms: GymLocation[] = [
  {
    id: '1',
    name: 'WTF Gym Sector 22, Noida',
    distance: '1.66 km',
    address: '2nd Floor, Global Fitness, CS Rana Complex near by Shiv Mandir Sec-22, Chaura Raghunathpur',
    price: '₹999/Month',
    isExclusive: true,
    offer: 'Free BCA Test worth ₹3000'
  },
  {
    id: '2',
    name: 'WTF Exclusive Gym Tower Sector 16',
    distance: '2.47 km',
    address: 'WTT Tower 16',
    price: '₹999/Month',
    isExclusive: true,
    offer: 'Free BCA Test worth ₹3000'
  }
];

const activeWays = [
  'TAKE A WALK DURING YOUR LUNCH BREAK',
  'BIKE TO WORK WHENEVER POSSIBLE',
  'TAKE THE STAIRS INSTEAD OF THE ELEVATOR',
  'DANCE AROUND THE HOUSE FOR A WHILE',
  'TRY A SHORT, AT-HOME WORKOUT',
  'TRY A GROUP FITNESS CLASS IN YOUR COMMUNITY'
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.username}>srujan</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.supportButton}>
          <FontAwesome5 name="comment" size={20} color="#000" />
          <Text style={styles.supportText}>Support</Text>
        </TouchableOpacity>
      </View>

      {/* Special Price Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>SUPER SALE SPECIAL PRICE</Text>
          <Text style={styles.bannerSubtitle}>GYM MEMBERSHIP STARTS JUST AT</Text>
          <Text style={styles.bannerPrice}>₹999/MONTH</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Discover Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discover</Text>
        <View style={styles.discoverGrid}>
          {discoverItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.discoverItem}>
              <FontAwesome5 name={item.icon} size={24} color="#FF0000" />
              <Text style={styles.discoverItemTitle}>{item.title}</Text>
              {item.comingSoon && (
                <Text style={styles.comingSoon}>(Coming Soon)</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nearby Gyms Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Popular Nearby Gyms</Text>
            <Text style={styles.sectionSubtitle}>Explore our well equipped popular gyms</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {nearbyGyms.map(gym => (
          <View key={gym.id} style={styles.gymCard}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/300x200' }}
              style={styles.gymImage}
            />
            {gym.isExclusive && (
              <View style={styles.exclusiveTag}>
                <FontAwesome5 name="star" size={16} color="#FFD700" />
                <Text style={styles.exclusiveText}>Exclusive</Text>
              </View>
            )}
            <Text style={styles.offerText}>{gym.offer}</Text>
            <View style={styles.gymInfo}>
              <Text style={styles.gymName}>{gym.name}</Text>
              <Text style={styles.gymDistance}>{gym.distance} • {gym.address}</Text>
              <View style={styles.gymActions}>
                <Text style={styles.gymPrice}>Starts from {gym.price}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.freeTrialButton}>
                    <Text style={styles.freeTrialText}>First Free Day</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Ways to be Active Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WAYS TO BE ACTIVE</Text>
        <View style={styles.waysGrid}>
          {activeWays.map((way, index) => (
            <View key={index} style={[styles.wayItem, { backgroundColor: getWayColor(index) }]}>
              <Text style={styles.wayText}>{way}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function getWayColor(index: number): string {
  const colors = ['#B5E6E6', '#C7E6B8', '#FFD6CC', '#FFD6A5', '#FFB6D9', '#FFE5B4'];
  return colors[index % colors.length];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 20,
    gap: 5,
  },
  supportText: {
    color: '#000',
    fontWeight: '500',
  },
  banner: {
    backgroundColor: '#0000FF',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },
  bannerContent: {
    alignItems: 'center',
  },
  bannerTitle: {
    color: '#FFA500',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  bannerPrice: {
    color: '#FFA500',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  joinButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  joinButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  viewAll: {
    color: '#FF0000',
    fontWeight: '500',
  },
  discoverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  discoverItem: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discoverItemTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  comingSoon: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  gymCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gymImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  exclusiveTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 5,
    borderRadius: 5,
    gap: 5,
  },
  exclusiveText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerText: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#FFD700',
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  gymInfo: {
    padding: 15,
  },
  gymName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gymDistance: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
  gymActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gymPrice: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  freeTrialButton: {
    borderWidth: 1,
    borderColor: '#FF0000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  freeTrialText: {
    color: '#FF0000',
    fontSize: 12,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  waysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  wayItem: {
    width: '48%',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  wayText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});