import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { theme } from '../../styles/theme';
import { TextInput, Button, Text } from 'react-native-paper';
import { TextInput as RNPTextInput } from 'react-native-paper';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSignin = async () => {
    try {
      if (email?.trim().length==0) {
        showToast("Provide email", 'info');
        return;
      }
      if (password?.trim().length==0) {
        showToast("Provide password", 'info');
        return;
      }
      setIsLoading(true);
      await login(email, password);
      showToast('Logged In successfully!', 'info');
      router.replace('/');
    } catch (error) {
      console.error('Signin failed:', error);
      showToast('Invalid email or password. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          style={styles.input}
          right={<RNPTextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
        />
        <Button
          mode="contained"
          onPress={handleSignin}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Sign In
        </Button>
        <Button
          mode="text"
          onPress={() => router.push('/auth/signup')}
          style={styles.linkButton}
        >
          Don't have an account? Sign Up
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    marginBottom: theme.spacing.md,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  linkButton: {
    marginTop: theme.spacing.sm,
  },
});

