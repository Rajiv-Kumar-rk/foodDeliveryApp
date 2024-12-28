import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToOrder: () => void;
}

export default function MenuItem({ item, onAddToOrder }: MenuItemProps) {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Price: ${item.price.toFixed(2)}</Paragraph>
        <Paragraph>Category: {item.category}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onAddToOrder}>Add to Order</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

