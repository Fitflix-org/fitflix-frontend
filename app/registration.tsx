import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RegistrationState = 'onboarding' | 'form';

type FormStep = {
  id: number;
  title: string;
};

const formSteps: FormStep[] = [
  { id: 1, title: 'User Type' },
  { id: 2, title: 'Mobile' },
  { id: 3, title: 'Personal Details' },
  { id: 4, title: 'Goals' },
  { id: 5, title: 'Age' },
  { id: 6, title: 'Weight' },
  { id: 7, title: 'Target Weight' },
  { id: 8, title: 'Medical Conditions' },
  { id: 9, title: 'Address' },
  { id: 10, title: 'Language' },
  { id: 11, title: 'Subscription' },
];

const medicalConditions = [
  { id: 'none', title: 'None' },
  { id: 'diabetes', title: 'Diabetes' },
  { id: 'pre_diabetes', title: 'Pre-Diabetes' },
  { id: 'cholesterol', title: 'Cholesterol' },
  { id: 'hypertension', title: 'Hypertension' },
  { id: 'pcos', title: 'PCOS' },
  { id: 'thyroid', title: 'Thyroid' },
  { id: 'physical_injury', title: 'Physical Injury' },
  { id: 'stress_anxiety', title: 'Excessive stress/anxiety' },
  { id: 'sleep_issues', title: 'Sleep issues' },
  { id: 'depression', title: 'Depression' },
  { id: 'anger_issues', title: 'Anger issues' },
  { id: 'loneliness', title: 'Loneliness' },
  { id: 'relationship_stress', title: 'Relationship stress' },
];

const subscriptionPlans = [
  { id: 'monthly', title: '1 Month', price: 499, original: 499 },
  { id: 'yearly', title: '12 Months', price: 158, original: 5988, savings: '68%' },
];

const subscriptionFeatures = [
  { id: 'macro_micro', title: 'Macro & Micro Nutrient Analysis', description: 'Ensure you\'re getting the nutrients you need to stay active and healthy.' },
  { id: 'snap_tracking', title: 'Snap - Photo-based Meal Tracking', description: 'Snap and track your meal and get instant AI-powered insights.' },
  { id: 'meal_insights', title: 'Detailed Meal Insights & Reports', description: 'Know your eating habits, whether it\'s in the office cafeteria or home.' },
  { id: 'ai_coach', title: 'Access to AI Coach Ria', description: 'Get tailored advice that fits into your busy schedule.' },
  { id: 'recipes', title: 'Access Healthy Recipes', description: 'Discover easy, recipes perfect for cooking at home.' },
  { id: 'macro_budget', title: 'Edit Macronutrient Budgets', description: 'Customise your diet to suit your daily lifestyle and routine.' },
  { id: 'calorie_budget', title: 'Edit Calorie Budgets', description: 'Manage your calories to keep your energy levels up for all your activities.' },
];

const goals = [
  { id: 'coach_guidance', title: 'COACH GUIDANCE', icon: 'user-friends' },
  { id: 'snap', title: 'SNAP', icon: 'camera' },
  { id: 'diet_plan', title: 'DIET PLAN', icon: 'utensils' },
  { id: 'weight_loss', title: 'WEIGHT LOSS', icon: 'weight' },
  { id: 'glp_1', title: 'GLP-1', icon: 'pills' },
  { id: 'intermittent_fasting', title: 'INTERMITTENT FASTING', icon: 'clock' },
  { id: 'count_calories', title: 'COUNT CALORIES', icon: 'calculator' },
  { id: 'muscle_gain', title: 'MUSCLE GAIN', icon: 'dumbbell' },
  { id: 'workout_yoga', title: 'WORKOUT and YOGA', icon: 'running' },
  { id: 'healthy_foods', title: 'HEALTHY FOODS', icon: 'apple-alt' },
];

