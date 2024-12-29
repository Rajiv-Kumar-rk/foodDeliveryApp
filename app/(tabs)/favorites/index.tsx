import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, usePathname, useRouter } from 'expo-router';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../../mockData';
import { MenuItem as MenuItemType } from '../../../types';
import { theme } from '../../../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCustomHeader from '../../../hooks/useCustomHeader';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favoriteItems, setFavoriteItems] = useState<MenuItemType[]>([]);
  const pathname = usePathname();
  console.log("favorites screen> path name: ", pathname);

  useCustomHeader({title: "My Favorites", showBackButton: false, onBackPress: null, showCartButton: true, onCartPress: ()=>router.push('/cart'), customHeaderOptions: {}});

  // used useCallback hook to memorize the callback function reference, as the tab get mounted only once that's why we can't use  useEffect
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  
  const loadFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoritesList = JSON.parse(favorites);
        const items = mockMenuItems.filter(item => favoritesList.includes(item._id));
        setFavoriteItems(items);
      }
    } catch(e) {
      console.error('Error loading favorites items:', e);
    }
  };

  const removeFromFavorites = async (item: MenuItemType) => {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      const favoritesList = JSON.parse(favorites);
      const updatedFavorites = favoritesList.filter((id:string) => id !== item._id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavoriteItems(favoriteItems.filter(favItem => favItem._id !== item._id));
    }
  };

  const renderItem = ({ item }: { item: MenuItemType }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title style={styles.title}>{item.name}</Title>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <Paragraph style={styles.price}>${item.price.toFixed(2)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          onPress={() => router.push(`/item-details/${item._id}`)}
          mode="outlined"
          style={styles.viewButton}
          labelStyle={styles.viewButtonLabel}
        >
          View
        </Button>
        <Button 
          onPress={() => removeFromFavorites(item)} 
          mode="contained"
          style={styles.removeButton}
          labelStyle={styles.removeButtonLabel}
        >
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={48} color={theme.colors.textSecondary} />
            <Button 
              mode="contained" 
              onPress={() => router.push('/menu')}
              style={styles.browseButton}
              labelStyle={styles.browseButtonLabel}
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
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  description: {
    color: theme.colors.textSecondary,
  },
  price: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  viewButton: {
    borderColor: theme.colors.primary,
  },
  viewButtonLabel: {
    color: theme.colors.primary,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
  },
  removeButtonLabel: {
    color: theme.colors.onError,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  browseButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  browseButtonLabel: {
    color: theme.colors.onPrimary,
  },
});

