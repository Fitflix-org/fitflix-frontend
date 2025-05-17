import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const healthyMeals = [
  {
    id: '1',
    title: "Soaked Dry Fruits",
    calories: 64.6,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '2',
    title: "Low Fat Milk",
    calories: 0.4,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks',
    tag: 'TONED LOW FAT'
  },
  {
    id: '3',
    title: 'Kalonji Seeds Water',
    calories: 19.8,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '4',
    title: 'Raisin Water',
    calories: 14.8,
    image: "placeholder-image.png",
    category: 'Early Morning'
  }
];

const mealCategories = ['Early Morning', 'Breakfast', 'Mid Morning Snacks'];

export default function NutritionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={"placeholder-image.png"}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Hello, srujan</Text>
            <Text style={styles.subGreeting}>Good, day</Text>
          </View>
          <View style={styles.championBadge}>
            <FontAwesome5 name="star" size={16} color="#FFD700" />
            <Text style={styles.championText}>Champion</Text>
          </View>
        </View>

        <View style={styles.planSection}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>YOUR ACTIVE PLAN</Text>
            <Text style={styles.daysLeft}>0 Days Left</Text>
          </View>
          <View style={styles.subscriptionCard}>
            <FontAwesome5 name="cloud-moon" size={40} color="#666" />
            <Text style={styles.noSubText}>No Active Regular Subscription</Text>
            <Text style={styles.subDescription}>Subscribe to a regular plan and get a customized diet plan</Text>
            <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Updated Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>YOUR CURRENT HEALTH STATS</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>BMI</Text>
              <FontAwesome5 name="weight" size={24} color="#333" />
              <Text style={styles.statValue}>23.7</Text>
              <View style={styles.healthyTag}>
                <Text style={styles.healthyText}>Healthy</Text>
              </View>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TDEE</Text>
              <FontAwesome5 name="chart-line" size={24} color="#333" />
              <Text style={styles.statValue}>1926</Text>
              <Text style={styles.statUnit}>Calorie/day</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>BMR</Text>
              <FontAwesome5 name="fire" size={24} color="#333" />
              <Text style={styles.statValue}>1605</Text>
              <Text style={styles.statUnit}>Calorie/day</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Body Fat</Text>
              <FontAwesome5 name="percentage" size={24} color="#333" />
              <Text style={styles.statValue}>27 %</Text>
              <Text style={styles.obeseText}>Obese</Text>
            </View>
          </View>
        </View>

        <View style={styles.weightSection}>
          <View style={styles.weightHeader}>
            <Text style={styles.weightTitle}>Your Weight Progress</Text>
            <TouchableOpacity style={styles.logButton}>
              <Text style={styles.logButtonText}>Log Weight</Text>
              <FontAwesome5 name="arrow-right" size={12} color="#dc2626" />
            </TouchableOpacity>
          </View>
          <View style={styles.weightCard}>
            <View style={styles.weightInfo}>
              <View>
                <Text style={styles.weightLabel}>Current</Text>
                <Text style={styles.weightValue}>75<Text style={styles.weightUnit}> kg</Text></Text>
              </View>
              <View style={styles.weightDivider} />
              <View>
                <Text style={styles.weightLabel}>Target</Text>
                <Text style={styles.weightValue}>60<Text style={styles.weightUnit}> kg</Text></Text>
              </View>
            </View>
            <TouchableOpacity style={styles.periodSelector}>
              <Text style={styles.periodText}>Three Month</Text>
              <FontAwesome5 name="chevron-down" size={12} color="#666" />
            </TouchableOpacity>
            <Text style={styles.noDataText}>It seems you didn't record any logs within that date range</Text>
          </View>
        </View>
      </View>

      <View style={styles.mealsSection}>
        <Text style={styles.mealsTitle}>Healthy Meals To Try</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {mealCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.categoryButton, index === 0 && styles.activeCategoryButton]}
            >
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.mealsGrid}>
          {healthyMeals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <Image source={meal.image} style={styles.mealImage} />
              {meal.tag && <View style={styles.mealTag}><Text style={styles.tagText}>{meal.tag}</Text></View>}
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <View style={styles.calorieInfo}>
                <FontAwesome5 name="fire-alt" size={16} color="#dc2626" />
                <Text style={styles.calorieText}>{meal.calories} Cal</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#8B4513',
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  championBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  championText: {
    color: '#FFD700',
    marginLeft: 5,
    fontWeight: '600',
  },
  planSection: {
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  daysLeft: {
    color: '#fff',
    opacity: 0.8,
  },
  subscriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  noSubText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  subDescription: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  updateButtonText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  healthyTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 5,
  },
  healthyText: {
    color: '#fff',
    fontSize: 12,
  },
  obeseText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 5,
  },
  weightSection: {
    padding: 20,
  },
  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logButtonText: {
    color: '#dc2626',
    marginRight: 5,
  },
  weightCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  weightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  weightLabel: {
    fontSize: 14,
    color: '#666',
  },
  weightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  weightUnit: {
    fontSize: 16,
    color: '#666',
  },
  weightDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    marginTop: 15,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 15,
  },
  mealsSection: {
    padding: 20,
  },
  mealsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  activeCategoryButton: {
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
  },
  mealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '48%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  mealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  mealTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 10,
  },
  calorieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  calorieText: {
    marginLeft: 5,
    color: '#666',
  },
});