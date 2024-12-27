import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";

function ExpenseForm() {
    const { addExpense } = useGlobalContext();
    const [error, setError] = useState(null);
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !date || !category || !description) {
        setError("All fields are required!");
        } else if (isNaN(amount) || parseFloat(amount) <= 0) {
        setError("Please enter a valid positive amount.");
        } else {
        setError(null);
        addExpense({
            ...inputState,
            amount: parseFloat(amount),
        });
        setInputState({
            title: "",
            amount: "",
            date: "",
            category: "",
            description: "",
        });
        }
    };

    return (
        <>
        <div className="form" onSubmit={handleSubmit}>
            <div className="input-control">
            <input
                type="text"
                value={title}
                name={"title"}
                placeholder="Expense Title"
                onChange={handleInput("title")}
            />
            </div>
            <div className="input-control">
            <input
                type="number"
                value={amount}
                name={"amount"}
                placeholder="Expense Amount"
                onChange={handleInput("amount")}
            />
            </div>
            <div className="form-row-3">
            <div className="input-control">
                <DatePicker
                id="date"
                placeholderText="Enter a Date"
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                    setInputState({ ...inputState, date: date });
                }}
                />
            </div>
            <div className="selects input-control">
                <select
                required
                value={category}
                name={"category"}
                id="category"
                onChange={handleInput("category")}
                >
                <option value="" disabled>
                    Select Category
                </option>
                <option value="education">Education</option>
                <option value="groceries">Groceries</option>
                <option value="health">Health</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="takeaways">Takeaways</option>
                <option value="clothing">Clothing</option>
                <option value="travelling">Travelling</option>
                <option value="other">Other</option>
                </select>
            </div>
            </div>
            <div className="input-control">
            <textarea
                value={description}
                name={"description"}
                placeholder="Description"
                cols="30"
                rows="4"
                onChange={handleInput("description")}
            />
            </div>
            <div className="submit-btn">
            <Button
                name="Add Expense"
                icon={plus}
                onClick={handleSubmit}
                bg="#db6f6c"
                bPad="0.8rem 2rem"
                color="#fff"
                bRad="50px"
                hoverBg="#e15c5b"
            />
            </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        </>
    );
}

export default ExpenseForm;
