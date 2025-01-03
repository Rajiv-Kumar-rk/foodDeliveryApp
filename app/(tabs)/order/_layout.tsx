import { Stack } from 'expo-router';

export default function OrderHistoryLayout() {
  return (
    <Stack
    initialRouteName='index'
    screenOptions={() => ({
      headerShown: false,
    })}>
      <Stack.Screen name="index" options={{ title: 'Order History' }} />
      <Stack.Screen name="details" options={{ title: 'Order Details' }} />
    </Stack>
  );
}

