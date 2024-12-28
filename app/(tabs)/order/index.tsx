import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { mockOrders } from '../../../mockData';
import { Order } from '../../../types';

export default function OrderHistoryScreen() {
  const router = useRouter();

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Card style={styles.orderItem}>
      <Card.Content>
        <Title>Order #{item._id.slice(-6)}</Title>
        <Paragraph>Status: {item.status}</Paragraph>
        <Paragraph>Total: ${item.totalPrice.toFixed(2)}</Paragraph>
        <Paragraph>Date: {new Date(item.createdAt).toLocaleString()}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => router.push({ pathname: '/order/details', params: { order: JSON.stringify(item) } })}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderItem: {
    marginBottom: 10,
  },
});

