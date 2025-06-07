import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import AuthGuard from '../../navigation/AuthGuard';

/**
 * Function to get icon for tab bar
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={22} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Tabs layout component
 * 
 * This component defines the tab bar layout for the main app screens
 * and wraps them with AuthGuard to prevent unauthenticated users from accessing them
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarInactiveTintColor: '#9E9E9E',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F5F5F5',
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
          },
          headerShown: false,
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
            tabBarIcon: ({ color }) => <TabBarIcon name="chart-bar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="fitty"
          options={{
            title: 'FITTY',
            tabBarIcon: ({ color }) => (
              <TabBarIcon
                name="dumbbell"
                color="#FFFFFF"
                style={{
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  borderRadius: 50,
                  padding: 10,
                  marginBottom: -10,
                  marginTop: -10,
                }}
              />
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
            tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
