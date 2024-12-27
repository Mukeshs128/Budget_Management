const ExpenseSchema = require('../model/ExpenseModel')

exports.addExpense = async(req, res) => {
    const {title, amount, category, description, date} = req.body
    
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
    })

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({message: 'all fields are required!'})
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'amount must be a positive number!'})
        }
        await expense.save()
        res.status(201).json({message: 'Expense Added'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server Error!'})
    }
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find()
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}
exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((error) => {
            res.status(500).json({message: 'Server Error'})
        })
}
