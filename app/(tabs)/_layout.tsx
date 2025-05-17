import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome5 size={props.size || 24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { 
          backgroundColor: '#111827',
          borderTopColor: '#FFD700',
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: '600',
          marginTop: -5,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <TabBarIcon name="chart-line" color={color} />,
        }}
      />
      <Tabs.Screen
        name="fitty"
        options={{
          title: 'FITTY',
          tabBarIcon: ({ color }) => (
            <View style={styles.centerButton}>
              <TabBarIcon name="robot" color="#111827" size={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Reward',
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <TabBarIcon name="ellipsis-h" color={color} />,
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#111827',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },});
