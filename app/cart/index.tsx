import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem } from '../../types';
import useCustomHeader from '@/hooks/useCustomHeader';
import { CommonActions } from '@react-navigation/native';
import { theme } from "../../styles/theme";

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  useCustomHeader({title: "Cart", showBackButton: true, onBackPress: null, showCartButton: false, onCartPress: ()=> router.push('/cart'), customHeaderOptions: {}});

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCartItems(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const updateCartItem = async (itemId: string, newQuantity: number) => {
    const updatedCart = cartItems.map(item => 
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeCartItem = async (itemId: string) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const resetCurrentNavigationStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [
          {
            name: '(tabs)', 
            state: {
              index: 0, 
              routes: [
                { name: 'order' },
              ],
            },
          },
        ],
      })
    );
  };

  const placeOrder = () => {
    // Simulating order placement
    alert('Order placed successfully!');
    // router.push('/menu');
    resetCurrentNavigationStack();
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <View style={styles.itemDetails}>
          <View style={styles.itemHeader}>
            <Title style={styles.itemName}>{item.name}</Title>
            <Paragraph style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Paragraph>
          </View>
          <TouchableOpacity onPress={() => removeCartItem(item._id)} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateCartItem(item._id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <Paragraph style={styles.quantity}>{item.quantity}</Paragraph>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateCartItem(item._id, item.quantity + 1)}
            >
              <Ionicons name="add" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Paragraph>Subtotal:</Paragraph>
            <Paragraph>${calculateSubtotal().toFixed(2)}</Paragraph>
          </View>
          <View style={styles.summaryRow}>
            <Paragraph>Tax (10%):</Paragraph>
            <Paragraph>${calculateTax().toFixed(2)}</Paragraph>
          </View>
          <View style={styles.summaryRow}>
            <Title style={styles.totalText}>Total:</Title>
            <Title style={styles.totalText}>${calculateTotal().toFixed(2)}</Title>
          </View>
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={placeOrder}
        style={styles.placeOrderButton}
        labelStyle={styles.placeOrderButtonLabel}
      >
        Place Order
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  cartItem: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  itemDetails: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  itemHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
  },
  imageContainer: {
    width: 100,
    aspectRatio: 1,
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  quantity: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  summaryCard: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  totalText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  placeOrderButtonLabel: {
    color: theme.colors.onPrimary,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  removeText: {
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
    fontSize: 14,
  },
});

