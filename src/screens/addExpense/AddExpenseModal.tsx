import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { addTransaction } from '../../services/transactionService';
import { useAppStore } from '../../store/useAppStore';
import { formatDateInput, toDDMMYYYY, toIsoFromDDMMYYYY, toDateFromDDMMYYYY } from '../../utils/date';
import { CalendarIcon, DatePickerModal } from '../../components/common';
import { CategorySelectModal } from '../../components/addExpense';
import { categories } from '../../data/categories';

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
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [touched, setTouched] = useState({
    amount: false,
    merchant: false,
    category: false,
    date: false,
  });

  useEffect(() => {
    if (visible) {
      setDate(toDDMMYYYY(new Date()));
    }
  }, [visible]);

  const handleSave = async () => {
    const parsed = parseFloat(amount);
    if (!parsed || !merchant.trim() || !category.trim() || !toIsoFromDDMMYYYY(date)) {
      setTouched({
        amount: true,
        merchant: true,
        category: true,
        date: true,
      });
      return;
    }

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

  const amountValue = parseFloat(amount);
  const amountError = !amountValue ? 'Enter a valid amount' : '';
  const merchantError = merchant.trim().length < 2 ? 'Enter a merchant name' : '';
  const categoryError = category.trim().length === 0 ? 'Select a category' : '';
  const dateError = toIsoFromDDMMYYYY(date) ? '' : 'Enter a valid date';
  const isValid =
    !amountError && !merchantError && !categoryError && !dateError;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Add Expense</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, ''))}
              placeholder="₹0"
              placeholderTextColor="#7C8399"
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.amount && amountError ? (
              <Text style={styles.errorText}>{amountError}</Text>
            ) : null}
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
            {touched.merchant && merchantError ? (
              <Text style={styles.errorText}>{merchantError}</Text>
            ) : null}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !category && styles.dropdownPlaceholder,
                ]}
              >
                {category || 'Select category'}
              </Text>
            </Pressable>
            {touched.category && categoryError ? (
              <Text style={styles.errorText}>{categoryError}</Text>
            ) : null}
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
            {touched.date && dateError ? (
              <Text style={styles.errorText}>{dateError}</Text>
            ) : null}
          </View>/*
          <View style={styles.actions}>
            <Pressable style={[styles.button2, { marginRight: 10 }]} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button2,
                styles.saveButton,
                !isValid && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
            >
              <Text style={[styles.saveText, !isValid && styles.saveTextDisabled]}>Save</Text>
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
      <CategorySelectModal
        visible={showCategoryPicker}
        value={category}
        categories={categories}
        onSelect={setCategory}
        onClose={() => setShowCategoryPicker(false)}
      />
    </Modal>
  );
};

export default AddExpenseModal;
