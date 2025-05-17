import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, srujan</Text>
        <Text style={styles.subGreeting}>How are you doing today?</Text>
      </View>

      <View style={styles.weightSection}>
        <View style={styles.weightInfo}>
          <View>
            <Text style={styles.weightLabel}>Current</Text>
            <Text style={styles.weightValue}>75<Text style={styles.weightUnit}> kg</Text></Text>
          </View>
          <View style={styles.weightDivider} />
          <View>
            <Text style={styles.weightLabel}>Target</Text>
            <Text style={styles.weightValue}>-<Text style={styles.weightUnit}> kg</Text></Text>
          </View>
        </View>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>Last 90 Days</Text>
          <FontAwesome5 name="chevron-down" size={12} color="#666" />
        </TouchableOpacity>
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Data For This Period</Text>
        </View>
      </View>

      <View style={styles.bmiSection}>
        <Text style={styles.sectionTitle}>Your BMI</Text>
        <View style={styles.bmiMeter}>
          <Text style={styles.bmiValue}>23.70</Text>
          <Text style={styles.bmiStatus}>Healthy</Text>
        </View>
        <View style={styles.bmiCategories}>
          <View style={styles.bmiCategory}>
            <View style={[styles.categoryDot, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.categoryTitle}>Under Weight</Text>
            <Text style={styles.categoryRange}>Less than 18.5</Text>
          </View>
          <View style={styles.bmiCategory}>
            <View style={[styles.categoryDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.categoryTitle}>Healthy</Text>
            <Text style={styles.categoryRange}>18.5 - 24.9</Text>
          </View>
          <View style={styles.bmiCategory}>
            <View style={[styles.categoryDot, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.categoryTitle}>Over Weight</Text>
            <Text style={styles.categoryRange}>25.0 - 29.9</Text>
          </View>
          <View style={styles.bmiCategory}>
            <View style={[styles.categoryDot, { backgroundColor: '#f44336' }]} />
            <Text style={styles.categoryTitle}>Obese</Text>
            <Text style={styles.categoryRange}>30.0 or higher</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="fire" size={20} color="#000" />
          </View>
          <Text style={styles.sectionTitle}>Calories Burnt</Text>
          <TouchableOpacity style={styles.periodSelector}>
            <Text style={styles.periodText}>Last 90 Days</Text>
            <FontAwesome5 name="chevron-down" size={12} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.noDataText}>No Calories Stats Yet</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="coins" size={20} color="#000" />
          </View>
          <Text style={styles.sectionTitle}>Coins Earned</Text>
          <TouchableOpacity style={styles.periodSelector}>
            <Text style={styles.periodText}>Last 30 Days</Text>
            <FontAwesome5 name="chevron-down" size={12} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#000' }]} />
            <Text style={styles.legendText}>Credit</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#dc2626' }]} />
            <Text style={styles.legendText}>Debit</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#dc2626',
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
  weightSection: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
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
    color: '#000',
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
  noDataContainer: {
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  bmiSection: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  bmiMeter: {
    alignItems: 'center',
    marginVertical: 20,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  bmiStatus: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  bmiCategories: {
    marginTop: 20,
  },
  bmiCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  categoryRange: {
    fontSize: 14,
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});