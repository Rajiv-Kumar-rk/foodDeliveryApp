import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedCategories.map(category => (
          <Chip
            key={category}
            style={[styles.chip, styles.selectedChip]}
            onClose={() => removeCategory(category)}
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
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007AFF',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#007AFF',
  },
});

