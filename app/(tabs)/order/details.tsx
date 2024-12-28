import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { mockOrders } from '../../../mockData';
import { theme } from '../../../styles/theme';

export default function OrderDetailsScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const order = mockOrders.find(o => o._id === orderId);

  if (!order) {
    return (
      <View style={styles.container}>
        <Title style={styles.errorText}>Order not found</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.orderInfo}>
        <Card.Content>
          <Title style={styles.title}>Order #{order._id.slice(-6)}</Title>
          <Paragraph style={styles.status}>Status: {order.status}</Paragraph>
          <Paragraph style={styles.date}>Date: {new Date(order.createdAt).toLocaleString()}</Paragraph>
          <Paragraph style={styles.total}>Total: ${order.totalPrice.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.itemsHeader}>Order Items:</Title>
      <FlatList
        data={order.items}
        renderItem={({ item }) => (
          <Card style={styles.orderItem}>
            <Card.Content>
              <Title style={styles.itemTitle}>{item.menuItem.name}</Title>
              <Paragraph style={styles.itemQuantity}>Quantity: {item.quantity}</Paragraph>
              <Paragraph style={styles.itemPrice}>Price: ${(item.menuItem.price * item.quantity).toFixed(2)}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  orderInfo: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  status: {
    color: theme.colors.textSecondary,
  },
  date: {
    color: theme.colors.textSecondary,
  },
  total: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  itemsHeader: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  orderItem: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  itemTitle: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  itemQuantity: {
    color: theme.colors.textSecondary,
  },
  itemPrice: {
    color: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
});