const cities = [
  { id: 'bengaluru', name: 'Bengaluru', icon: require('../assets/images/city-icons/bengaluru.svg') },
  { id: 'mumbai', name: 'Mumbai', icon: require('../assets/images/city-icons/mumbai.svg') },
  { id: 'delhi', name: 'New Delhi', icon: require('../assets/images/city-icons/delhi.svg') },
  { id: 'kolkata', name: 'Kolkata', icon: require('../assets/images/city-icons/kolkata.svg') },
  { id: 'chennai', name: 'Chennai', icon: require('../assets/images/city-icons/chennai.svg') },
  { id: 'hyderabad', name: 'Hyderabad', icon: require('../assets/images/city-icons/hyderabad.svg') },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: require('../assets/images/city-icons/ahmedabad.svg') },
  { id: 'pune', name: 'Pune', icon: require('../assets/images/city-icons/pune.svg') },
  { id: 'lucknow', name: 'Lucknow', icon: require('../assets/images/city-icons/lucknow.svg') },
  { id: 'jaipur', name: 'Jaipur', icon: require('../assets/images/city-icons/jaipur.svg') },
  { id: 'kanpur', name: 'Kanpur', icon: require('../assets/images/city-icons/kanpur.svg') },
  { id: 'surat', name: 'Surat', icon: require('../assets/images/city-icons/surat.svg') },
];

