import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import MenuItem from '../../../components/MenuItem';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { mockMenuItems } from '../../../mockData';
import { MenuItem as MenuItemType } from '../../../types';
import SharedHeader from '../../../components/SharedHeader';
import Categories from '../../../components/Categories';
import { theme } from '../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
};

export default function MenuListingScreen() {
  const pathname = usePathname();
    console.log("menu lisitng screen> path name: ", pathname);

  const [menuItems] = useState<MenuItemType[]>(mockMenuItems);
  const [categories] = useState<string[]>([...new Set(mockMenuItems.map(item => item.category))]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [order, setOrder] = useState<MenuItemType[]>([]);
  const router = useRouter();

  // const addToOrder = (item: MenuItemType) => {
  //   setOrder([...order, item]);
  // };
  const addToCart = async (item) => {
    try {
      // const item = menuItems.find(i => i._id === item?._id);
      const cartData = await AsyncStorage.getItem('cart');
      let cart = cartData ? JSON.parse(cartData) : [];
      const existingItem = cart.find((cartItem: CartItem) => cartItem._id === item._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...item, quantity : 1});
      }
      
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert(`Added ${1} ${item.name}(s) to your cart!`);
      // router.back();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const filteredItems = menuItems.filter(item => 
    selectedCategories.length === 0 || selectedCategories.includes(item.category)
  );

  return (
    <View style={styles.container}>
      <SharedHeader userName="User" />
      <Categories 
        categories={categories} 
        onCategoryChange={setSelectedCategories}
      />
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}>
            <MenuItem item={item} onAddToOrder={() => addToCart(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
      <Button
        mode="contained"
        onPress={() => router.push('/cart')}
        style={styles.viewCartButton}
        labelStyle={styles.viewCartButtonLabel}
        icon={() => <Ionicons name="cart-outline" size={24} color={theme.colors.onPrimary} />}
      >
        View Cart
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
  viewCartButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  viewCartButtonLabel: {
    color: theme.colors.onPrimary,
  },
});

