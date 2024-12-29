import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, usePathname } from 'expo-router';
import { mockOrders } from '../../../mockData';
import CustomHeader from '../../../components/CustomHeader';
import { theme } from '../../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function OrderDetailsScreen() {
  const pathname = usePathname();
  console.log("order details screen> path name: ", pathname);

  const navigation = useNavigation();
  useEffect(()=> {
      navigation.setOptions({
        headerShown: true,
        title: "Order Details",
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

  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const order = mockOrders.find(o => o._id === orderId);

  return (
    <View style={styles.container}>
      <Card style={styles.orderInfo}>
        <Card.Content>
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
    backgroundColor: theme.colors.background,
  },
  orderInfo: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.surface,
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
    margin: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  orderItem: {
    marginHorizontal: theme.spacing.md,
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
    margin: theme.spacing.md,
  },
});

