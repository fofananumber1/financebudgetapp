'use client';

import React, { useMemo, useState } from 'react';
import useExpenses from '@/app/hooks/useExpenses';
import { totalmem } from 'os';

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
    }
    const total = useMemo(
            () => expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0),
            [expenses]
        );

    return (
        <main className="min-h-screen bg-white p-8">
            <h1 className="text-3xl font-bold mb-6 text-black">Expenses</h1>

            {/* Add Expense Form */}
            <form
                onSubmit={handleAdd}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border rounded p-2 text-gray-400"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border rounded p-2 text-gray-400"
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="border rounded p-2 text-gray-400"
                    step="0.01"
                    min="0"
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={handleChange}
                    className="border rounded p-2 text-gray-400"
                />

                <button
                    type="submit"
                    className="col-span-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Add Expense
                </button>
            </form>

            {/* Expenses Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-black">
                            <th className="border p-2 text-left">Date</th>
                            <th className="border p-2 text-left">Category</th>
                            <th className="border p-2 text-right">Amount</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((exp) => (
                                <tr key={exp.id} className="hover:bg-blue-50">
                                    <td className="border p-2 border-black text-black">{exp.date}</td>
                                    <td className="border p-2 border-black text-black">{exp.category}</td>
                                    <td className="border p-2 border-black text-right text-black">${exp.amount.toFixed(2)}</td>
                                    <td className="border p-2 border-black text-black">{exp.description}</td>
                                    <td className="border p-2 border-black text-center text-black">
                                        <button
                                            onClick={() => deleteExpense(exp.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="border p-4 text-center text-gray-500 border-black">
                                    No expenses yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr className="text-gray-400">
                            <td className="border p-2 font-bold text-blue-700 border-black" colSpan={2}>
                                Total
                            </td>
                            <td className="border p-2 text-right font-semibold text-blue-700 border-black">
                                ${total.toFixed(2)}
                            </td>
                            <td className="border p-2 border-black" colSpan={2}></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </main>
    )
    
}