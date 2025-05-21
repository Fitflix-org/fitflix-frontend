import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const healthyMeals = [
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
  {
    id: '12',
    title: 'Aloe Vera Juice',
    calories: 42.0,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '13',
    title: 'Amla Juice',
    calories: 33.7,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '14',
    title: 'Fenugreek Water',
    calories: 18.3,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '15',
    title: 'Cinnamon Water',
    calories: 12.5,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },
  {
    id: '16',
    title: 'Cumin Water',
    calories: 15.8,
    image: "placeholder-image.png",
    category: 'Early Morning'
  },

  // Breakfast (10 items)
  {
    id: '17',
    title: 'Oatmeal with Fruits',
    calories: 245.0,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '18',
    title: 'Vegetable Poha',
    calories: 178.5,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '19',
    title: 'Multigrain Toast with Avocado',
    calories: 210.3,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '20',
    title: 'Idli with Sambar',
    calories: 165.8,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '21',
    title: 'Vegetable Upma',
    calories: 185.2,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '22',
    title: 'Egg White Omelette',
    calories: 155.0,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '23',
    title: 'Besan Chilla',
    calories: 170.6,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '24',
    title: 'Sprouts Salad',
    calories: 120.8,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '25',
    title: 'Ragi Dosa',
    calories: 145.3,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },
  {
    id: '26',
    title: 'Paneer Paratha',
    calories: 230.5,
    image: "placeholder-image.png",
    category: 'Breakfast'
  },

  // Mid Morning Snacks (10 items)
  {
    id: '2',
    title: "Low Fat Milk",
    calories: 0.4,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks',
    tag: 'TONED LOW FAT'
  },
  {
    id: '27',
    title: 'Apple Slices with Peanut Butter',
    calories: 160.2,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '28',
    title: 'Roasted Chana',
    calories: 120.5,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '29',
    title: 'Buttermilk',
    calories: 70.3,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '30',
    title: 'Coconut Water',
    calories: 45.6,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '31',
    title: 'Handful of Mixed Nuts',
    calories: 170.8,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '32',
    title: 'Vegetable Sandwich',
    calories: 145.2,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '33',
    title: 'Fruit Yogurt',
    calories: 110.5,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '34',
    title: 'Protein Shake',
    calories: 130.0,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },
  {
    id: '35',
    title: 'Cucumber and Carrot Sticks',
    calories: 45.2,
    image: "placeholder-image.png",
    category: 'Mid Morning Snacks'
  },

  // Lunch (10 items)
  {
    id: '5',
    title: 'Grilled Chicken Salad',
    calories: 320,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '6',
    title: 'Quinoa Bowl',
    calories: 280,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '36',
    title: 'Brown Rice with Dal and Vegetables',
    calories: 340.5,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '37',
    title: 'Roti with Paneer Curry',
    calories: 380.2,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '38',
    title: 'Vegetable Khichdi',
    calories: 290.6,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '39',
    title: 'Grilled Fish with Steamed Vegetables',
    calories: 310.8,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '40',
    title: 'Rajma Chawal',
    calories: 360.3,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '41',
    title: 'Vegetable Pulao',
    calories: 325.7,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '42',
    title: 'Chole with Multigrain Roti',
    calories: 370.2,
    image: "placeholder-image.png",
    category: 'Lunch'
  },
  {
    id: '43',
    title: 'Lentil Soup with Whole Grain Bread',
    calories: 295.4,
    image: "placeholder-image.png",
    category: 'Lunch'
  },

  // Snacks (10 items)
  {
    id: '7',
    title: 'Greek Yogurt with Berries',
    calories: 150,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '44',
    title: 'Hummus with Vegetable Sticks',
    calories: 165.3,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '45',
    title: 'Roasted Makhana',
    calories: 110.8,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '46',
    title: 'Sprouts Chaat',
    calories: 140.2,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '47',
    title: 'Baked Sweet Potato',
    calories: 180.5,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '48',
    title: 'Fruit Smoothie',
    calories: 170.6,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '49',
    title: 'Multigrain Dhokla',
    calories: 155.3,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '50',
    title: 'Oats and Nuts Energy Bar',
    calories: 190.2,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '51',
    title: 'Roasted Chickpeas',
    calories: 130.7,
    image: "placeholder-image.png",
    category: 'Snacks'
  },
  {
    id: '52',
    title: 'Vegetable Cutlet',
    calories: 175.4,
    image: "placeholder-image.png",
    category: 'Snacks'
  },

  // Dinner (10 items)
  {
    id: '8',
    title: 'Baked Salmon with Vegetables',
    calories: 380,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '53',
    title: 'Vegetable Soup with Multigrain Bread',
    calories: 260.5,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '54',
    title: 'Grilled Tofu with Quinoa',
    calories: 310.2,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '55',
    title: 'Roti with Mixed Vegetable Curry',
    calories: 290.7,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '56',
    title: 'Palak Paneer with Roti',
    calories: 340.3,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '57',
    title: 'Baked Chicken with Steamed Broccoli',
    calories: 350.8,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '58',
    title: 'Millet Dosa with Sambar',
    calories: 270.5,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '59',
    title: 'Egg Curry with Brown Rice',
    calories: 330.2,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '60',
    title: 'Vegetable Daliya',
    calories: 250.6,
    image: "placeholder-image.png",
    category: 'Dinner'
  },
  {
    id: '61',
    title: 'Mushroom and Spinach Stir Fry',
    calories: 280.3,
    image: "placeholder-image.png",
    category: 'Dinner'
  },

  // Bed time (10 items)
  {
    id: '9',
    title: 'Warm Milk with Turmeric',
    calories: 120,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '62',
    title: 'Chamomile Tea',
    calories: 5.2,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '63',
    title: 'Almond Milk',
    calories: 80.5,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '64',
    title: 'Banana Smoothie',
    calories: 150.3,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '65',
    title: 'Cinnamon and Honey Tea',
    calories: 45.6,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '66',
    title: 'Warm Water with Lemon',
    calories: 10.2,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '67',
    title: 'Peppermint Tea',
    calories: 4.8,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '68',
    title: 'Cottage Cheese with Honey',
    calories: 130.5,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '69',
    title: 'Lavender Tea',
    calories: 3.7,
    image: "placeholder-image.png",
    category: 'Bed time'
  },
  {
    id: '70',
    title: 'Nutmeg Milk',
    calories: 110.2,
    image: "placeholder-image.png",
    category: 'Bed time'
  }
];

