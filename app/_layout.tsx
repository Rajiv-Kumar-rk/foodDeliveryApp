import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { theme } from '../styles/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}

