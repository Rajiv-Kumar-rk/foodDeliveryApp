import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { MenuItem } from '../../types';
import { theme } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import useCustomHeader from '@/hooks/useCustomHeader';
import { CommonActions } from '@react-navigation/native';

export default function PlaceOrderScreen() {
  const pathname = usePathname();
    console.log("place order screen> path name: ", pathname);

  const router = useRouter();
  const { order: orderParam } = useLocalSearchParams<{ order: string }>();
  const order: MenuItem[] = JSON.parse(orderParam || '[]');

  const navigation = useNavigation();
  useCustomHeader({title: "Cart", showBackButton: true, onBackPress: null, customHeaderOptions: {}});

  const totalPrice = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const resetCurrentNavigationStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [
          {
            name: '(tabs)', 
            state: {
              index: 0, 
              routes: [
                { name: 'order' },
              ],
            },
          },
        ],
      })
    );
  };

  const placeOrder = () => {
    // Simulating order placement
    alert('Order placed successfully!');
    // router.push('/menu');
    resetCurrentNavigationStack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={({ item }) => (
          <Card style={styles.orderItem}>
            <Card.Content>
              <Title style={styles.itemName}>{item.name}</Title>
              <Paragraph style={styles.itemPrice}>${item.price.toFixed(2)}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
      <Card style={styles.totalContainer}>
        <Card.Content>
          <Title style={styles.totalText}>Total: ${totalPrice}</Title>
        </Card.Content>
      </Card>
      <Button 
        mode="contained" 
        onPress={placeOrder} 
        style={styles.placeOrderButton}
        labelStyle={styles.placeOrderButtonLabel}
      >
        Place Order
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    flexGrow: 1,
  },
  orderItem: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  itemName: {
    color: theme.colors.textPrimary,
  },
  itemPrice: {
    color: theme.colors.primary,
  },
  totalContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  totalText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: theme.colors.primary,
  },
  placeOrderButtonLabel: {
    color: theme.colors.onPrimary,
  },
});

