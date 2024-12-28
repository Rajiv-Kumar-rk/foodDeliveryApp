export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  favoriteItems: string[];
}

export type RootStackParamList = {
  index: undefined;
  'order-history': undefined;
  menu: undefined;
  order: { order: string };
  'order-details': { order: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

