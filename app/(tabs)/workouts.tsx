import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type WorkoutCategory = {
  name: string;
  icon: string;
  description: string;
};

const workoutCategories: WorkoutCategory[] = [
  {
    name: 'Strength Training',
    icon: 'dumbbell',
    description: 'Build muscle and strength'
  },
  {
    name: 'Cardio',
    icon: 'running',
    description: 'Improve endurance and heart health'
  },
  {
    name: 'Yoga',
    icon: 'pray',
    description: 'Enhance flexibility and mindfulness'
  },
  {
    name: 'HIIT',
    icon: 'bolt',
    description: 'High-intensity interval training'
  }
];

function WorkoutCard({ category }: { category: WorkoutCategory }) {
  return (
    <TouchableOpacity style={styles.card}>
      <FontAwesome5 name={category.icon} size={24} color="#666" />
      <Text style={styles.cardTitle}>{category.name}</Text>
      <Text style={styles.cardDescription}>{category.description}</Text>
    </TouchableOpacity>
  );
}

export default function WorkoutsScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Workouts</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {workoutCategories.map((category, index) => (
            <WorkoutCard key={index} category={category} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
