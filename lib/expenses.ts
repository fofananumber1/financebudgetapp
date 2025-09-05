// lib/expenses.js

export type Expense = {
    id: number;
    date: string;
    category: string;
    amount: string;
    description?: string;
    created_at: string;
};

const API = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000/api';

export async function listExpenses(): Promise<Expense[]> {
  const res = await fetch(`${API}/expenses/`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  return res.json();
}

export async function createExpense(input: {
  date: string; category: string; amount: string; description?: string;
}): Promise<Expense> {
  const res = await fetch(`${API}/expenses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();

}
  
