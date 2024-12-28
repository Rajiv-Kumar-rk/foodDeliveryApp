import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../../mockData';
import { theme } from '../../../styles/theme';
import CustomHeader from '../../../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ItemDetailsScreen() {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const item = mockMenuItems.find(i => i._id === itemId);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesList = JSON.parse(favorites);
        setIsFavorite(favoritesList.includes(itemId));
      }
    };
    checkFavoriteStatus();
  }, [itemId]);

  if (!item) {
    return <Text style={styles.errorText}>Item not found</Text>;
  }

  const toggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesList = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favoritesList = favoritesList.filter(id => id !== itemId);
    } else {
      favoritesList.push(itemId);
    }
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
    setIsFavorite(!isFavorite);
  };

  const addToOrder = () => {
    // Here you would typically update your order state or send to an API
    alert(`Added ${quantity} ${item.name}(s) to your order!`);
  };

  const placeOrder = () => {
    router.push({ pathname: '/menu/place-order', params: { order: JSON.stringify([{...item, quantity}]) } });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={item.name} />
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? theme.colors.error : theme.colors.primary} 
            />
          </TouchableOpacity>
        </View>
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
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained"
            onPress={addToOrder}
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
          >
            Add to Order
          </Button>
          <Button 
            mode="contained"
            onPress={placeOrder}
            style={styles.orderButton}
            labelStyle={styles.buttonLabel}
          >
            Place Order
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  favoriteButton: {
    padding: theme.spacing.sm,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    flex: 1,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  orderButton: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    backgroundColor: theme.colors.primaryVariant,
  },
  buttonLabel: {
    color: theme.colors.onPrimary,
  },
  errorText: {
    fontSize: 18,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

