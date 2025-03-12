const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncomes } = require('../controllers/income');

const router = require('express').Router();

// Define each route individually with '/api' prefix
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes); 
router.delete('/delete-income/:id', deleteIncomes);

router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;
