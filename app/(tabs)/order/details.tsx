import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { Order, OrderItem } from '../../../types';

export default function OrderDetailsScreen() {
  const { order: orderParam } = useLocalSearchParams<{ order: string }>();
  const initialOrder: Order = JSON.parse(orderParam || '{}');
  const [currentOrder, setCurrentOrder] = useState<Order>(initialOrder);

  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <Card style={styles.orderItem}>
      <Card.Content>
        <Title>{item.menuItem.name}</Title>
        <Paragraph>Quantity: {item.quantity}</Paragraph>
        <Paragraph>Price: ${(item.menuItem.price * item.quantity).toFixed(2)}</Paragraph>
      </Card.Content>
    </Card>
  );

  const refreshStatus = () => {
    // Simulating status refresh
    const newStatuses: Order['status'][] = ['pending', 'preparing', 'ready', 'delivered'];
    const currentIndex = newStatuses.indexOf(currentOrder.status);
    const newStatus = newStatuses[(currentIndex + 1) % newStatuses.length];
    setCurrentOrder({...currentOrder, status: newStatus});
  };

  return (
    <View style={styles.container}>
      <Card style={styles.orderInfo}>
        <Card.Content>
          <Title>Order #{currentOrder._id.slice(-6)}</Title>
          <Paragraph>Status: {currentOrder.status}</Paragraph>
          <Paragraph>Date: {new Date(currentOrder.createdAt).toLocaleString()}</Paragraph>
          <Paragraph>Total: ${currentOrder.totalPrice.toFixed(2)}</Paragraph>
        </Card.Content>
      </Card>
      <Title style={styles.itemsHeader}>Order Items:</Title>
      <FlatList
        data={currentOrder.items}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button mode="contained" onPress={refreshStatus} style={styles.refreshButton}>
        Refresh Status
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  orderInfo: {
    marginBottom: 20,
  },
  itemsHeader: {
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 10,
  },
  refreshButton: {
    marginTop: 20,
  },
});

