import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs 
      initialRouteName='menu'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'order') {
            iconName = focused ? 'time' : 'time-outline';
          } else {
            iconName = 'alert-circle'; // Default icon
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false
      })}
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu1',
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order History',
        }}
      />
    </Tabs>
  );
}

