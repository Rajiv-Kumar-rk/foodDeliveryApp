import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MenuItem } from '../../../types';

export default function OrderScreen() {
  const router = useRouter();
  const { order: orderParam } = useLocalSearchParams<{ order: string }>();
  const order: MenuItem[] = JSON.parse(orderParam || '[]');

  const totalPrice = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const placeOrder = () => {
    // Simulating order placement
    alert('Order placed successfully!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={({ item }) => (
          <Card style={styles.orderItem}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>${item.price.toFixed(2)}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Card style={styles.totalContainer}>
        <Card.Content>
          <Title>Total: ${totalPrice}</Title>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={placeOrder} style={styles.placeOrderButton}>
        Place Order
      </Button>
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
  totalContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  placeOrderButton: {
    marginTop: 10,
  },
});

