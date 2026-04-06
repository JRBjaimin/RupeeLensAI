import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5,8,16,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 15,
    backgroundColor: 'rgba(16,20,34,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 6,
  },
  errorText: {
    color: '#FF8AAE',
    fontSize: 11,
    marginTop: 6,
  },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(12,16,28,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: colors.textPrimary,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownButton: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(12,16,28,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
  },
  dropdownText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  dropdownPlaceholder: {
    color: '#7C8399',
  },
  calendarButton: {
    width: 48,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(159,167,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(159,167,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarText: {
    color: '#E8EAFB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    // flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
  },
  button2: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
  },
  saveButton: {
    backgroundColor: '#B1A6FF',
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(177,166,255,0.35)',
  },
  cancelText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  saveText: {
    color: '#0B0F1A',
    fontSize: 12,
    fontWeight: '700',
  },
  saveTextDisabled: {
    color: 'rgba(11,15,26,0.6)',
  },
  categoryList: {
    maxHeight: 300,
    marginTop: 12,
    marginBottom: 12,
  },
  categoryListContent: {
    gap: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(12,16,28,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  categoryRowActive: {
    borderColor: 'rgba(177,166,255,0.8)',
    backgroundColor: 'rgba(177,166,255,0.2)',
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryIcon: {
    width: 22,
    textAlign: 'center',
    fontSize: 16,
  },
  categoryText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textPrimary,
  },
});
