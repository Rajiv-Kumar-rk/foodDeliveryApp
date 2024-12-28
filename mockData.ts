import { MenuItem, Order } from './types';

export const mockMenuItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Margherita Pizza',
    price: 12.99,
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    image: 'https://via.placeholder.com/150',
    category: 'Pizza',
  },
  {
    _id: '2',
    name: 'Cheeseburger',
    price: 8.99,
    description: 'Juicy beef patty with cheese, lettuce, and tomato',
    image: 'https://via.placeholder.com/150',
    category: 'Burgers',
  },
  {
    _id: '3',
    name: 'Caesar Salad',
    price: 7.99,
    description: 'Fresh romaine lettuce with Caesar dressing and croutons',
    image: 'https://via.placeholder.com/150',
    category: 'Salads',
  },
  {
    _id: '4',
    name: 'Spaghetti Carbonara',
    price: 14.99,
    description: 'Pasta with creamy egg sauce, pancetta, and parmesan',
    image: 'https://via.placeholder.com/150',
    category: 'Pasta',
  },
];

export const mockOrders: Order[] = [
  {
    _id: '101',
    items: [
      { menuItem: mockMenuItems[0], quantity: 2 },
      { menuItem: mockMenuItems[2], quantity: 1 },
    ],
    totalPrice: 33.97,
    status: 'delivered',
    createdAt: new Date('2023-05-01T12:00:00Z'),
  },
  {
    _id: '102',
    items: [
      { menuItem: mockMenuItems[1], quantity: 1 },
      { menuItem: mockMenuItems[3], quantity: 1 },
    ],
    totalPrice: 23.98,
    status: 'preparing',
    createdAt: new Date('2023-05-02T14:30:00Z'),
  },
];

