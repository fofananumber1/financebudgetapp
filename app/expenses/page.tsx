'use client';

import React, { useMemo, useState } from 'react';
import useExpenses from '@/app/hooks/useExpenses';

export default function ExpensesPage() {
    const { expenses, addExpense, deleteExpense } = useExpenses();

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

        const total = useMemo(
            () => expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0),
            [expenses]
        );
    }

    return (
        <main className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-black">Expenses</h1>
        </main>
    )
    
}