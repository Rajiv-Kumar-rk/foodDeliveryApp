import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import MenuItem from '../../../components/MenuItem';
import { useRouter } from 'expo-router';
import { mockMenuItems } from '../../../mockData';
import { MenuItem as MenuItemType } from '../../../types';
import SharedHeader from '../../../components/SharedHeader';

export default function MenuListingScreen() {
  const [menuItems] = useState<MenuItemType[]>(mockMenuItems);
  const [categories] = useState<string[]>([...new Set(mockMenuItems.map(item => item.category))]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [order, setOrder] = useState<MenuItemType[]>([]);
  const router = useRouter();

  const addToOrder = (item: MenuItemType) => {
    setOrder([...order, item]);
  };

  const filteredItems = menuItems.filter(item => 
    !selectedCategory || item.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <SharedHeader userName="John" />
      <FlatList
        ListHeaderComponent={
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => (
              <Chip
                selected={selectedCategory === item}
                onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
                style={styles.chip}
              >
                {item}
              </Chip>
            )}
            keyExtractor={(item) => item}
            style={styles.categoriesList}
          />
        }
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}>
            <MenuItem item={item} onAddToOrder={() => addToOrder(item)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
      <Button
        mode="contained"
        onPress={() => router.push({ pathname: '/menu/place-order', params: { order: JSON.stringify(order) } })}
        style={styles.viewOrderButton}
      >
        View Order ({order.length})
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoriesList: {
    marginBottom: 10,
  },
  chip: {
    marginRight: 5,
  },
  viewOrderButton: {
    margin: 16,
  },
});

