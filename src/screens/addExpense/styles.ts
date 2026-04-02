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
    padding: 20,
    backgroundColor: 'rgba(16,20,34,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 6,
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
    flex: 1,
    paddingVertical: 12,
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
