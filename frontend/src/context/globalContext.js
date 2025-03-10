import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            setIncomes((prev) => [...prev, response.data.income]); // Add new income to state
            setError(null);
            await getIncomes(); // Refresh the income list
        } catch (err) {
            handleError(err, "adding income");
        }
    };

    // Get All Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data || []); // Populate incomes with default fallback
            setError(null);
        } catch (err) {
            handleError(err, "fetching incomes");
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            setIncomes((prev) => prev.filter((income) => income._id !== id)); // Remove income from state
            setError(null);
        } catch (err) {
            handleError(err, "deleting income");
        }
    };

    // Total Incomes
    const totalIncome = () => {
        return incomes.reduce((total, income) => {
            return total + (income?.amount || 0); // Safely handle undefined amounts
        }, 0);
    };

    // Add Expense
    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            setExpenses((prev) => [...prev, response.data.expense]); // Add new expense to state
            setError(null);
            await getExpenses(); // Refresh the expense list
        } catch (err) {
            handleError(err, "adding expense");
        }
    };

    // Get All Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data || []); // Populate expenses with default fallback
            setError(null);
        } catch (err) {
            handleError(err, "fetching expenses");
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense._id !== id)); // Remove expense from state
            setError(null);
        } catch (err) {
            handleError(err, "deleting expense");
        }
    };

    // Total Expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => {
            return total + (expense?.amount || 0); // Safely handle undefined amounts
        }, 0);
    };

    // Net Worth
    const netWorth = () => totalIncome() - totalExpenses();

    // TransactionHistory
    const transactionHistory = () => {
        const history = [...incomes,...expenses];
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })

        return history.slice(0,3);
    };

    // All Transaction
    const getAllTransactions = () => {
        const allTransactions = [
            ...incomes.map((income) => ({ ...income, type: "income" })),
            ...expenses.map((expense) => ({ ...expense, type: "expense" })),
        ];
        return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, most recent first
    };

    // Handle API Errors
    const handleError = (err, action) => {
        setError(err.response?.data?.message || `An error occurred while ${action}.`);
        console.error(`Error ${action}:`, err.response?.data || err.message);
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                addExpense,
                getExpenses,
                expenses,
                deleteExpense,
                totalIncome,
                totalExpenses,
                netWorth,
                transactionHistory,
                getAllTransactions,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
