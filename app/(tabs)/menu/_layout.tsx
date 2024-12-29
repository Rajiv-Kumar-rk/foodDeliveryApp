import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function MenuLayout() {
  return (
    <Stack
    initialRouteName='index'
    screenOptions={() => ({
      headerShown: false,
    })}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="item-details" 
        options={{
          headerTitle: 'Item Details',
          // headerBackTitle: ' ',
          // headerRight: () => (
          //   <Ionicons name="heart-outline" size={24} color="#000" style={{ marginRight: 16 }} />
          // ),
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="place-order" options={{ title: 'Place Order' }} /> */}
    </Stack>
  );
}

