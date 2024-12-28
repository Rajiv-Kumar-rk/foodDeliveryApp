import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../../mockData';
import { theme } from '../../../styles/theme';

export default function ItemDetailsScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const item = mockMenuItems.find(i => i._id === itemId);
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <Text style={styles.errorText}>Item not found</Text>;
  }

  const addToOrder = () => {
    // Here you would typically update your order state or send to an API
    alert(`Added ${quantity} ${item.name}(s) to your order!`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Ionicons name="remove-circle-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <Button 
        mode="contained"
        onPress={addToOrder}
        style={styles.addButton}
        labelStyle={styles.addButtonLabel}
      >
        Add to Order
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
  },
  addButtonLabel: {
    color: theme.colors.onPrimary,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

