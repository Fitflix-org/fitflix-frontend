import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FittyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.chatbotContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="robot" size={40} color="#FFD700" />
        </View>
        <Text style={styles.title}>FITTY</Text>
        <Text style={styles.subtitle}>Your AI Fitness Assistant</Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Conversation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatbotContainer: {
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#1a1a1a',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 30,
    opacity: 0.8,
  },
  startButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
});