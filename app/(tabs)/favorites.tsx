import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockMenuItems } from '../../mockData';
import { MenuItem as MenuItemType } from '../../types';
import SharedHeader from '../../components/SharedHeader';

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
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>${item.price.toFixed(2)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => router.push(`/menu/item-details?itemId=${item._id}`)}>View</Button>
        <Button onPress={() => removeFromFavorites(item)} color="red">Remove</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SharedHeader userName="John" />
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
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

