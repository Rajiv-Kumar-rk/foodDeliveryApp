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
    </Stack>
  );
}

