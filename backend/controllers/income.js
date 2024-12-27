const IncomeSchema = require('../model/IncomeModel');

// Add Income
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Save to database
        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date,
        });
        await income.save();
        res.status(201).json({ message: 'Income Added Successfully' });
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: 'Server Error!' });
    }
};

// Get All Incomes
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find();
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error.message);
        res.status(500).json({ message: 'Server Error!' });
    }
};

// Delete Income
exports.deleteIncomes = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await IncomeSchema.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found!' });
        }
        res.status(200).json({ message: 'Income Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting income:', error.message);
        res.status(500).json({ message: 'Server Error!' });
    }
};
