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

export default function MenuListingScreen() {
  const pathname = usePathname();
    console.log("menu lisitng screen> path name: ", pathname);

  const [menuItems] = useState<MenuItemType[]>(mockMenuItems);
  const [categories] = useState<string[]>([...new Set(mockMenuItems.map(item => item.category))]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [order, setOrder] = useState<MenuItemType[]>([]);
  const router = useRouter();

  const addToOrder = (item: MenuItemType) => {
    setOrder([...order, item]);
  };

  const filteredItems = menuItems.filter(item => 
    selectedCategories.length === 0 || selectedCategories.includes(item.category)
  );

  return (
    <View style={styles.container}>
      <SharedHeader userName="John" />
      <Categories 
        categories={categories} 
        onCategoryChange={setSelectedCategories}
      />
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}>
            <MenuItem item={item} onAddToOrder={() => addToOrder(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
      <Button
        mode="contained"
        onPress={() => router.push({ pathname: '/cart', params: { order: JSON.stringify(order) } })}
        style={styles.viewOrderButton}
        labelStyle={styles.viewOrderButtonLabel}
      >
        View Order ({order.length})
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
  viewOrderButton: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  viewOrderButtonLabel: {
    color: theme.colors.onPrimary,
  },
});

