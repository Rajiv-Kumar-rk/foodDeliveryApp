import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'order') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'alert-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.primary,
        },
        headerShown: false
      })}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order History',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

