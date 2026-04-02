export type InsightType =
  | 'warning'
  | 'trend'
  | 'opportunity'
  | 'behavioral'
  | 'fixed_cost'
  | 'recommendation'
  | 'prediction';

export type Insight = {
  id: string;
  type: InsightType;
  title: string;
  body?: string;
  meta?: string;
  tag?: string;
  createdAt?: string;
};
