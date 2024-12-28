import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import { mockOrders } from '../../../mockData';
import { theme } from '../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function OrderHistoryScreen() {
  const router = useRouter();
  const pathname = usePathname();
  console.log("order history screen> path name: ", pathname);

  const navigation = useNavigation();
  useEffect(()=> {
      navigation.setOptions({
        headerShown: true,
        title: "Order History",
        headerBackTitleVisible: false, 
        // headerBackImage: () => (
        //   <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
        // ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: theme.spacing.md, }}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: theme.colors.surface, 
        },
        headerTintColor: theme.colors.primary, 
        headerTitleStyle: {
          fontWeight: 'bold', 
          fontSize: 20, 
          color: theme.colors.textPrimary,
        },
      });
    },[]);

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

