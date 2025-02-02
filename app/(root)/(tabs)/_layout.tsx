import { Tabs } from 'expo-router';
import { Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

export default function TabLayout() {
  const { state } = useCart();
  // Count unique items instead of total quantity
  const uniqueItemsCount = state.items.length;

  // Hide the entire tab bar on web platform
  if (Platform.select({ web: true, default: false })) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            href: '/',
          }}
        />
      </Tabs>
    );
  }

  // Show full tab bar on mobile
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerShown: Platform.OS !== 'web',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="cart-outline" size={size} color={color} />
              {uniqueItemsCount > 0 && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -3,
                  backgroundColor: '#FF3B30',
                  borderRadius: 8,
                  minWidth: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingHorizontal: 4,
                  }}>
                    {uniqueItemsCount > 99 ? '99+' : uniqueItemsCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