const mealCategories = ['Early Morning', 'Breakfast', 'Mid Morning Snacks', 'Lunch', 'Snacks', 'Dinner', 'Bed time'];

export default function NutritionScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Early Morning');
  const [selectedMeals, setSelectedMeals] = useState({
    'Early Morning': '',
    'Breakfast': '',
    'Mid Morning Snacks': '',
    'Lunch': '',
    'Snacks': '',
    'Dinner': '',
    'Bed time': ''
  });
  const [customMeals, setCustomMeals] = useState({
    'Early Morning': '',
    'Breakfast': '',
    'Mid Morning Snacks': '',
    'Lunch': '',
    'Snacks': '',
    'Dinner': '',
    'Bed time': ''
  });
  const [customCalories, setCustomCalories] = useState({
    'Early Morning': 0,
    'Breakfast': 0,
    'Mid Morning Snacks': 0,
    'Lunch': 0,
    'Snacks': 0,
    'Dinner': 0,
    'Bed time': 0
  });
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [customMealName, setCustomMealName] = useState('');
  const [customMealCalories, setCustomMealCalories] = useState('');
  
  // Calculate total calories consumed
  const calculateTotalCalories = () => {
    let total = 0;
    Object.keys(selectedMeals).forEach(category => {
      if (selectedMeals[category]) {
        const meal = healthyMeals.find(m => m.id === selectedMeals[category]);
        if (meal) {
          total += meal.calories;
        }
      }
      // Add custom meal calories
      if (customMeals[category] && customCalories[category]) {
        total += customCalories[category];
      }
    });
    return total.toFixed(1);
  };
  
  // Handle meal selection
  const handleSelectMeal = (mealId) => {
    if (mealId === 'custom') {
      setShowMealSelector(false);
      setShowCustomInput(true);
    } else {
      setSelectedMeals({
        ...selectedMeals,
        [currentCategory]: mealId
      });
      // Clear custom meal for this category if a predefined meal is selected
      if (mealId !== '') {
        setCustomMeals({
          ...customMeals,
          [currentCategory]: ''
        });
        setCustomCalories({
          ...customCalories,
          [currentCategory]: 0
        });
      }
      setShowMealSelector(false);
    }
  };
  
  // Handle custom meal submission
  const handleCustomMealSubmit = () => {
    if (customMealName.trim() && customMealCalories.trim()) {
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
              <Text style={styles.customInputLabel}>Food Name:</Text>
              <TextInput
                style={styles.customInput}
                value={customMealName}
                onChangeText={setCustomMealName}
                placeholder="Enter food name"
                placeholderTextColor="#999"
              />
              
              <Text style={styles.customInputLabel}>Calories:</Text>
              <TextInput
                style={styles.customInput}
                value={customMealCalories}
                onChangeText={setCustomMealCalories}
                placeholder="Enter calories"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              
              <TouchableOpacity 
                style={styles.customSubmitButton}
                onPress={handleCustomMealSubmit}
              >
                <Text style={styles.customSubmitButtonText}>Add Food Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.mealsSection}>
        <Text style={styles.mealsTitle}>Healthy Meals To Try</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {mealCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.categoryButton, selectedCategory === category && styles.activeCategoryButton]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategoryText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.mealsGrid}>
          {healthyMeals
            .filter(meal => meal.category === selectedCategory)
            .map((meal) => (
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
  // Calorie Counter Styles
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
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
    fontSize: 18,
    color: '#666',
    marginLeft: 5,
  },
  mealSelectionTitle: {
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mealSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    flex: 2,
  },
  mealSelectorText: {
    color: '#999',
  },
  selectedMealText: {
    color: '#333',
    flex: 1,
    marginRight: 5,
  },
  // Modal Styles
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
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealListContainer: {
    maxHeight: '80%',
  },
  mealListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  // Custom Input Styles
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