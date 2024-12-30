import React, { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { useAuthContext } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '../styles/theme';

const Index = () => {
  const { user, isLoading } = useAuthContext();
  console.log("user form authContext: ", user)
  useEffect(() => {
    console.log("User state changed:", user);  // To confirm the user state update
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth/signin" />;
  }

  return <Redirect href="/menu" />;
}

export default Index;

