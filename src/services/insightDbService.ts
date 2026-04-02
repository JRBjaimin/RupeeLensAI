import uuid from 'react-native-uuid';
import { db } from '../db/database';
import { Insight } from '../types/insight';

export const saveInsights = async (insights: Insight[]) => {
  await db.executeAsync(`DELETE FROM insights`);
  for (const insight of insights) {
    await db.executeAsync(
      `INSERT INTO insights (id, type, title, body, meta, tag, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        insight.id ?? uuid.v4().toString(),
        insight.type,
        insight.title,
        insight.body ?? null,
        insight.meta ?? null,
        insight.tag ?? null,
        insight.title,
        new Date().toISOString(),
      ]
    );
  }
};

export const getInsights = async (): Promise<Insight[]> => {
  const result = await db.executeAsync(
    `SELECT * FROM insights ORDER BY created_at DESC`
  );
  return (result.results ?? []).map((row: any) => ({
    id: row.id,
    type: row.type,
    title: row.title ?? row.message ?? '',
    body: row.body ?? undefined,
    meta: row.meta ?? undefined,
    tag: row.tag ?? undefined,
    createdAt: row.created_at ?? undefined,
  }));
};
