import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

interface CustomHeaderProps {
  title: string;
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const showBackButton = pathname !== '/menu' && pathname !== '/menu/place-order' && pathname !== '/order' && 
                         pathname !== '/favorites' && pathname !== '/profile';

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
});

