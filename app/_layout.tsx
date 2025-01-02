import { Stack } from "expo-router";
import { PaperProvider } from 'react-native-paper';
import { theme } from '../styles/theme';
import { AuthProvider } from "../contexts/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "../contexts/ToastContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </AuthProvider>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

