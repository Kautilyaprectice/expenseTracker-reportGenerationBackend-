const Expense = require('../modles/expense');
const User = require('../modles/user');
const sequelize = require('../util/database');

exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll({ where: {userId: req.user.id}});
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    const { amount, description, category } = req.body;
    const userId = req.user.id;

    try {

        const newExpense = await Expense.create({ amount, description, category, userId }, {transaction: t});

        const existingUser = await User.findByPk(userId);
        if (existingUser) {
            existingUser.total = (existingUser.total || 0) + parseInt(amount);
            await existingUser.save({ transaction: t }); 
        }
        else{
            await t.rollback();
            return res.status(404).json({ message: 'User not found' });
        }
        await t.commit();
        res.status(201).json(newExpense);
    } catch (err) {
        await t.rollback();
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res, next) => {
    let t;
    try {
        t = await sequelize.transaction();

        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            await t.rollback();
            return res.status(404).json({ message: 'Expense not found' });
        }

        const expenseAmount = expense.amount;

        const user = await User.findByPk(expense.userId);
        if (!user) {
            await t.rollback();
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedTotal = user.total - expenseAmount;

        await User.update(
            { total: updatedTotal },
            { where: { id: user.id }, transaction: t }
        );

        await Expense.destroy({ where: { id: expenseId }, transaction: t });

        await t.commit();
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        if (t) {
            await t.rollback();
        }
        console.error('Error deleting expense:', err);
        res.status(500).json({ error: err.message });
    }
};