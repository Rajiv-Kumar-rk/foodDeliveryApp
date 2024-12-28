import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../mockData';
import { MenuItem as MenuItemType } from '../../types';
import SharedHeader from '../../components/SharedHeader';
import { theme } from '../../styles/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favoriteItems, setFavoriteItems] = useState<MenuItemType[]>(mockMenuItems.slice(0, 3));

  const removeFromFavorites = (item: MenuItemType) => {
    setFavoriteItems(favoriteItems.filter(favItem => favItem._id !== item._id));
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
          onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}
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
