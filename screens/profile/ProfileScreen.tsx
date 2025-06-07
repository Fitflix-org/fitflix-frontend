import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'srujan',
    email: 'pandirivenkatdillu@gmail.com',
    phone: '+1 123-456-7890',
    gender: 'Male',
    height: '5\'10"',
    weight: '75 kg',
    age: '28'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...userProfile});

  const profileMenuItems = [
    { id: '1', title: 'Fitness Goals', icon: 'bullseye' },
    { id: '2', title: 'Workout History', icon: 'history' },
    { id: '3', title: 'Subscription', icon: 'crown' },
    { id: '4', title: 'BCA Test Results', icon: 'dumbbell' },
    { id: '5', title: 'Fitness Calculator', icon: 'calculator' },
    { id: '6', title: 'Transactions', icon: 'receipt' },
    { id: '7', title: 'Notifications', icon: 'bell' },
    { id: '8', title: 'Privacy Settings', icon: 'shield-alt' }
  ];

  const handleSaveProfile = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleCancel = () => {
    setEditedProfile({...userProfile});
    setIsEditing(false);
  };

  const renderProfileInfo = () => {
    if (isEditing) {
      return (
        <View style={styles.editForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.name}
              onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.email}
              onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.gender}
              onChangeText={(text) => setEditedProfile({...editedProfile, gender: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.height}
              onChangeText={(text) => setEditedProfile({...editedProfile, height: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.weight}
              onChangeText={(text) => setEditedProfile({...editedProfile, weight: text})}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.age}
              onChangeText={(text) => setEditedProfile({...editedProfile, age: text})}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    return (
      <View style={styles.profileDetails}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Name:</Text>
          <Text style={styles.profileValue}>{userProfile.name}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{userProfile.email}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Phone:</Text>
          <Text style={styles.profileValue}>{userProfile.phone}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Gender:</Text>
          <Text style={styles.profileValue}>{userProfile.gender}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Height:</Text>
          <Text style={styles.profileValue}>{userProfile.height}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Weight:</Text>
          <Text style={styles.profileValue}>{userProfile.weight}</Text>
        </View>
        
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Age:</Text>
          <Text style={styles.profileValue}>{userProfile.age}</Text>
        </View>
        
        <TouchableOpacity style={styles.editProfileButton} onPress={() => setIsEditing(true)}>
          <FontAwesome5 name="edit" size={16} color="#fff" />
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user" size={40} color="#666" />
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          
          {renderProfileInfo()}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>
          {profileMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={item.icon} size={20} color="#FFD700" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <FontAwesome5 name="chevron-right" size={16} color="#FFD700" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  changePhotoButton: {
    marginTop: 10,
  },
  changePhotoText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  profileDetails: {
    width: '100%',
    marginTop: 20,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  editForm: {
    width: '100%',
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  menuSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
    marginHorizontal: 20,
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

export default ProfileScreen;