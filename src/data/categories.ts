export type CategoryItem = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export const categories: CategoryItem[] = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#FF6B6B' },
  { id: 'groceries', name: 'Groceries', icon: '🛒', color: '#4CAF50' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#9C27B0' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#FFC107' },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#03A9F4' },
  { id: 'subscriptions', name: 'Subscriptions', icon: '📺', color: '#673AB7' },
  { id: 'health', name: 'Health & Fitness', icon: '💊', color: '#E91E63' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#FF9800' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: '#00BCD4' },
  { id: 'education', name: 'Education', icon: '📚', color: '#795548' },
  { id: 'personal', name: 'Personal Care', icon: '✂️', color: '#F06292' },
  { id: 'others', name: 'Others', icon: '📦', color: '#9E9E9E' },
];
