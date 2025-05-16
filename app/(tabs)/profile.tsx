import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type ProfileOption = {
  name: string;
  icon: string;
  description: string;
};

const profileOptions: ProfileOption[] = [
  {
    name: 'Personal Info',
    icon: 'user-circle',
    description: 'Update your profile details'
  },
  {
    name: 'Goals',
    icon: 'bullseye',
    description: 'Set and track your fitness goals'
  },
  {
    name: 'Progress',
    icon: 'chart-bar',
    description: 'View your fitness journey'
  },
  {
    name: 'Settings',
    icon: 'cog',
    description: 'App preferences and notifications'
  }
];

function ProfileOptionCard({ option }: { option: ProfileOption }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={option.icon} size={24} color="#666" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{option.name}</Text>
        <Text style={styles.cardDescription}>{option.description}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color="#666" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-circle" size={80} color="#666" />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>
      <View style={styles.optionsContainer}>
        {profileOptions.map((option, index) => (
          <ProfileOptionCard key={index} option={option} />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
});