const languages = [
  { id: 'hindi', name: 'Hindi', native: '\u0939\u093f\u0928\u094d\u0926\u0940' },
  { id: 'english', name: 'English', native: 'English' },
  { id: 'tamil', name: 'Tamil', native: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd' },
  { id: 'telugu', name: 'Telugu', native: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41' },
  { id: 'kannada', name: 'Kannada', native: '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1' },
  { id: 'malayalam', name: 'Malayalam', native: '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02' },
  { id: 'gujarati', name: 'Gujarati', native: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0' },
  { id: 'bengali', name: 'Bengali', native: '\u09ac\u09be\u0982\u09b2\u09be' },
  { id: 'marathi', name: 'Marathi', native: '\u092e\u0930\u093e\u0920\u0940' },
  { id: 'other', name: 'Other', native: 'Other' },
];

export default function Registration() {
  // ... existing code ...
  const [currentStep, setCurrentStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({
    userType: '',
    mobile: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    goals: [],
    age: '',
    currentWeight: '',
    targetWeight: '',
    medicalConditions: [],
    subscription: null,
    showSubscription: true,
  });

  const progress = (currentStep / formSteps.length) * 100;

  const handleSkip = () => {
    if (currentStep <= 2) {
      return; // Disable skip until after mobile number entry
    }
    router.replace('/home');
  };

  const handleNext = () => {
    if (currentStep < formSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form and navigate to home
      router.replace('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderUserTypeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Already a customer?</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.optionButton, formData.userType === 'existing' && styles.selectedButton]}
          onPress={() => {
            setFormData({ ...formData, userType: 'existing' });
            router.push('/auth/login');
          }}
        >
          <Text style={styles.optionButtonText}>Yes, Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, formData.userType === 'new' && styles.selectedButton]}
          onPress={() => {
            setFormData({ ...formData, userType: 'new' });
            handleNext();
          }}
        >
          <Text style={styles.optionButtonText}>No, Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMobileStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Enter your mobile number</Text>
      <TextInput
        style={styles.input}
        value={formData.mobile}
        onChangeText={(text) => setFormData({ ...formData, mobile: text })}
        keyboardType="phone-pad"
        placeholder="Mobile number"
      />
    </View>
  );

  const renderPersonalDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Tell us about yourself</Text>
      <TextInput
        style={styles.input}
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
        placeholder="Date of Birth (DD/MM/YYYY)"
      />
    </View>
  );

  const renderGoalsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What's your main goal?</Text>
      <View style={styles.goalsGrid}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[styles.goalCard, formData.goals.includes(goal.id) && styles.selectedGoalCard]}
            onPress={() => {
              const updatedGoals = formData.goals.includes(goal.id)
                ? formData.goals.filter(g => g !== goal.id)
                : [...formData.goals, goal.id];
              setFormData({ ...formData, goals: updatedGoals });
            }}
          >
            <FontAwesome5 name={goal.icon} size={24} color="#333" />
            <Text style={styles.goalText}>{goal.title}</Text>
            <View style={styles.checkbox}>
              {formData.goals.includes(goal.id) && (
                <FontAwesome5 name="check" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        ))}
    </View>
    </View>
  );

  const renderAgeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What's your Age?</Text>
      <Text style={styles.subtitle}>Your age determines how much you should consume.</Text>
      <View style={[styles.ageInputContainer, { marginTop: 20 }]}>
        <TextInput
          style={[styles.ageInput, { height: 50, fontSize: 18, paddingHorizontal: 15 }]}
          value={formData.age}
          onChangeText={(text) => setFormData({ ...formData, age: text })}
          keyboardType="numeric"
          placeholder="20"
          placeholderTextColor="#ADB5BD"
        />
        <Text style={[styles.ageUnit, { marginLeft: 10 }]}>Years</Text>
      </View>
    </View>
  );

  const renderWeightStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What's your current weight?</Text>
      <View style={[styles.weightInputContainer, { marginTop: 20 }]}>
        <TextInput
          style={[styles.weightInput, { height: 50, fontSize: 18, paddingHorizontal: 15 }]}
          value={formData.currentWeight}
          onChangeText={(text) => setFormData({ ...formData, currentWeight: text })}
          keyboardType="numeric"
          placeholder="65"
          placeholderTextColor="#ADB5BD"
        />
        <Text style={[styles.weightUnit, { marginLeft: 10 }]}>kg</Text>
      </View>
    </View>
  );

  const renderAddressStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Where are you from?</Text>
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={20} color="#ADB5BD" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search city"
          placeholderTextColor="#ADB5BD"
        />
      </View>
      <View style={styles.citiesGrid}>
        {cities.map((city) => (
          <TouchableOpacity
            key={city.id}
            style={[styles.cityCard, formData.city === city.id && styles.selectedCityCard]}
            onPress={() => setFormData({ ...formData, city: city.id })}
          >
            <Image source={city.icon} style={styles.cityIcon} />
            <Text style={[styles.cityName, formData.city === city.id && styles.selectedCityName]}>
              {city.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
    </View>
  );

  const renderLanguageStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Which language do you prefer?</Text>
      <View style={styles.languageGrid}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[styles.languageCard, formData.language === lang.id && styles.selectedLanguageCard]}
            onPress={() => setFormData({ ...formData, language: lang.id })}
          >
            <Text style={[styles.languageName, formData.language === lang.id && styles.selectedLanguageName]}>
              {lang.name}
            </Text>
            <Text style={[styles.languageNative, formData.language === lang.id && styles.selectedLanguageNative]}>
              {lang.native}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );


  const renderTargetWeightStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What's your target weight?</Text>
      <Text style={styles.subtitle}>Set a realistic weight goal for yourself.</Text>
      <Text style={styles.infoText}>
        Based on your BMI of <Text style={styles.infoValue}>{calculateBMI()}</Text>, your Ideal Weight range is <Text style={styles.infoValue}>{calculateIdealWeight()}</Text>
      </Text>
      <View style={[styles.weightInputContainer, { marginTop: 20 }]}>
        <TextInput
          style={[styles.weightInput, { height: 50, fontSize: 18, paddingHorizontal: 15 }]}
          value={formData.targetWeight}
          onChangeText={(text) => setFormData({ ...formData, targetWeight: text })}
          keyboardType="numeric"
          placeholder="60"
          placeholderTextColor="#ADB5BD"
        />
        <Text style={[styles.weightUnit, { marginLeft: 10 }]}>kg</Text>
      </View>
    </View>
  );

  const renderMedicalConditionsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Any Medical Condition we should be aware of?</Text>
      <View style={styles.conditionsGrid}>
        {medicalConditions.map((condition) => (
          <TouchableOpacity
            key={condition.id}
            style={[styles.conditionCard, formData.medicalConditions.includes(condition.id) && styles.selectedConditionCard]}
            onPress={() => {
              const updatedConditions = formData.medicalConditions.includes(condition.id)
                ? formData.medicalConditions.filter(c => c !== condition.id)
                : [...formData.medicalConditions, condition.id];
              setFormData({ ...formData, medicalConditions: updatedConditions });
            }}
          >
            <Text style={[styles.conditionText, formData.medicalConditions.includes(condition.id) && styles.selectedConditionText]}>
              {condition.title}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
    </View>
  );

  const renderSubscriptionStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Healthify+</Text>
      <Text style={styles.offerBadge}>Limited Time Offer!</Text>
      
      <View style={styles.plansContainer}>
        {subscriptionPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planCard, formData.subscription === plan.id && styles.selectedPlanCard]}
            onPress={() => setFormData({ ...formData, subscription: plan.id })}
          >
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planPrice}>₹{plan.price} /mo</Text>
            {plan.savings && <Text style={styles.savingsTag}>Save {plan.savings}</Text>}
            <Text style={styles.originalPrice}>₹{plan.original}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.featuresTitle}>Why People Love Healthify+</Text>
      <ScrollView style={styles.featuresContainer}>
        {subscriptionFeatures.map((feature) => (
          <View key={feature.id} style={styles.featureItem}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.subscriptionActions}>
        <TouchableOpacity
          style={styles.skipSubscriptionButton}
          onPress={() => {
            setFormData({ ...formData, showSubscription: false });
            handleSkip();
          }}
        >
          <Text style={styles.skipSubscriptionText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateBMI = () => {
    const weight = parseFloat(formData.currentWeight);
    const height = 1.7; // Default height for now
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return 'N/A';
  };

  const calculateIdealWeight = () => {
    return '0.0-0.0 kg'; // Placeholder calculation
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderUserTypeStep();
      case 2:
        return renderMobileStep();
      case 3:
        return renderPersonalDetailsStep();
      case 4:
        return renderGoalsStep();
      case 5:
        return renderAgeStep();
      case 6:
        return renderWeightStep();
      case 7:
        return renderTargetWeightStep();
      case 8:
        return renderMedicalConditionsStep();
      case 9:
        return renderAddressStep();
      case 10:
        return renderLanguageStep();
      case 11:
        return formData.showSubscription ? renderSubscriptionStep() : null;
      default:
        return null;
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.stepTitle}>{formSteps[currentStep - 1].title}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.stepContainer}>
          {renderCurrentStep()}
        </ScrollView>

        <View style={styles.navigationBar}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <FontAwesome5 name="arrow-left" size={20} color="#212529" />
            </TouchableOpacity>
          )}

          {currentStep > 2 && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === formSteps.length ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  infoValue: {
    fontWeight: '600',
    color: '#007AFF',
  },
  stepContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40, // Add top padding
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  ageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ageInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  ageUnit: {
    fontSize: 16,
    color: '#495057',
  },
  weightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  weightInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  weightUnit: {
    fontSize: 16,
    color: '#495057',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stepContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28A745',
    borderRadius: 3,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    marginTop: 8,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#212529',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  optionButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedButton: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  backButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    height: 48,
    paddingHorizontal: 32,
    backgroundColor: '#28A745',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  skipButton: {
    height: 48,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C757D',
  },
  // Goals styles
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  goalCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedGoalCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginTop: 12,
    textAlign: 'center',
  },
  selectedGoalTitle: {
    color: '#28A745',
  },
  // Input styles
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
    marginTop: 32,
  },
  largeInput: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    flex: 1,
    textAlign: 'center',
  },
  inputUnit: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6C757D',
    marginLeft: 16,
  },
  // City styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#212529',
  },
  citiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cityCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedCityCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  cityIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cityName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  selectedCityName: {
    color: '#28A745',
  },
  // Language styles
  languageGrid: {
    width: '100%',
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedLanguageCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  selectedLanguageName: {
    color: '#28A745',
  },
  languageNative: {
    fontSize: 14,
    color: '#6C757D',
  },
  selectedLanguageNative: {
    color: '#28A745',
  },
  // Medical conditions styles
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  conditionCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedConditionCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
    textAlign: 'center',
  },
  selectedConditionText: {
    color: '#28A745',
    fontWeight: '600',
  },
  // Subscription styles
  offerBadge: {
    backgroundColor: '#FFE5E5',
    color: '#DC3545',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  planCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  selectedPlanCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#28A745',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28A745',
    marginBottom: 4,
  },
  savingsTag: {
    backgroundColor: '#E8F5E9',
    color: '#28A745',
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6C757D',
    textDecorationLine: 'line-through',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
});