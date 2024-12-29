import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar';
import { theme } from '../../styles/theme';
import { mockMenuItems } from '../../mockData';
import { MenuItem } from '../../types';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    const results = mockMenuItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const renderSearchResult = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => router.push(`/item-details/${item._id}`)}
    >
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        // onSubmit={handleSearch}
        showBackArrow={true}
        onBackPress={() => router.back()}
        placeholder="Search for food..."
        editableSearch={true}
      />
      {searchQuery === '' ? (
        <View style={styles.defaultMessageContainer}>
          <Ionicons name="search-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.defaultMessage}>Search for your favorite dishes</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={styles.noResults}>No results found for "{searchQuery}"</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  defaultMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultMessage: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  resultName: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  resultPrice: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});

export default SearchScreen;

