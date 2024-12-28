import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { mockOrders } from '../../../mockData';
import SharedHeader from '../../../components/SharedHeader';
import { theme } from '../../../styles/theme';

export default function OrderHistoryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={mockOrders}
        renderItem={({ item }) => (
          <Card style={styles.orderItem}>
            <Card.Content>
              <Title style={styles.title}>Order #{item._id.slice(-6)}</Title>
              <Paragraph style={styles.status}>Status: {item.status}</Paragraph>
              <Paragraph style={styles.total}>Total: ${item.totalPrice.toFixed(2)}</Paragraph>
              <Paragraph style={styles.date}>Date: {new Date(item.createdAt).toLocaleString()}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button 
                onPress={() => router.push({ pathname: '/order/details', params: { orderId: item._id } })}
                mode="contained"
                style={styles.viewDetailsButton}
                labelStyle={styles.viewDetailsButtonLabel}
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
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
  orderItem: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  status: {
    color: theme.colors.textSecondary,
  },
  total: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  date: {
    color: theme.colors.textSecondary,
  },
  viewDetailsButton: {
    backgroundColor: theme.colors.primary,
  },
  viewDetailsButtonLabel: {
    color: theme.colors.onPrimary,
  },
});

