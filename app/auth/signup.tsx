import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { TextInput, Button, Text, HelperText, RadioButton } from 'react-native-paper';
import { TextInput as RNPTextInput } from 'react-native-paper';

const roles = [
  { label: 'User', value: 'user' },
  { label: 'Staff', value: 'staff' },
  { label: 'Manager', value: 'manager' },
  { label: 'Admin', value: 'admin' },
];

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuthContext();
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError('');
    try {
      setIsLoading(true);
      await signup(email, password, confirmPassword, role);
      router.replace('/');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
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
        <Text style={styles.title}>Create Account</Text>
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
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
          right={<RNPTextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
        />
        <Text style={styles.roleLabel}>Role:</Text>
        <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
          <View style={styles.roleContainer}>
            {roles.map((r, index) => (
              <View key={r.value} style={styles.radioItem}>
                <RadioButton value={r.value} />
                <Text>{r.label}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>
        {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}
        <Button
          mode="contained"
          onPress={handleSignup}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Sign Up
        </Button>
        <Button
          mode="text"
          onPress={() => router.push('/auth/signin')}
          style={styles.linkButton}
        >
          Already have an account? Sign In
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
  roleLabel: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  linkButton: {
    marginTop: theme.spacing.sm,
  },
});

