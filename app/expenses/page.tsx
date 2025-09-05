'use client';

console.log('API base:', process.env.NEXT_PUBLIC_API_BASE);

import React, { useMemo, useState, useEffect } from 'react';
import useExpenses from '@/app/hooks/useExpenses';
import AppShell from '../components/appShell';
import { totalmem } from 'os';
import { listExpenses, createExpense, type Expense } from '@/lib/expenses';

export default function ExpensesPage() {
    const { expenses, addExpense, deleteExpense } = useExpenses();
    const [items, setItems] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    console.log('API base:', process.env.NEXT_PUBLIC_API_BASE);
    }, []);

    //initial load
    useEffect(() => {
        (async () => {
            try {
                const data = await listExpenses();
                setItems(data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        //keep amount as STRING to play nice with Django DecimalField
        const payload = {
            date: String(fd.get('date') ?? ''),
            category: String(fd.get('category') ?? ''),
            amount: String(fd.get('amount') ?? ''), // <-- as STRING
            description: String(fd.get('description') ?? ''),
        };

        const created = await createExpense(payload);
        setItems((cur) => [created, ...cur]);
        e.currentTarget.reset();
    }

    const [form, setForm] = useState({
        date: '',
        category: '',
        amount: '',
        description: '',
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.currentTarget;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleAdd(
        e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!form.date || !form.category || !form.amount) return;

        const amt = parseFloat(form.amount);
        if (Number.isNaN(amt) || amt < 0) return;

        addExpense({
            date: form.date,
            category: form.category.trim(),
            amount: amt,
            description: form.description.trim(),
        });

        setForm({ date: '', category: '', amount: '', description: '' });
    }
    const total = useMemo(
            () => expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0),
            [expenses]
        );

    return (
    <div className="space-y-4 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <label className="flex flex-col">
          <span className="text-sm text-black">Date</span>
          <input
            name="date"
            type="date"
            className="border border-black px-3 py-2 rounded-md"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-black">Category</span>
          <input
            name="category"
            className="border border-black px-3 py-2 rounded-md"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-black">Amount</span>
          <input
            name="amount"
            inputMode="decimal"
            className="border border-black px-3 py-2 rounded-md"
            required
          />
        </label>

        <label className="flex-1 flex flex-col">
          <span className="text-sm text-black">Description</span>
          <input 
          name="description" 
          className="border border-black px-3 py-2 rounded-md " />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md
                     bg-indigo-600 px-4 py-2 text-white text-sm text-black font-medium
                     shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add
        </button>
    
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        
        <ul className="divide-y">
          {items.map((e) => (
            <li key={e.id} className="py-2 flex items-center text-black">
                <div className="ml-auto flex gap-10 items-left">
                    <span>
                        {e.date} · {e.category}
                    </span>
                    <span>${e.amount}</span>
              </div>
              <button
                    className="inline-flex items-center rounded-md
                       bg-red-600 px-4 py-2 text-white text-sm text-black font-medium
                       shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >   
                    Delete
                </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
    
}