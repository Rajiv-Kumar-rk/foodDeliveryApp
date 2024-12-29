import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

interface CategoriesProps {
  categories: string[];
  onCategoryChange: (selectedCategories: string[]) => void;
}

export default function Categories({ categories, onCategoryChange }: CategoriesProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const toggleCategory = (category: string) => {
    let newSelectedCategories;
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  const removeCategory = (category: string) => {
    const newSelectedCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAll}>{showAll ? 'See Less' : 'See All'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
        {selectedCategories.map(category => (
          <Chip
            key={category}
            style={[styles.chip, styles.selectedChip]}
            textStyle={styles.selectedChipText}
            onClose={() => removeCategory(category)}
            closeIcon="close"
          >
            {category}
          </Chip>
        ))}
        {visibleCategories
          .filter(category => !selectedCategories.includes(category))
          .map(category => (
            <Chip
              key={category}
              style={styles.chip}
              textStyle={styles.chipText}
              onPress={() => toggleCategory(category)}
            >
              {category}
            </Chip>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  seeAll: {
    color: theme.colors.primary,
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
  },
  chipText: {
    color: theme.colors.textPrimary,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  selectedChipText: {
    color: theme.colors.onPrimary,
  },
});

