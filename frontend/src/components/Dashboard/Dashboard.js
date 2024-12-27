import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { rupee } from '../../utils/icons';
import History from '../History/History';
import Chart from '../Chart/Chart';

function Transaction() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        netWorth,
        getIncomes,
        getExpenses,
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    return (
        <div className="dashboard">
            <h2>All Transactions</h2>
            <div className="stats-con">
                <div className="chart-con">
                <Chart />
                <div className="amount-con">
                    <div className="income">
                    <h3>Total Income</h3>
                    <p>{rupee} {totalIncome()}</p>
                    </div>
                    <div className="expense">
                    <h3>Total Expense</h3>
                    <p>{rupee} {totalExpenses()}</p>
                    </div>
                    <div className="balance">
                    <h3>Total Balance</h3>
                    <p>{rupee} {netWorth()}</p>
                    </div>
                </div>
                </div>
                <div className="history-con">
                <History />
                <h2 className="salary-title">Min <span>Income</span> Max</h2>
                <div className="salary-item">
                    <p>
                    ₹ {incomes.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0}
                    </p>
                    <p>
                    ₹ {incomes.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0}
                    </p>
                </div>
                <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                <div className="salary-item">
                    <p>
                    ₹ {expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0}
                    </p>
                    <p>
                    ₹ {expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0}
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
