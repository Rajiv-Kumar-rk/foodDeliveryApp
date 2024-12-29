import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MenuItem as MenuItemType } from '../types';
import { theme } from '../styles/theme';

interface MenuItemProps {
  item: MenuItemType;
  onAddToOrder: () => void;
}

export default function MenuItem({ item, onAddToOrder }: MenuItemProps) {
  return (
    <Card style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Card.Content>
        <Title style={styles.title}>{item.name}</Title>
        <Paragraph style={styles.description}>{item.description}</Paragraph>
        <Paragraph style={styles.price}>Price: ${item.price.toFixed(2)}</Paragraph>
        <Paragraph style={styles.category}>Category: {item.category}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          onPress={onAddToOrder}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Add to Cart
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
  category: {
    color: theme.colors.textSecondary,
  },
  button: {
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    color: theme.colors.onPrimary,
  },
});

