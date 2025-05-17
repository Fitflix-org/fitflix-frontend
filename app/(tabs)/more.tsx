import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const userProfile = {
  name: 'srujan',
  email: 'pandirivenkatdillu@gmail.com'
};

const menuItems = [
  { id: '1', title: 'Notification', icon: 'bell' },
  { id: '2', title: 'Chat with us', icon: 'comment' },
  { id: '3', title: 'Subscription', icon: 'crown' },
  { id: '4', title: 'BCA Test', icon: 'dumbbell', isNew: true },
  { id: '5', title: 'Fitness Profile', icon: 'user-alt' },
  { id: '6', title: 'Fitness Calculator', icon: 'calculator' },
  { id: '7', title: 'Transactions', icon: 'receipt' },
  { id: '8', title: 'Term & Condition', icon: 'file-contract' }
];

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user" size={30} color="#666" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <FontAwesome5 name="edit" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={item.icon} size={20} color="#FFD700" />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            {item.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>New</Text></View>}
            <FontAwesome5 name="chevron-right" size={16} color="#FFD700" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome5 name="sign-out-alt" size={20} color="#111827" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 14,
    color: '#333333',
  },
  editButton: {
    padding: 10,
  },
  newBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 10,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',

  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
});