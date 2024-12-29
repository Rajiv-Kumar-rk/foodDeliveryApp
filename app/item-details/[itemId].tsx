import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../mockData';
import { theme } from '../../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCustomHeader from '../../hooks/useCustomHeader';

type CartItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
};

export default function ItemDetailsScreen() {
  const pathname = usePathname();
    console.log("item details screen> path name: ", pathname);
    
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const item = mockMenuItems.find(i => i._id === itemId);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useCustomHeader({title: "Item Details", showBackButton: true, onBackPress: null, showCartButton: true, onCartPress: ()=>router.push('/cart'), customHeaderOptions:{}});

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
      favoritesList = favoritesList.filter((id:string) => id !== itemId);
    } else {
      favoritesList.push(itemId);
    }
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
    setIsFavorite(!isFavorite);
  };

  const addToCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      let cart = cartData ? JSON.parse(cartData) : [];
      const existingItem = cart.find((cartItem: CartItem) => cartItem._id === item._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...item, quantity });
      }
      
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert(`Added ${quantity} ${item.name}(s) to your cart!`);
      router.back();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
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
            onPress={addToCart}
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
          >
            Add to Cart
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

