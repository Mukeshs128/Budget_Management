import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getIncomes();
            } catch (error) {
                console.error("Error fetching incomes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getIncomes]);

    return (
        <>
            <h2 className="heading">Incomes</h2>
            <h2 className="total-income">
                Total Income: <span>₹ {totalIncome()}</span>
            </h2>
            <div className="incomeStyled">
                <div className="income-content d-md-inline d-xl-flex gap-2">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes scrollable-list">
                        {loading ? (
                            <div className="loading">Loading...</div>
                        ) : Array.isArray(incomes) && incomes.length > 0 ? (
                            incomes.map((income, index) => {
                                const { _id, title, amount, date, category, description } = income || {};
                                if (!_id || title === undefined || amount === undefined) {
                                    return (
                                        <div key={index} className="error">
                                            Invalid income entry.
                                        </div>
                                    );
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
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })
                        ) : (
                            <div>No incomes found.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Income;

