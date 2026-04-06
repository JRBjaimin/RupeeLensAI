import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../../screens/addExpense/styles';
import { CategoryItem } from '../../data/categories';

type Props = {
  visible: boolean;
  value: string;
  categories: CategoryItem[];
  onSelect: (value: string) => void;
  onClose: () => void;
};

const CategorySelectModal = ({
  visible,
  value,
  categories,
  onSelect,
  onClose,
}: Props) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
  }, [categories, query]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => null}>
          <Text style={styles.title}>Select Category</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search category"
            placeholderTextColor="#7C8399"
            style={styles.input}
          />
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            style={styles.categoryList}
            contentContainerStyle={styles.categoryListContent}
            renderItem={({ item }) => {
              const active = value.toLowerCase() === item.name.toLowerCase();
              return (
                <Pressable
                  style={[styles.categoryRow, active && styles.categoryRowActive]}
                  onPress={() => {
                    onSelect(item.name);
                    onClose();
                  }}
                >
                  <Text style={styles.categoryIcon}>{item.icon}</Text>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </Pressable>
              );
            }}
          />
          <TouchableOpacity style={[styles.button]} onPress={onClose}>
            <Text style={styles.title}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CategorySelectModal;
