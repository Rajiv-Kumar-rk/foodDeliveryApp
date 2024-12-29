import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../styles/theme';
import useCustomHeader from '../../../hooks/useCustomHeader';

type actionButtonProps = {
  icon : string;
  label : string;
  onPress : () => void;
};

const ActionButton = ({ icon, label, onPress }: actionButtonProps) => (
  <Button
    mode="outlined"
    icon={() => <Ionicons name={icon} size={24} color={theme.colors.primary} />}
    onPress={onPress}
    style={styles.actionButton}
    labelStyle={styles.actionButtonLabel}
  >
    {label}
  </Button>
);

export default function ProfileScreen() {
  const pathname = usePathname();
    console.log("profile screen> path name: ", pathname);
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    alert('Logged out');
  };

  useCustomHeader({title: "Profile", showBackButton: false, onBackPress: null, showCartButton: false, onCartPress: ()=>router.push('/cart'), customHeaderOptions: {}});

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <View style={styles.actionButtons}>
          <View style={styles.actionRow}>
            <ActionButton
              icon="person-outline"
              label="Edit Profile"
              onPress={() => alert('Edit Profile')}
            />
            <ActionButton
              icon="time-outline"
              label="Order History"
              onPress={() => router.push('/order')}
            />
          </View>
          <View style={styles.actionRow}>
            <ActionButton
              icon="heart-outline"
              label="Favorites"
              onPress={() => router.push('/favorites')}
            />
            <ActionButton
              icon="log-out-outline"
              label="Logout"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    // backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  actionButtons: {
    padding: theme.spacing.lg,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    borderColor: theme.colors.primary,
  },
  actionButtonLabel: {
    color: theme.colors.primary,
  },
});

