import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../styles/theme';

const useCustomHeader = ({
  title = '',
  showBackButton = true,
  onBackPress = null,
  showCartButton = true,
  onCartPress = () => {},
  customHeaderOptions = {},
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title,
      headerBackTitleVisible: false,
      headerLeft: showBackButton
        ? () => (
            <TouchableOpacity
              onPress={onBackPress || (() => navigation.goBack())}
              style={{ marginRight: theme.spacing.md }}
            >
              <Ionicons name="chevron-back-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          )
        : null,
        headerRight: showCartButton
        ? () => (
            <TouchableOpacity
              onPress={onCartPress || (() => alert('onCartPress is not provided!'))}
              style={{ marginRight: theme.spacing.md }}
            >
              <Ionicons name="cart-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          )
        : null,
      headerStyle: {
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.secondary,
        // ...customHeaderOptions?.headerStyle,
      },
      headerTintColor: theme.colors.primary,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.colors.textPrimary,
        // ...customHeaderOptions?.headerTitleStyle,
      },
      ...customHeaderOptions, // Spread other options if passed
    });
  }, [title, showBackButton, onBackPress, customHeaderOptions, theme, navigation]);
};

export default useCustomHeader;
