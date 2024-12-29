import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
//   onSubmit?: () => void;
  showBackArrow?: boolean;
  onBackPress?: () => void;
    editableSearch: boolean
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
//   onSubmit,
  showBackArrow = false,
  onBackPress,
  editableSearch
}) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        {showBackArrow ? (
            <Ionicons name="chevron-back-outline" size={24} color={theme.colors.primary} onPress={onBackPress} />
        ) : (<Ionicons name="search" size={20} color={theme.colors.primary} style={styles.leftIcon} />)}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        //   onSubmitEditing={onSubmit}
          returnKeyType="search"
          editable={editableSearch}
          cursorColor={theme.colors.textPrimary}
        />
        { showBackArrow ? (<Ionicons name="search" size={20} color={theme.colors.primary} style={styles.leftIcon} />) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  rightIcon: {
    marginRight: theme.spacing.sm,
  },
});

export default SearchBar;

