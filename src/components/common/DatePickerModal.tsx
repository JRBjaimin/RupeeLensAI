import React from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme';

type Props = {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
};

const DatePickerModal = ({ visible, value, onClose, onSelect, maximumDate, minimumDate }: Props) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.overlay}>
      <View style={styles.card}>
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          themeVariant="dark"
          textColor="#ffffff"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={(_, selected) => {
            if (Platform.OS !== 'ios') {
              onClose();
            }
            if (selected) onSelect(selected);
          }}
        />
        <View style={styles.actions}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.saveButton]} onPress={onClose}>
            <Text style={styles.saveText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5,8,16,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(16,20,34,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#B1A6FF',
  },
  cancelText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  saveText: {
    color: '#0B0F1A',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default DatePickerModal;
