import { Stack } from 'expo-router';

export default function FavLayout() {
  return (
    <Stack
    initialRouteName='index'
    screenOptions={() => ({
      headerShown: false,
    })}>
      <Stack.Screen name="index" options={{ title: 'Favorites' }} />
    </Stack>
  );
}

