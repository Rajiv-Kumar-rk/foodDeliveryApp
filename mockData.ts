import { MenuItem, Order, User } from './types';

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
  {
    _id: '5',
    name: 'Chicken Tikka Masala',
    price: 15.99,
    description: 'Tender chicken in a creamy tomato-based sauce',
    image: 'https://via.placeholder.com/150',
    category: 'Indian',
  },
  {
    _id: '6',
    name: 'Vegetable Stir Fry',
    price: 11.99,
    description: 'Mixed vegetables stir-fried in a savory sauce',
    image: 'https://via.placeholder.com/150',
    category: 'Asian',
  },
  {
    _id: '7',
    name: 'Fish and Chips',
    price: 13.99,
    description: 'Crispy battered fish served with golden fries',
    image: 'https://via.placeholder.com/150',
    category: 'Seafood',
  },
  {
    _id: '8',
    name: 'Chocolate Brownie',
    price: 5.99,
    description: 'Rich, fudgy brownie served with vanilla ice cream',
    image: 'https://via.placeholder.com/150',
    category: 'Desserts',
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
  {
    _id: '103',
    items: [
      { menuItem: mockMenuItems[4], quantity: 1 },
      { menuItem: mockMenuItems[7], quantity: 2 },
    ],
    totalPrice: 27.97,
    status: 'pending',
    createdAt: new Date('2023-05-03T18:45:00Z'),
  },
];

export const mockUser: User = {
  _id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://via.placeholder.com/150',
  favoriteItems: ['1', '3', '5'],
};

