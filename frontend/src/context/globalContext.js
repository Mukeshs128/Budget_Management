// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";

// const GlobalContext = createContext();

// export const GlobalProvider = ({ children }) => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [error, setError] = useState(null);

//     // Add Income
//     const addIncome = async (income) => {
//         try {
//             const response = await axios.post(`${BASE_URL}add-income`, income);
//             setIncomes((prev) => [...prev, response.data.income]); // Update state with the new income
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "An error occurred while adding income.");
//             console.error("Error adding income:", err.response?.data || err.message);
//         }
//     };

//     // Get All Incomes
//     const getIncomes = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/get-incomes`);
//             setIncomes(response.data); // Populate incomes in the state
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch incomes.");
//             console.error("Error fetching incomes:", err.response?.data || err.message);
//         }
//     };

//     // Delete Income
//     const deleteIncome = async (id) => {
//         try {
//             await axios.delete(`${BASE_URL}delete-income/${id}`);
//             setIncomes((prev) => prev.filter((income) => income._id !== id)); // Update state after deletion
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete income.");
//             console.error("Error deleting income:", err.response?.data || err.message);
//         }
//     };

//     // Total Incomes
//     const totalIncome = () => {
//         let totalIncome = 0;
//         incomes.forEach((income) => (totalIncome += income.amount));
//         return totalIncome;
//     }

//     // Add Expenses
//     const addExpense = async (expense) => {
//         try {
//             const response = await axios.post(`${BASE_URL}add-expense`, expense);
//             setExpenses((prev) => [...prev, response.data.expense]); // Update state with the new expense
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "An error occurred while adding expense.");
//             console.error("Error adding expense:", err.response?.data || err.message);
//         }
//     };

//     // Get All Expenses
//     const getExpenses = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/get-expenses`);
//             setExpenses(response.data); // Populate expenses in the state
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch expenses.");
//             console.error("Error fetching expenses:", err.response?.data || err.message);
//         }
//     };

//     // Delete Expense
//     const deleteExpense = async (id) => {
//         try {
//             await axios.delete(`${BASE_URL}delete-expense/${id}`);
//             setExpenses((prev) => prev.filter((expense) => expense._id!== id)); // Update state after deletion
//             setError(null);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete expense.");
//             console.error("Error deleting expense:", err.response?.data || err.message);
//         }
//     };
    
//     // Total Expenses
//     const totalExpenses = () => {
//         let totalExpenses = 0;
//         expenses.forEach((expense) => (totalExpenses += expense.amount));
//         return totalExpenses;
//     }
    
//     // Net Worth
//     const netWorth = () => totalIncome() - totalExpenses();
    

//     return (
//         <GlobalContext.Provider value={{ 
//             addIncome,
//             getIncomes,
//             incomes,
//             deleteIncome,
//             expenses,
//             totalIncome,
//             addExpense,
//             getExpenses,
//             deleteExpense,
//             totalExpenses,
//             netWorth,
//             error,
//             setError
//         }}>
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = () => {
//     return useContext(GlobalContext);
// };




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
