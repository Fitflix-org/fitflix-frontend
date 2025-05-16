import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type MealCategory = {
  name: string;
  icon: string;
  description: string;
};

const mealCategories: MealCategory[] = [
  {
    name: 'Meal Planning',
    icon: 'calendar-alt',
    description: 'Plan your weekly meals'
  },
  {
    name: 'Calorie Tracking',
    icon: 'chart-line',
    description: 'Monitor your daily intake'
  },
  {
    name: 'Recipes',
    icon: 'book',
    description: 'Healthy meal recipes'
  },
  {
    name: 'Water Intake',
    icon: 'tint',
    description: 'Track your hydration'
  }
];

function NutritionCard({ category }: { category: MealCategory }) {
  return (
    <TouchableOpacity style={styles.card}>
      <FontAwesome5 name={category.icon} size={24} color="#666" />
      <Text style={styles.cardTitle}>{category.name}</Text>
      <Text style={styles.cardDescription}>{category.description}</Text>
    </TouchableOpacity>
  );
}

export default function NutritionScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Nutrition</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {mealCategories.map((category, index) => (
            <NutritionCard key={index} category={category} />
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