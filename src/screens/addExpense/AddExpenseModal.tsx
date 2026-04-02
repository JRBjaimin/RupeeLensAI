import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { addTransaction } from '../../services/transactionService';
import { useAppStore } from '../../store/useAppStore';
import { formatDateInput, toDDMMYYYY, toIsoFromDDMMYYYY, toDateFromDDMMYYYY } from '../../utils/date';
import { CalendarIcon, DatePickerModal } from '../../components/common';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const AddExpenseModal = ({ visible, onClose }: Props) => {
  const { loadTransactions } = useAppStore();
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (visible) {
      setDate(toDDMMYYYY(new Date()));
    }
  }, [visible]);

  const handleSave = async () => {
    const parsed = parseFloat(amount);
    if (!parsed || !merchant || !category) return;

    const dateValue = toIsoFromDDMMYYYY(date) ?? new Date().toISOString();

    await addTransaction({
      amount: parsed,
      merchant,
      category,
      date: dateValue,
      source: 'manual',
    });
    await loadTransactions();
    setAmount('');
    setMerchant('');
    setCategory('');
    setDate('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Expense</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="₹0"
              placeholderTextColor="#7C8399"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Merchant</Text>
            <TextInput
              value={merchant}
              onChangeText={setMerchant}
              placeholder="Swiggy"
              placeholderTextColor="#7C8399"
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Food"
              placeholderTextColor="#7C8399"
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Date (DD/MM/YYYY)</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={date}
                onChangeText={(value) => setDate(formatDateInput(value))}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#7C8399"
                keyboardType="number-pad"
                maxLength={10}
                style={[styles.input, { flex: 1 }]}
              />
              <Pressable style={styles.calendarButton} onPress={() => setShowPicker(true)}>
                <CalendarIcon />
              </Pressable>
            </View>
          </View>
          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <DatePickerModal
        visible={showPicker}
        value={toDateFromDDMMYYYY(date) ?? new Date()}
        onClose={() => setShowPicker(false)}
        onSelect={(selected) => setDate(toDDMMYYYY(selected))}
      />
    </Modal>
  );
};

export default AddExpenseModal;
