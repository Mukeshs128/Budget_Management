import React, { useEffect } from "react";
import { useGlobalContext } from '../../context/globalContext';

const TransactionHistory = () => {
    const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    const transactions = [
        ...incomes.map((income) => ({ ...income, type: "Income" })),
        ...expenses.map((expense) => ({ ...expense, type: "Expense" })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions to display.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                <td>{transaction.category || "No Description"}</td>
                                <td>{transaction.description || "No Description"}</td>
                                <td>{transaction.type}</td>
                                <td
                                    style={{
                                        color: transaction.type === "Income" ? "green" : "red",
                                    }}
                                >
                                    {transaction.type === "Income" ? "+" : "-"}₹ 
                                    {transaction.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
