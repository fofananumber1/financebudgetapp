// lib/expenses.js
const API = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000/api';

export async function listExpenses() {
  const res = await fetch(`${API}/expenses/`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`List failed: ${res.status}`);
  return res.json();
}

export async function createExpense(payload) {
  // Ensure amount is a STRING for Django DecimalField
  const body = JSON.stringify({ ...payload, amount: String(payload.amount ?? '') });

  const res = await fetch(`${API}/expenses/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
