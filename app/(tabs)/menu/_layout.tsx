import { Stack } from 'expo-router';

export default function MenuListingAndOrderPlacingLayout() {
  console.log("menu listing");
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Hi, hungry?' }} />
      <Stack.Screen name="place-order" options={{ title: 'Order Details' }} />
    </Stack>
  );
}

