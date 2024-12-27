import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getExpenses();
            setLoading(false);
        };
        fetchData();
    }, [getExpenses]);

    return (
        <>
        <h2 className="heading">Expenses</h2>
        <h2 className='total-income'>Total Expense: <span>₹ {totalExpenses()}</span></h2>
        <div className='incomeStyled '>
            <div className="income-content d-md-inline d-xl-flex gap-2">
                <div className="form-container">
                    <ExpenseForm />
                </div>
                <div className="incomes scrollable-list">
                    {loading ? (
                        <div>Loading...</div> // Show loading message while fetching data
                    ) : Array.isArray(expenses) && expenses.length > 0 ? (
                        expenses.map((income) => {
                            const { _id, title, amount, date, category, description } = income || {};
                            if (!_id) {
                                return <div key="error">Invalid income object</div>;
                            }
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    category={category}
                                    date={date}
                                    indicatorColor="#eee"
                                    deleteItem={deleteExpense}
                                />
                            );
                        })
                    ) : (
                        <div>No expense found.</div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default Expenses;
