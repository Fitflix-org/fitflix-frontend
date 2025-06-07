import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Meal = {
  id: string;
  title: string;
  calories: number;
  image: string;
  category: string;
  tag?: string;
};

const healthyMeals: Meal[] = [
  // Early Morning (10 items)
  {
    id: '1',
    title: "Soaked Dry Fruits",
    calories: 64.6,
    image: "placeholder-image.png",
    category: 'Early Morning'
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
  },
  {
    id: '10',
    title: 'Lemon Water with Honey',
    calories: 25.5,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '11',
    title: 'Chia Seeds Water',
    calories: 35.2,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  // More meals for other categories would be included here
];

const mealCategories = [
  'Early Morning',
  'Breakfast',
  'Mid Morning Snacks',
  'Lunch',
  'Snacks',
  'Dinner'
];

export default function NutritionScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Early Morning');
  const [currentCategory, setCurrentCategory] = useState('');
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMealName, setCustomMealName] = useState('');
  const [customMealCalories, setCustomMealCalories] = useState('');
  
  // State for tracking selected meals and custom meals
  const [selectedMeals, setSelectedMeals] = useState({});
  const [customMeals, setCustomMeals] = useState({});
  const [customCalories, setCustomCalories] = useState({});

  // Calculate total calories consumed
  const calculateTotalCalories = () => {
    let total = 0;
    
    // Add calories from selected meals
    Object.keys(selectedMeals).forEach(category => {
      if (selectedMeals[category]) {
        const meal = healthyMeals.find(m => m.id === selectedMeals[category]);
        if (meal) {
          total += meal.calories;
        }
      }
    });
    
    // Add calories from custom meals
    Object.keys(customCalories).forEach(category => {
      total += customCalories[category] || 0;
    });
    
    return total.toFixed(1);
  };

  // Handle meal selection
  const handleSelectMeal = (mealId) => {
    if (mealId === 'custom') {
      setShowCustomInput(true);
      setShowMealSelector(false);
    } else {
      setSelectedMeals({
        ...selectedMeals,
        [currentCategory]: mealId
      });
      // Clear any custom meal for this category
      const newCustomMeals = { ...customMeals };
      const newCustomCalories = { ...customCalories };
      delete newCustomMeals[currentCategory];
      delete newCustomCalories[currentCategory];
      setCustomMeals(newCustomMeals);
      setCustomCalories(newCustomCalories);
      setShowMealSelector(false);
    }
  };

  // Handle custom meal submission
  const handleCustomMealSubmit = () => {
    if (customMealName.trim()) {
      setCustomMeals({
        ...customMeals,
        [currentCategory]: customMealName.trim()
      });
      setCustomCalories({
        ...customCalories,
        [currentCategory]: parseFloat(customMealCalories) || 0
      });
      // Clear selected meal for this category
      setSelectedMeals({
        ...selectedMeals,
        [currentCategory]: ''
      });
      setCustomMealName('');
      setCustomMealCalories('');
      setShowCustomInput(false);
    }
  };
  
  // Open meal selector modal
  const openMealSelector = (category) => {
    setCurrentCategory(category);
    setShowMealSelector(true);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Hello, User</Text>
            <Text style={styles.subGreeting}>Good day</Text>
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
              <Text style={styles.updateButtonText}>Update Profile</Text>
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

      <View style={styles.calorieCounterSection}>
        <Text style={styles.calorieCounterTitle}>Daily Calorie Counter</Text>
        <View style={styles.calorieCounterCard}>
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.totalCaloriesLabel}>Total Calories Consumed Today</Text>
            <View style={styles.totalCaloriesValue}>
              <FontAwesome5 name="fire-alt" size={24} color="#dc2626" />
              <Text style={styles.calorieNumber}>{calculateTotalCalories()}</Text>
              <Text style={styles.calorieUnit}>Cal</Text>
            </View>
          </View>
          
          <Text style={styles.mealSelectionTitle}>Select what you ate today:</Text>
          
          <View style={styles.mealSelectionContainer}>
            {mealCategories.map((category) => (
              <View key={category} style={styles.mealSelectionRow}>
                <Text style={styles.mealCategoryLabel}>{category}</Text>
                <TouchableOpacity 
                  style={styles.mealSelectorButton}
                  onPress={() => openMealSelector(category)}
                >
                  {selectedMeals[category] ? (
                    <Text style={styles.selectedMealText}>
                      {healthyMeals.find(m => m.id === selectedMeals[category])?.title || 'Select'}
                    </Text>
                  ) : customMeals[category] ? (
                    <Text style={styles.selectedMealText}>
                      {customMeals[category]} ({customCalories[category]} Cal)
                    </Text>
                  ) : (
                    <Text style={styles.mealSelectorText}>Select</Text>
                  )}
                  <FontAwesome5 name="chevron-down" size={12} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>

      <Modal
        visible={showMealSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMealSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {currentCategory} Item</Text>
              <TouchableOpacity onPress={() => setShowMealSelector(false)}>
                <FontAwesome5 name="times" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.mealListContainer}>
              <TouchableOpacity 
                style={styles.mealListItem}
                onPress={() => handleSelectMeal('')}
              >
                <Text style={styles.mealListItemText}>None</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.mealListItem, styles.customMealItem]}
                onPress={() => handleSelectMeal('custom')}
              >
                <Text style={styles.mealListItemText}>Other (Add custom item)</Text>
                <FontAwesome5 name="plus" size={14} color="#dc2626" />
              </TouchableOpacity>
              
              {healthyMeals
                .filter(meal => meal.category === currentCategory)
                .map(meal => (
                  <TouchableOpacity 
                    key={meal.id} 
                    style={styles.mealListItem}
                    onPress={() => handleSelectMeal(meal.id)}
                  >
                    <Text style={styles.mealListItemText}>{meal.title}</Text>
                    <Text style={styles.mealListItemCalories}>{meal.calories} Cal</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCustomInput}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCustomInput(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Custom {currentCategory} Item</Text>
              <TouchableOpacity onPress={() => setShowCustomInput(false)}>
                <FontAwesome5 name="times" size={20} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.customInputContainer}>
              <Text style={styles.customInputLabel}>Food Name</Text>
              <TextInput
                style={styles.customInput}
                placeholder="Enter food name"
                value={customMealName}
                onChangeText={setCustomMealName}
              />
              
              <Text style={styles.customInputLabel}>Calories</Text>
              <TextInput
                style={styles.customInput}
                placeholder="Enter calories"
                value={customMealCalories}
                onChangeText={setCustomMealCalories}
                keyboardType="numeric"
              />
              
              <TouchableOpacity 
                style={styles.customSubmitButton}
                onPress={handleCustomMealSubmit}
              >
                <Text style={styles.customSubmitButtonText}>Add Food</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  calorieCounterSection: {
    padding: 20,
  },
  calorieCounterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  calorieCounterCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  totalCaloriesContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalCaloriesLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  totalCaloriesValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calorieNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  calorieUnit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  mealSelectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mealSelectionContainer: {
    marginBottom: 10,
  },
  mealSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mealCategoryLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  mealSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 2,
    justifyContent: 'space-between',
  },
  mealSelectorText: {
    color: '#666',
  },
  selectedMealText: {
    color: '#333',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealListContainer: {
    maxHeight: 400,
  },
  mealListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  customMealItem: {
    backgroundColor: '#f9f9f9',
  },
  mealListItemText: {
    fontSize: 16,
    color: '#333',
  },
  mealListItemCalories: {
    fontSize: 14,
    color: '#dc2626',
  },
  customInputContainer: {
    padding: 10,
  },
  customInputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  customInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  customSubmitButton: {
    backgroundColor: '#dc2626',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  customSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});