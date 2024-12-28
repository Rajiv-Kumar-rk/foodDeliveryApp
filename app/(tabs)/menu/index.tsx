import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import MenuItem from '../../../components/MenuItem';
import { useRouter } from 'expo-router';
import { mockMenuItems } from '../../../mockData';
import { MenuItem as MenuItemType } from '../../../types';

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(mockMenuItems);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<MenuItemType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const uniqueCategories = [...new Set(mockMenuItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let filteredItems = mockMenuItems;

    if (selectedCategory) {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setMenuItems(filteredItems);
  }, [selectedCategory, searchQuery]);

  const addToOrder = (item: MenuItemType) => {
    setOrder([...order, item]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search menu items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItem item={item} onAddToOrder={() => addToOrder(item)} />
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
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoriesList: {
    marginBottom: 10,
  },
  chip: {
    marginRight: 5,
  },
  viewOrderButton: {
    marginTop: 10,
  },
});

