'use client';

import { useState, useEffect } from 'react';

export type Expense = {
    id: number;
    date: string;
    category: string;
    amount: number;
    description: string;
};

export default function useExpenses() {
    // use state to hold a list of expenses in memory
    const [expenses, setExpenses] = useState<Expense[]>([]);

    // load stored expenses once when component mounts
    useEffect(() => {
        const stored = localStorage.getItem('expenses');
        if (stored) {
            setExpenses(JSON.parse(stored));
        }
    }, []);

    // save to localStorage whenever 'expenses' changes
    useEffect (() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    // addExpense function adds a new expense to the table of expenses
    // and gets a new id for this expense by adding 1 to the last id recorded
    function addExpense(exp: Omit<Expense, 'id'>) {
        const nextId = expenses.length > 0 
        ? Math.max(...expenses.map((e) => e.id)) + 1 
        : 1;

    //creates a new array with the item that was added
        setExpenses([...expenses, { id: nextId, ...exp }]);
    }

    function deleteExpense(id: number) {
        setExpenses(expenses.filter((e) => e.id !== id));
    }

    return { expenses, addExpense, deleteExpense };
}

