import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import SearchBar from "../components/SearchBar";

interface SharedHeaderProps {
  userName: string;
}

export default function SharedHeader({ userName }: SharedHeaderProps) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Hi, {userName}</Text>
          <Text style={styles.subGreeting}>Are you hungry?</Text>
        </View>
        {/* <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.profileImage}
        /> */}
        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => router.push('/search')}>
        <SearchBar
          value=""
          onChangeText={() => {}}
          placeholder="Search for food..."
          editableSearch={false}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary, //theme.colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartIconContainer: {
    padding: theme.spacing.sm,
  },
});

