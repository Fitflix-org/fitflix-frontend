import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    smsUpdates: false,
    locationServices: true,
    dataSharing: false,
    autoPlay: true
  });

  const settingsSections = [
    {
      title: 'App Settings',
      items: [
        { id: 'darkMode', title: 'Dark Mode', icon: 'moon', type: 'toggle' },
        { id: 'autoPlay', title: 'Auto-play Videos', icon: 'play-circle', type: 'toggle' },
        { id: 'language', title: 'Language', icon: 'language', type: 'select', value: 'English' },
        { id: 'clearCache', title: 'Clear Cache', icon: 'trash', type: 'action' }
      ]
    },
    {
      title: 'Notifications',
      items: [
        { id: 'notifications', title: 'Push Notifications', icon: 'bell', type: 'toggle' },
        { id: 'emailUpdates', title: 'Email Updates', icon: 'envelope', type: 'toggle' },
        { id: 'smsUpdates', title: 'SMS Updates', icon: 'sms', type: 'toggle' }
      ]
    },
    {
      title: 'Privacy',
      items: [
        { id: 'locationServices', title: 'Location Services', icon: 'map-marker-alt', type: 'toggle' },
        { id: 'dataSharing', title: 'Data Sharing', icon: 'share-alt', type: 'toggle' },
        { id: 'privacyPolicy', title: 'Privacy Policy', icon: 'shield-alt', type: 'link' },
        { id: 'termsOfService', title: 'Terms of Service', icon: 'file-contract', type: 'link' }
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'changePassword', title: 'Change Password', icon: 'lock', type: 'link' },
        { id: 'deleteAccount', title: 'Delete Account', icon: 'user-times', type: 'action', danger: true }
      ]
    }
  ];

  const handleToggle = (id: string) => {
    setSettings({
      ...settings,
      [id]: !settings[id as keyof typeof settings]
    });
  };

  const handleAction = (id: string) => {
    switch (id) {
      case 'clearCache':
        Alert.alert(
          'Clear Cache',
          'Are you sure you want to clear the app cache?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Success', 'Cache cleared successfully') }
          ]
        );
        break;
      case 'deleteAccount':
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted') }
          ]
        );
        break;
      default:
        break;
    }
  };

  const handleLink = (id: string) => {
    // Navigate to respective screens
    switch (id) {
      case 'privacyPolicy':
        Alert.alert('Navigation', 'Navigating to Privacy Policy');
        break;
      case 'termsOfService':
        Alert.alert('Navigation', 'Navigating to Terms of Service');
        break;
      case 'changePassword':
        Alert.alert('Navigation', 'Navigating to Change Password');
        break;
      case 'language':
        Alert.alert('Language Selection', 'Choose your preferred language');
        break;
      default:
        break;
    }
  };

  const renderSettingItem = (item: any) => {
    return (
      <TouchableOpacity 
        key={item.id} 
        style={[styles.settingItem, item.danger && styles.dangerItem]}
        onPress={() => {
          if (item.type === 'action') {
            handleAction(item.id);
          } else if (item.type === 'link' || item.type === 'select') {
            handleLink(item.id);
          }
        }}
      >
        <View style={[styles.iconContainer, item.danger && styles.dangerIcon]}>
          <FontAwesome5 name={item.icon} size={18} color={item.danger ? '#f44336' : '#FFD700'} />
        </View>
        
        <Text style={[styles.settingTitle, item.danger && styles.dangerText]}>{item.title}</Text>
        
        {item.type === 'toggle' && (
          <Switch
            value={settings[item.id as keyof typeof settings]}
            onValueChange={() => handleToggle(item.id)}
            trackColor={{ false: '#d0d0d0', true: '#4CAF50' }}
            thumbColor={settings[item.id as keyof typeof settings] ? '#fff' : '#f4f3f4'}
          />
        )}
        
        {item.type === 'select' && (
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{item.value}</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#999" />
          </View>
        )}
        
        {item.type === 'link' && (
          <FontAwesome5 name="chevron-right" size={14} color="#999" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView}>
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(item => renderSettingItem(item))}
            </View>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>FitFlix v1.0.0</Text>
          <Text style={styles.copyright}>© 2023 FitFlix. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  section: {
    marginBottom: 20,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#f9f9f9',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dangerIcon: {
    backgroundColor: '#ffebee',
    borderColor: '#ffcdd2',
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dangerText: {
    color: '#f44336',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 14,
    color: '#999',
    marginRight: 5,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#bbb',
  },
});

export default SettingsScreen;