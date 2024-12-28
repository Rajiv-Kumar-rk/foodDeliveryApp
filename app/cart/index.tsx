import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { MenuItem } from '../../types';
import { theme } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import useCustomHeader from '@/hooks/useCustomHeader';

export default function PlaceOrderScreen() {
  const pathname = usePathname();
    console.log("place order screen> path name: ", pathname);

  const router = useRouter();
  const { order: orderParam } = useLocalSearchParams<{ order: string }>();
  const order: MenuItem[] = JSON.parse(orderParam || '[]');

  useCustomHeader({title: "Cart", showBackButton: false, onBackPress: null, customHeaderOptions: {}});
  // const navigation = useNavigation();
  // useEffect(()=> {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: "Cart",
  //     headerBackTitleVisible: false, 
  //     // headerBackImage: () => (
  //     //   <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
  //     // ),
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: theme.spacing.md, }}>
  //         <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
  //       </TouchableOpacity>
  //     ),
  //     headerStyle: {
  //       backgroundColor: theme.colors.surface, 
  //     },
  //     headerTintColor: theme.colors.primary, 
  //     headerTitleStyle: {
  //       fontWeight: 'bold', 
  //       fontSize: 20, 
  //       color: theme.colors.textPrimary,
  //     },
  //   });
  // },[]);

  const totalPrice = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const placeOrder = () => {
    // Simulating order placement
    alert('Order placed successfully!');
    router.push('/order');
  };

  return (
    <View style={styles.container}>
      {/* <CustomHeader title="Cart" /> */}
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

