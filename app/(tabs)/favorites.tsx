import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../mockData';
import { MenuItem as MenuItemType } from '../../types';
import MenuItem from '../../components/MenuItem';
import SharedHeader from '../../components/SharedHeader';

export default function FavoritesScreen() {
  const router = useRouter();
  // For this example, we'll assume the first 3 items are favorites
  const [favoriteItems, setFavoriteItems] = useState<MenuItemType[]>(mockMenuItems.slice(0, 3));

  const removeFromFavorites = (item: MenuItemType) => {
    setFavoriteItems(favoriteItems.filter(favItem => favItem._id !== item._id));
  };

  return (
    <View style={styles.container}>
      <SharedHeader userName="John" />
      <FlatList
        data={favoriteItems}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity 
              style={styles.itemTouchable}
              onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}
            >
              <MenuItem item={item} onAddToOrder={() => {}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromFavorites(item)}
            >
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={48} color="#ccc" />
            <Button 
              mode="contained" 
              onPress={() => router.push('/menu')}
              style={styles.browseButton}
            >
              Browse Menu
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTouchable: {
    flex: 1,
  },
  removeButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  browseButton: {
    marginTop: 20,
  },
});

