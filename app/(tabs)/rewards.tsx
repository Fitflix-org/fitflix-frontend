import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const rewardItems = [
  { id: '1', title: 'Free Workout Session', points: 500, icon: 'dumbbell' },
  { id: '2', title: 'Nutrition Consultation', points: 1000, icon: 'apple-alt' },
  { id: '3', title: 'Premium Membership', points: 2000, icon: 'crown' },
  { id: '4', title: 'Personal Training', points: 1500, icon: 'user-friends' },
];

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsValue}>1,250</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={styles.rewardsGrid}>
          {rewardItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.rewardCard}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={item.icon} size={24} color="#FFD700" />
              </View>
              <Text style={styles.rewardTitle}>{item.title}</Text>
              <Text style={styles.pointsRequired}>{item.points} Points</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#111827',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 5,
  },
  pointsRequired: {
    fontSize: 12,
    color: '#FFD700',
    opacity: 0.8,
  },
});